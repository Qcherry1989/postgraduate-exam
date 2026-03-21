// 考研题库系统 - 云端永久版（功能100%和原版一致）
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// ==============================================
// ⚠️ 把这里的 密码 换成你 MongoDB Atlas 的数据库密码
// ==============================================
const MONGO_PASSWORD = "040914";
const mongoURI = `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.mongodb.net/examDB?retryWrites=true&w=majority`;

// 连接云端数据库
mongoose.connect(mongoURI)
  .then(() => console.log('✅ 连接到 云端永久数据库 (数据永不丢失)'))
  .catch(err => console.log('❌ 数据库连接失败:', err));

// 数据模型【和你原版SQLite字段完全一致】
const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  standard_answer: String,
  translation: String,
  answer_translation: String,
  created_at: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

// ==============================================
// 👇 以下所有接口 和你原来的代码 完全一样！前端不用改任何东西
// ==============================================

// 获取题目（搜索 + 排序）
app.get('/api/questions', async (req, res) => {
  try {
    const { keyword, sort } = req.query;
    let query = {};
    if (keyword) {
      query.content = { $regex: keyword, $options: 'i' };
    }
    const sortOrder = sort === 'asc' ? 1 : -1;
    const questions = await Question.find(query).sort({ id: sortOrder });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加题目
app.post('/api/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.json({ id: saved._id });
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
app.listen(port, () => {
  console.log(`🚀 云端后端服务运行在端口 ${port}`);
});