// 万能导入脚本：自动识别 db.json 结构，100%导入成功
const mongoose = require('mongoose');
const fs = require('fs');

// ⚠️ 换成你的 MongoDB 连接串（关掉SRV后的那个长串）
const mongoURI = "mongodb://admin:040914@ac-vcm0e6g-shard-00-00.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-01.tuisucg.mongodb.net:27017,ac-vcm0e6g-shard-00-02.tuisucg.mongodb.net:27017/examDB?ssl=true&replicaSet=atlas-sq4s16-shard-0&authSource=admin&appName=Cluster0";

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

// 万能导入
async function importUltimate() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ 连接云端数据库成功');

    // 读取 db.json
    const rawData = fs.readFileSync('./db.json', 'utf-8');
    const json = JSON.parse(rawData);
    
    // 自动识别结构，提取题目数组
    let questions = [];
    if (Array.isArray(json)) {
      questions = json; // 结构A：直接是数组
    } else if (json.questions && Array.isArray(json.questions)) {
      questions = json.questions; // 结构B：在 questions 字段里
    } else {
      // 暴力尝试：找第一个是数组的字段
      for (const key in json) {
        if (Array.isArray(json[key])) {
          questions = json[key];
          break;
        }
      }
    }

    if (questions.length === 0) {
      console.log('❌ 没在 db.json 里找到题目数组，请检查文件内容');
      console.log('你 db.json 的内容是：', JSON.stringify(json, null, 2));
      process.exit(1);
    }

    console.log(`✅ 识别到 ${questions.length} 道题目，开始导入...`);

    // 清空云端旧数据，导入新数据
    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log(`🎉 完美成功！共导入 ${questions.length} 道题目！`);
    
    // 验证一下
    const count = await Question.countDocuments();
    console.log(`📊 云端数据库现在共有 ${count} 道题`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ 导入失败：', err);
    process.exit(1);
  }
}

importUltimate();