// 考研题库系统 - 云端永久版（增加AI生成答案 + 评分功能）
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();   // 加载环境变量

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// ==================== 数据库配置（建议使用环境变量）====================
// 方案一：直接用环境变量（更安全）
const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:040914@ac-vcm0e6g-shard-00-00.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-01.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-02.tuisucg.mongodb.net:27017/examDB?ssl=true&replicaSet=atlas-sq4s16-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ 数据库连接成功'))
  .catch(err => console.log('❌ 数据库连接失败:', err));

// 数据模型（保持和原有一致）
const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  standard_answer: String,
  translation: String,
  answer_translation: String,
  created_at: { type: Date, default: Date.now }
});
const Question = mongoose.model('Question', QuestionSchema);

// ==================== AI 调用函数（从 questions.js 复制，并适配） ====================
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

// ===================== 原有功能（保留并增强） =====================

// 1. 获取题目（排序已修复）
app.get('/api/questions', async (req, res) => {
  try {
    const { keyword, sort } = req.query;
    let query = {};
    if (keyword) {
      query.content = { $regex: keyword, $options: 'i' };
    }
    const sortOrder = sort === 'asc' ? 1 : -1;
    const questions = await Question.find(query).sort({ _id: sortOrder });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 随机抽题（支持数量参数，模拟复试组件可能需要）
app.get('/api/questions/random', async (req, res) => {
  try {
    const { chinese_count = 1, english_count = 0 } = req.query;
    // 获取全部题目
    const all = await Question.find();
    if (all.length === 0) return res.status(404).json({ error: '题库为空' });

    const chinese = all.filter(q => q.type === 'chinese');
    const english = all.filter(q => q.type === 'english');

    const randomSelect = (arr, count) => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
    };

    const selected = [
      ...randomSelect(chinese, parseInt(chinese_count)),
      ...randomSelect(english, parseInt(english_count))
    ];
    res.json(selected);
  } catch (err) {
    res.status(500).json({ error: '抽题失败' });
  }
});

// 3. 添加题目（AI 自动生成答案）⭐ 核心修复
app.post('/api/questions', async (req, res) => {
  let { type, content, translation, standard_answer, answer_translation } = req.body;
  try {
    // 如果前端没有提供标准答案，就调用 AI 生成
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

    // 如果是英文题，且未提供翻译，自动生成翻译
    if (type === 'english') {
      if (!translation) {
        translation = await callDeepSeek(`将以下内容直译为中文，仅输出翻译结果，无多余解释、修饰或思考过程：${content}`);
      }
      if (!answer_translation) {
        answer_translation = await callDeepSeek(`将以下内容直译为中文，仅输出翻译结果，无多余解释、修饰或思考过程：${standard_answer}`);
      }
    }

    const newQuestion = new Question({
      type,
      content,
      standard_answer,
      translation,
      answer_translation
    });
    const saved = await newQuestion.save();
    res.json({ id: saved._id, ...saved.toObject() });
  } catch (err) {
    console.error('添加题目失败:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. 编辑题目（保持原样）
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { content, standard_answer, translation, answer_translation } = req.body;
    await Question.findByIdAndUpdate(req.params.id, {
      content, standard_answer, translation, answer_translation
    });
    res.json({ message: '更新成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. 删除题目
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== 新增评分路由（解决 404 错误） ====================
app.post('/api/questions/grade', async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    // 从数据库查询题目
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: '题目不存在' });

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

// 启动服务（适配Render）
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 服务运行在端口 ${port}`);
});