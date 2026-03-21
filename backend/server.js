const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

// 中间件
app.use(cors());
app.use(express.json());

// 测试接口：先不管数据库，确保服务能通
app.get('/', (req, res) => {
  res.send('✅ 后端服务正常运行！');
});

app.get('/api/test', (req, res) => {
  res.json({ message: '测试成功', port: port });
});

// ⚠️ 关键：明确绑定 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 服务运行在端口 ${port}，主机 0.0.0.0`);
});