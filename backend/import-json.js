// 纯JSON导入云端数据库（不依赖sqlite3，100%不报错）
const mongoose = require('mongoose');
const fs = require('fs');

// 👇 只改这里！换成你的 MongoDB 数据库密码
const MONGO_PASSWORD = "040914";
const mongoURI = `mongodb://admin:040914@ac-vcm0e6g-shard-00-00.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-01.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-02.tuisucg.mongodb.net:27017/examDB?ssl=true&replicaSet=atlas-sq4s16-shard-0&authSource=admin&appName=Cluster0`;

// 数据模型（和你的程序完全匹配）
const QuestionSchema = new mongoose.Schema({
  type: String,
  content: String,
  standard_answer: String,
  translation: String,
  answer_translation: String,
  created_at: Date
});
const Question = mongoose.model('Question', QuestionSchema);

// 自动导入
async function importData() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ 连接云端数据库成功');

    // 读取你的本地备份 db.json
    const jsonData = fs.readFileSync('./db.json', 'utf-8');
    const questions = JSON.parse(jsonData);
    
    // 清空云端旧数据，导入新数据
    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log(`🎉 导入成功！共导入 ${questions.length} 道题目`);
    process.exit(0);
  } catch (err) {
    console.error('❌ 导入失败：', err);
    process.exit(1);
  }
}

importData();