// 自动迁移：SQLite本地数据 → MongoDB云端
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');

// 数据库连接
const mongoURI = "mongodb+srv://admin:你的数据库密码@cluster0.mongodb.net/examDB?retryWrites=true&w=majority";
const localDb = new sqlite3.Database('./questions.db');

// 数据模型
const QuestionSchema = new mongoose.Schema({
  type: String,
  content: String,
  standard_answer: String,
  translation: String,
  answer_translation: String,
  created_at: Date
});
const Question = mongoose.model('Question', QuestionSchema);

// 执行迁移
async function migrate() {
  await mongoose.connect(mongoURI);
  console.log('✅ 连接云端成功');

  // 读取本地所有题目
  localDb.all('SELECT * FROM questions', async (err, rows) => {
    if (err) throw err;

    await Question.deleteMany({}); // 清空云端
    await Question.insertMany(rows); // 批量导入

    console.log(`🎉 迁移成功！共导入 ${rows.length} 道题`);
    process.exit(0);
  });
}

migrate();