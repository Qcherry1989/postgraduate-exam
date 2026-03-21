// 考研题库系统 - 完美兼容版（前端零修改）
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 10000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接
const MONGO_PASSWORD = "040914";
const mongoURI = `mongodb://admin:${MONGO_PASSWORD}@ac-vcm0e6g-shard-00-00.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-01.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-02.tuisucg.mongodb.net:27017/examDB?ssl=true&replicaSet=atlas-sq4s16-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ 数据库连接成功'))
  .catch(err => console.log('⚠️ 数据库连接失败:', err.message));

// 数据模型（关键：加了虚拟字段 id，完美兼容前端）
const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  standard_answer: String,
  translation: String,
  answer_translation: String,
  created_at: { type: Date, default: Date.now }
});

// ✅ 核心修复：把 MongoDB 的 _id 虚拟成 id，前端不用改代码
QuestionSchema.virtual('id').get(function() {
  return this._id.toString();
});

// 确保 JSON 输出时包含 id 字段
QuestionSchema.set('toJSON', { virtuals: true });
QuestionSchema.set('toObject', { virtuals: true });

const Question = mongoose.model('Question', QuestionSchema);

// 测试接口
app.get('/', (req, res) => {
  res.send('✅ 后端服务正常运行！');
});

// ==============================================
// 👇 完美兼容你原来的所有功能
// ==============================================

// 获取题目（搜索 + 排序）
app.get('/api/questions', async (req, res) => {
  try {
    const { keyword, sort } = req.query;
    let query = {};
    if (keyword) {
      query.content = { $regex: keyword, $options: 'i' };
    }
    // ✅ 修复排序：按 _id 排序，和你原来按 id 排序效果完全一样
    const sortOrder = sort === 'asc' ? 1 : -1;
    const questions = await Question.find(query).sort({ _id: sortOrder });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 新增：随机抽题接口（如果你的抽题功能是前端做的，这个可以不用，但加上更保险）
app.get('/api/questions/random', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuestion = await Question.findOne().skip(random);
    res.json(randomQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加题目
app.post('/api/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.json({ id: saved.id }); // 返回 id，不是 _id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 编辑题目
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

// 删除题目
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动服务
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 服务运行在端口 ${port}`);
});