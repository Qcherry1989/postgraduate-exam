const express = require('express');
const router = express.Router();
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const axios = require('axios');
const path = require('path');

// 数据库初始化
const file = path.join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { questions: [] });

async function initDB() {
  await db.read();
  db.data ||= { questions: [] };
  await db.write();
}
initDB();

// AI接口调用（通用函数，无修改）
async function callDeepSeek(prompt) {
  try {
    const res = await axios.post(
      'https://api.siliconflow.cn/v1/chat/completions',
      {
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7
      },
      { headers: { Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}` } }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('AI接口错误:', err.response?.data || err.message);
    throw new Error('AI服务调用失败');
  }
}

// 1. 新增题目（新增：回答长度控制在3-4分钟，保留英文口语化+简单句式）
router.post('/', async (req, res) => {
  let { type, content, translation, standard_answer, answer_translation } = req.body;
  try {
    // 生成标准答案
    if (!standard_answer) {
      const prompt = type === 'chinese'
        ? `你是汉语国际教育（汉硕）研究生复试面试官，针对以下复试题目给出专业、简洁的标准答案：
1. 答案长度需适配3-4分钟的口语回答（中文约600-1000字）；
2. 贴合国际中文教育专业复试场景；
3. 直接输出答案内容，不要任何思考过程、解释或多余文字。
题目：${content}`
        : `You are an interviewer for the postgraduate re-examination of International Chinese Education. 
Requirements:
1. Answer the following re-examination question professionally and concisely (fit for 3-4 minutes of oral expression, about 450-720 English words);
2. Sentence structure is SIMPLE, ORAL, easy to understand (no complex clauses or long sentences);
3. In line with the International Chinese Education re-examination scenario;
4. Only output the answer content, no thinking process, explanation or extra words.
Question: ${content}`;
      standard_answer = await callDeepSeek(prompt);
    }

    // 英文翻译（自动生成，保留直译要求）
    if (type === 'english') {
      if (!translation) {
        translation = await callDeepSeek(`将以下内容直译为中文，仅输出翻译结果，无多余解释、修饰或思考过程：${content}`);
      }
      if (!answer_translation) {
        answer_translation = await callDeepSeek(`将以下内容直译为中文，仅输出翻译结果，无多余解释、修饰或思考过程：${standard_answer}`);
      }
    }

    const newQuestion = {
      id: Date.now().toString(),
      type,
      content,
      translation,
      standard_answer,
      answer_translation,
      create_time: new Date().toLocaleString()
    };

    db.data.questions.push(newQuestion);
    await db.write();
    res.status(200).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 答案评分接口 ✅【核心修复：解决评分失败】
router.post('/grade', async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    await db.read();
    
    const question = db.data.questions.find(q => q.id === questionId);
    if (!question) return res.status(404).json({ error: '题目不存在' });

    // 🔥 修复评分提示词：强制AI简洁评分，不输出异常格式
    const prompt = question.type === 'chinese'
      ? `你是汉硕复试面试官，评分要求：
1. 对比标准答案和考生答案
2. 给出简洁评分+优点+缺点+改进建议
3. 只输出评分结果，不要任何格式、不要标题、不要多余文字
标准答案：${question.standard_answer}
考生答案：${userAnswer}`
      : `You are an interviewer. Please score the answer simply.
Requirements:
1. Compare standard answer and user answer
2. Give score, strengths, weaknesses, suggestions
3. ONLY output plain text, NO format, NO extra words
Standard: ${question.standard_answer}
User: ${userAnswer}`;

    const result = await callDeepSeek(prompt);
    res.status(200).json({ result });
  } catch (err) {
    console.error('评分失败:', err);
    res.status(500).json({ error: '评分失败，请重试' });
  }
});

// 3. 获取题目（搜索+排序）
router.get('/', async (req, res) => {
  try {
    const { keyword, sort = 'desc' } = req.query;
    await db.read();
    let list = db.data.questions;

    if (keyword) {
      const key = keyword.toLowerCase();
      list = list.filter(i =>
        (i.content?.toLowerCase().includes(key)) ||
        (i.translation?.toLowerCase().includes(key))
      );
    }

    list.sort((a, b) => sort === 'asc' ? a.id - b.id : b.id - a.id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: '获取题目失败' });
  }
});

// 4. 随机抽题
router.get('/random', async (req, res) => {
  try {
    const { chinese_count = 0, english_count = 0 } = req.query;
    await db.read();
    const all = db.data.questions;
    if (!all.length) return res.status(404).json({ error: '暂无题目' });

    const resArr = [];
    const random = (arr, n) => {
      const temp = [...arr];
      const result = [];
      const num = Math.min(n, temp.length);
      for (let i = 0; i < num; i++) {
        const idx = Math.floor(Math.random() * temp.length);
        result.push(temp.splice(idx, 1)[0]);
      }
      return result;
    };

    resArr.push(...random(all.filter(q => q.type === 'chinese'), parseInt(chinese_count)));
    resArr.push(...random(all.filter(q => q.type === 'english'), parseInt(english_count)));
    
    res.json(resArr.length ? resArr : [all[Math.floor(Math.random() * all.length)]]);
  } catch (err) {
    res.status(500).json({ error: '抽题失败' });
  }
});

// 5. 编辑题目
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.read();
    const idx = db.data.questions.findIndex(q => q.id === id);
    if (idx === -1) return res.status(404).json({ error: '题目不存在' });

    db.data.questions[idx] = { ...db.data.questions[idx], ...req.body };
    await db.write();
    res.json(db.data.questions[idx]);
  } catch (err) {
    res.status(500).json({ error: '编辑失败' });
  }
});

// 6. 删除题目
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.read();
    const len = db.data.questions.length;
    db.data.questions = db.data.questions.filter(q => q.id !== id);
    if (db.data.questions.length === len) return res.status(404).json({ error: '题目不存在' });

    await db.write();
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: '删除失败' });
  }
});

module.exports = router;