const cors = require('cors');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(cors()); // 允许前端网页访问后端接口
const port = process.env.PORT || 3000;
// 中间件
app.use(cors());
app.use(express.json());

// 数据库初始化
const db = new sqlite3.Database('./questions.db', (err) => {
  if (err) console.error(err.message);
  console.log('✅ 连接到SQLite数据库');
});

// 创建表
db.run(`CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  standard_answer TEXT,
  translation TEXT,
  answer_translation TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// 获取题目（支持搜索+排序）
app.get('/api/questions', (req, res) => {
  const { keyword, sort } = req.query;
  let sql = 'SELECT * FROM questions WHERE 1=1';
  const params = [];
  if (keyword) {
    sql += ' AND content LIKE ?';
    params.push(`%${keyword}%`);
  }
  sql += sort === 'asc' ? ' ORDER BY id ASC' : ' ORDER BY id DESC';
  db.all(sql, params, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// 添加题目
app.post('/api/questions', (req, res) => {
  const { type, content, standard_answer, translation, answer_translation } = req.body;
  const sql = 'INSERT INTO questions (type, content, standard_answer, translation, answer_translation) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [type, content, standard_answer, translation, answer_translation], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID });
  });
});

// 编辑题目
app.put('/api/questions/:id', (req, res) => {
  const { content, standard_answer, translation, answer_translation } = req.body;
  const sql = 'UPDATE questions SET content=?, standard_answer=?, translation=?, answer_translation=? WHERE id=?';
  db.run(sql, [content, standard_answer, translation, answer_translation, req.params.id], (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: '更新成功' });
  });
});

// 删除题目
app.delete('/api/questions/:id', (req, res) => {
  const sql = 'DELETE FROM questions WHERE id=?';
  db.run(sql, [req.params.id], (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: '删除成功' });
  });
});

// 启动服务
app.listen(port, () => {
  console.log(`🚀 后端服务运行在 http://localhost:${port}`);
});