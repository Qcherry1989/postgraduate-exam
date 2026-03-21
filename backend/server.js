// 考研题库系统 - 云端永久版（100%还原你原版功能 + 修复抽题+排序）
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库配置（你的密码和连接串，完全不变）
const MONGO_PASSWORD = "040914";
const mongoURI = `mongodb://admin:040914@ac-vcm0e6g-shard-00-00.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-01.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-02.tuisucg.mongodb.net:27017/examDB?ssl=true&replicaSet=atlas-sq4s16-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

// 连接云端数据库（完全不变）
mongoose.connect(mongoURI)
  .then(() => console.log('✅ 连接到 云端永久数据库 (数据永不丢失)'))
  .catch(err => console.log('❌ 数据库连接失败:', err));

// 数据模型（完全不变）
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
// 👇 所有你原来的代码、功能 100% 保留！
// ==============================================

// 获取题目（搜索 + 排序）【已修复排序】
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

// ✅【唯一新增】随机抽题接口（完美匹配前端，修复抽题失败）
app.get('/api/questions/random', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuestion[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加题目（完全不变）
app.post('/api/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.json({ id: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 编辑题目（完全不变）
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

// 删除题目（完全不变）
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动服务（完全不变）
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 云端后端服务运行在端口 ${port}，主机 0.0.0.0`);
});