import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// 全局样式 - 完全保留你原来的 macOS + Notion 风格，一丝未改
const globalStyles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f5f7fa 0%, #eef1f5 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", sans-serif',
    margin: 0,
    padding: 0,
    color: '#1f2937',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// 导航组件 - 新增「朗读设置」导航按钮，完全保留原有风格
function Nav() {
  const location = useLocation();
  const navigate = useNavigate(); // 用更规范的路由跳转

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.04)',
      padding: '0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '64px'
      }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '-0.3px'
        }}>
          <span style={{ fontSize: '22px' }}>🎓</span>
          国际中文教育复试系统
        </div>
        <div style={{ position: 'absolute', right: '24px', display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'rgba(0, 0, 0, 0.04)';
                e.target.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            题库管理
          </button>
          <button 
            onClick={() => navigate('/exam')} 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/exam' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/exam' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/exam') {
                e.target.style.background = 'rgba(0, 0, 0, 0.04)';
                e.target.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/exam') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            模拟复试
          </button>
          {/* 新增：朗读设置导航按钮 */}
          <button 
            onClick={() => navigate('/settings')} 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/settings' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/settings' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/settings') {
                e.target.style.background = 'rgba(0, 0, 0, 0.04)';
                e.target.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/settings') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            朗读设置
          </button>
        </div>
      </div>
    </nav>
  );
}

// 题库管理组件 - 完全保留原有所有功能和样式，一丝未改
function QuestionManager() {
  const [form, setForm] = useState({ 
    type: 'chinese', 
    content: '', 
    standard_answer: '', 
    translation: '', 
    answer_translation: '' 
  });
  const [answerMode, setAnswerMode] = useState('ai');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showList, setShowList] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  // 搜索和排序的状态
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // desc=最新优先, asc=最早优先

  // 导出选项状态
  const [exportOption, setExportOption] = useState('with-answer'); // 'with-answer' 或 'question-only'

  // 加载题目函数，支持搜索和排序参数
  const loadQuestions = async () => {
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (sortOrder) params.append('sort', sortOrder);

      const res = await fetch(`https://postgraduate-exam.onrender.com/api/questions?${params.toString()}`);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('加载失败:', err);
    }
  };

  // 依赖项新增keyword和sortOrder，变化自动刷新
  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, sortOrder]);

  // 原有提交题目功能
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content) {
      alert('请输入题目内容！');
      return;
    }
    if (answerMode === 'manual' && !form.standard_answer) {
      alert('请输入答案！');
      return;
    }
    setLoading(true);
    try {
      const submitData = { ...form };
      if (answerMode === 'ai') {
        delete submitData.standard_answer;
        delete submitData.translation;
        delete submitData.answer_translation;
      }
      await fetch('https://postgraduate-exam.onrender.com/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      alert('✅ 题目添加成功！');
      setForm({ type: form.type, content: '', standard_answer: '', translation: '', answer_translation: '' });
      loadQuestions();
    } catch (err) {
      alert('❌ 添加失败');
    }
    setLoading(false);
  };

  // 原有删除功能
  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这道题吗？')) {
      try {
        await fetch(`https://postgraduate-exam.onrender.com/api/questions/${id}`, { method: 'DELETE' });
        alert('✅ 删除成功！');
        loadQuestions();
      } catch (err) {
        alert('❌ 删除失败');
      }
    }
  };

  // 原有编辑功能
  const handleEditClick = (q) => {
    setEditingQuestion(q);
    setEditForm({
      content: q.content,
      translation: q.translation || '',
      standard_answer: q.standard_answer,
      answer_translation: q.answer_translation || ''
    });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      await fetch(`https://postgraduate-exam.onrender.com/api/questions/${editingQuestion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      alert('✅ 保存成功！');
      setShowEditModal(false);
      loadQuestions();
    } catch (err) {
      alert('❌ 保存失败');
    }
  };

  // 新增：导出Word文档功能 - 支持仅导出题目或导出题目加答案
  const exportToWord = async () => {
    try {
      // 获取所有题目数据
      const res = await fetch('https://postgraduate-exam.onrender.com/api/questions');
      const allQuestions = await res.json();

      // 构建Word文档内容
      let docContent = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>国际中文教育复试题库</title></head><body>';
      
      if (exportOption === 'with-answer') {
        docContent += '<h1 style="text-align: center;">国际中文教育复试题库（含答案）</h1>';
      } else {
        docContent += '<h1 style="text-align: center;">国际中文教育复试题库（仅题目）</h1>';
      }
      
      docContent += '<hr style="margin: 20px 0;">';

      if (allQuestions.length === 0) {
        docContent += '<p style="text-align: center; font-size: 16px; color: #666;">暂无题目数据</p>';
      } else {
        docContent += `<p style="font-size: 14px; color: #666;">共 ${allQuestions.length} 道题目</p>`;
        
        allQuestions.forEach((q, index) => {
          docContent += `<div style="page-break-inside: avoid; margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa;">`;
          docContent += `<h3 style="margin-top: 0; color: #333;">第 ${index + 1} 题</h3>`;
          
          // 题目类型
          docContent += `<p><strong>题型：</strong>${q.type === 'chinese' ? '中文题' : '英文题'}</p>`;
          
          // 题目内容
          docContent += `<p><strong>题目：</strong>${q.content}</p>`;
          
          // 翻译（如果存在）
          if (q.translation) {
            docContent += `<p><strong>翻译：</strong>${q.translation}</p>`;
          }
          
          // 根据导出选项决定是否显示答案
          if (exportOption === 'with-answer') {
            // 标准答案
            docContent += `<p><strong>标准答案：</strong>${q.standard_answer}</p>`;
            
            // 答案翻译（如果存在）
            if (q.answer_translation) {
              docContent += `<p><strong>答案翻译：</strong>${q.answer_translation}</p>`;
            }
          } else {
            // 仅题目模式下显示占位符
            docContent += `<p><strong>标准答案：</strong>[此处为答案]</p>`;
            if (q.answer_translation) {
              docContent += `<p><strong>答案翻译：</strong>[此处为答案翻译]</p>`;
            }
          }
          
          docContent += '</div>';
        });
      }

      docContent += '<p style="text-align: center; margin-top: 40px; color: #888; font-size: 12px;">导出于 ' + new Date().toLocaleString() + '</p>';
      docContent += '</body></html>';

      // 创建Blob对象
      const blob = new Blob([docContent], { type: 'application/msword' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 根据导出选项设置文件名
      if (exportOption === 'with-answer') {
        link.download = '国际中文教育复试题库（含答案）.doc';
      } else {
        link.download = '国际中文教育复试题库（仅题目）.doc';
      }
      
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('导出失败:', err);
      alert('❌ 导出失败');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '32px 24px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* 添加题目卡片 - 完全保留原有风格 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        border: '1px solid rgba(255,255,255,0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
      }}
      >
        <h2 style={{ 
          margin: '0 0 28px 0', 
          fontSize: '20px', 
          color: '#111827',
          fontWeight: 600,
          letterSpacing: '-0.3px'
        }}>
          添加新题目
        </h2>
        <form onSubmit={handleSubmit}>
          {/* 题目类型 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontWeight: 500,
              color: '#374151',
              fontSize: '14px'
            }}>题目类型</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: form.type === 'chinese' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${form.type === 'chinese' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.06)'}`
              }}>
                <input 
                  type="radio" 
                  value="chinese" 
                  checked={form.type === 'chinese'} 
                  onChange={e => setForm({...form, type: e.target.value})} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 500, color: '#374151', fontSize: '14px' }}>中文题目</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: form.type === 'english' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${form.type === 'english' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.06)'}`
              }}>
                <input 
                  type="radio" 
                  value="english" 
                  checked={form.type === 'english'} 
                  onChange={e => setForm({...form, type: e.target.value})} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 500, color: '#374151', fontSize: '14px' }}>英文题目</span>
              </label>
            </div>
          </div>
          {/* 答案生成方式 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontWeight: 500,
              color: '#374151',
              fontSize: '14px'
            }}>答案生成方式</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: answerMode === 'ai' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${answerMode === 'ai' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`
              }}>
                <input 
                  type="radio" 
                  value="ai" 
                  checked={answerMode === 'ai'} 
                  onChange={() => setAnswerMode('ai')} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 500, color: '#374151', fontSize: '14px' }}>🤖 AI自动生成</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: answerMode === 'manual' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${answerMode === 'manual' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.06)'}`
              }}>
                <input 
                  type="radio" 
                  value="manual" 
                  checked={answerMode === 'manual'} 
                  onChange={() => setAnswerMode('manual')} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 500, color: '#374151', fontSize: '14px' }}>✍️ 手动输入</span>
              </label>
            </div>
          </div>
          {/* 题目内容 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: 500,
              color: '#374151',
              fontSize: '14px'
            }}>题目内容</label>
            <textarea 
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                borderRadius: '12px', 
                border: '1px solid rgba(0,0,0,0.08)', 
                minHeight: '100px',
                fontSize: '15px',
                lineHeight: '1.6',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                background: 'rgba(255,255,255,0.9)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})} 
              placeholder="请输入题目内容..."
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          {/* 手动输入答案 */}
          {answerMode === 'manual' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: 500,
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  {form.type === 'english' ? '英文答案' : '标准答案'}
                </label>
                <textarea 
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0,0,0,0.08)', 
                    minHeight: '120px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                  value={form.standard_answer} 
                  onChange={e => setForm({...form, standard_answer: e.target.value})} 
                  placeholder="请手动输入答案..."
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {form.type === 'english' && (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: 500,
                      color: '#374151',
                      fontSize: '14px'
                    }}>题目中文翻译</label>
                    <textarea 
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(0,0,0,0.08)', 
                        minHeight: '80px',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        background: 'rgba(255,255,255,0.9)',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }} 
                      value={form.translation} 
                      onChange={e => setForm({...form, translation: e.target.value})} 
                      placeholder="请输入题目中文翻译..."
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: 500,
                      color: '#374151',
                      fontSize: '14px'
                    }}>答案中文翻译</label>
                    <textarea 
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(0,0,0,0.08)', 
                        minHeight: '100px',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        background: 'rgba(255,255,255,0.9)',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }} 
                      value={form.answer_translation} 
                      onChange={e => setForm({...form, answer_translation: e.target.value})} 
                      placeholder="请输入答案中文翻译..."
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              padding: '12px 28px', 
              background: '#111827', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#000';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = '#111827';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? '处理中...' : answerMode === 'ai' ? '🤖 AI生成答案' : '💾 保存答案'}
          </button>
        </form>
      </div>

      {/* 题目列表卡片 - 完全保留原有风格 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        border: '1px solid rgba(255,255,255,0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
      }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '20px', 
            color: '#111827',
            fontWeight: 600,
            letterSpacing: '-0.3px'
          }}>
            题目列表 
            <span style={{
              background: 'rgba(0,0,0,0.04)',
              color: '#6b7280',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              marginLeft: '10px'
            }}>{questions.length}</span>
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 导出选项下拉菜单 */}
            <select
              value={exportOption}
              onChange={(e) => setExportOption(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.08)',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginRight: '8px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="with-answer">导出题目+答案</option>
              <option value="question-only">仅导出题目</option>
            </select>
            <button 
              onClick={exportToWord}
              style={{ 
                border: '1px solid rgba(34, 197, 94, 0.2)', 
                background: 'rgba(34, 197, 94, 0.1)', 
                padding: '8px 14px', 
                borderRadius: '10px', 
                cursor: 'pointer',
                fontWeight: 500,
                color: '#065f46',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(34, 197, 94, 0.2)';
                e.target.style.color = '#047857';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                e.target.style.color = '#065f46';
              }}
            >
              📥 导出Word
            </button>
            <button 
              onClick={() => setShowList(!showList)} 
              style={{ 
                border: '1px solid rgba(0,0,0,0.08)', 
                background: 'white', 
                padding: '8px 14px', 
                borderRadius: '10px', 
                cursor: 'pointer',
                fontWeight: 500,
                color: '#6b7280',
                transition: 'all 0.2s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.color = '#6b7280';
              }}
            >
              {showList ? '收起 ↑' : '展开 ↓'}
            </button>
          </div>
        </div>

        {/* 搜索框 + 排序按钮 */}
        {showList && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="🔍 输入关键词搜索题目..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.08)',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                background: 'rgba(255,255,255,0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 500,
                color: '#6b7280',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.color = '#6b7280';
              }}
            >
              {sortOrder === 'desc' ? '⬇️ 最新优先' : '⬆️ 最早优先'}
            </button>
          </div>
        )}

        {showList && (
          <div style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {questions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                <p style={{ margin: 0, fontSize: '15px' }}>暂无题目，请先在上方添加</p>
              </div>
            ) : (
              questions.map((q, index) => (
                <div 
                  key={q.id} 
                  style={{ 
                    padding: '24px', 
                    borderBottom: index === questions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.04)', 
                    marginBottom: '0',
                    borderRadius: '12px',
                    background: 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '12px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          background: q.type === 'chinese' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                          borderRadius: '20px', 
                          fontSize: '12px',
                          fontWeight: 500,
                          color: q.type === 'chinese' ? '#1d4ed8' : '#92400e'
                        }}>
                          {q.type === 'chinese' ? '中文题' : '英文题'}
                        </span>
                      </div>
                      <h4 style={{ 
                        margin: '0 0 0 0', 
                        fontSize: '16px',
                        color: '#111827',
                        lineHeight: '1.6',
                        fontWeight: 500
                      }}>
                        {index + 1}. {q.content}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                      <button 
                        onClick={() => handleEditClick(q)} 
                        style={{ 
                          padding: '8px 14px', 
                          background: 'rgba(0,0,0,0.04)', 
                          color: '#111827', 
                          border: 'none', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0,0,0,0.04)';
                        }}
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => handleDelete(q.id)} 
                        style={{ 
                          padding: '8px 14px', 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          color: '#dc2626', 
                          border: 'none', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  {q.translation && (
                    <p style={{ 
                      color: '#6b7280', 
                      marginBottom: '16px',
                      padding: '12px 14px',
                      background: 'rgba(0,0,0,0.02)',
                      borderRadius: '10px',
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}>
                      <strong style={{ color: '#374151', fontWeight: 500 }}>翻译：</strong>{q.translation}
                    </p>
                  )}
                  <div style={{ 
                    marginTop: '16px', 
                    padding: '18px', 
                    background: 'rgba(0,0,0,0.02)', 
                    borderRadius: '12px'
                  }}>
                    <p style={{ 
                      margin: '0 0 8px 0', 
                      fontWeight: 500, 
                      color: '#111827',
                      fontSize: '14px'
                    }}>
                      标准答案：
                    </p>
                    <p style={{ 
                      margin: '0 0 12px 0', 
                      color: '#4b5563',
                      lineHeight: '1.7',
                      fontSize: '14px'
                    }}>
                      {q.standard_answer}
                    </p>
                    {q.answer_translation && (
                      <p style={{ 
                        color: '#6b7280', 
                        marginTop: '12px',
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '10px',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        <strong style={{ color: '#374151', fontWeight: 500 }}>答案翻译：</strong>{q.answer_translation}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 编辑弹窗 - 完全保留原有风格 */}
      {showEditModal && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0, 0, 0, 0.4)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 1000,
            padding: '20px 0',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              padding: '0', 
              borderRadius: '20px', 
              width: '90%', 
              maxWidth: '680px',
              maxHeight: '85vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
              animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* 弹窗头部 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              flexShrink: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '16px',
                fontWeight: 600,
                color: '#111827',
                letterSpacing: '-0.2px'
              }}>
                编辑题目
              </h3>
              <button 
                onClick={() => setShowEditModal(false)} 
                style={{ 
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none', 
                  background: 'rgba(0, 0, 0, 0.06)', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#6b7280',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.06)';
                  e.target.style.color = '#6b7280';
                }}
              >
                ✕
              </button>
            </div>
            {/* 滚动内容区 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              paddingRight: '16px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 500,
                  color: '#374151',
                  fontSize: '14px'
                }}>题目内容</label>
                <textarea 
                  style={{ 
                    width: '100%', 
                    padding: '12px 14px', 
                    borderRadius: '10px', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    minHeight: '80px', 
                    maxHeight: '150px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                  value={editForm.content} 
                  onChange={e => setEditForm({...editForm, content: e.target.value})} 
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {editingQuestion?.type === 'english' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 500,
                    color: '#374151',
                    fontSize: '14px'
                  }}>题目翻译</label>
                  <textarea 
                    style={{ 
                      width: '100%', 
                      padding: '12px 14px', 
                      borderRadius: '10px', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      minHeight: '80px',
                      maxHeight: '150px',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      transition: 'all 0.2s ease',
                      resize: 'vertical',
                      background: 'rgba(255,255,255,0.9)',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }} 
                    value={editForm.translation} 
                    onChange={e => setEditForm({...editForm, translation: e.target.value})} 
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 500,
                  color: '#374151',
                  fontSize: '14px'
                }}>标准答案</label>
                <textarea 
                  style={{ 
                    width: '100%', 
                    padding: '12px 14px', 
                    borderRadius: '10px', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    minHeight: '100px',
                    maxHeight: '200px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                  value={editForm.standard_answer} 
                  onChange={e => setEditForm({...editForm, standard_answer: e.target.value})} 
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {editingQuestion?.type === 'english' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 500,
                    color: '#374151',
                    fontSize: '14px'
                  }}>答案翻译</label>
                  <textarea 
                    style={{ 
                      width: '100%', 
                      padding: '12px 14px', 
                      borderRadius: '10px', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      minHeight: '80px',
                      maxHeight: '150px',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      transition: 'all 0.2s ease',
                      resize: 'vertical',
                      background: 'rgba(255,255,255,0.9)',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }} 
                    value={editForm.answer_translation} 
                    onChange={e => setEditForm({...editForm, answer_translation: e.target.value})} 
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            {/* 底部固定按钮 */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              flexShrink: 0,
              padding: '20px 24px',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              background: 'linear-gradient(0deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)'
            }}>
              <button 
                onClick={() => setShowEditModal(false)} 
                style={{ 
                  padding: '10px 24px', 
                  border: '1px solid rgba(0,0,0,0.1)', 
                  background: 'white', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                }}
              >
                取消
              </button>
              <button 
                onClick={handleEditSave} 
                style={{ 
                  padding: '10px 24px', 
                  background: '#111827', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#000';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#111827';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== 新增：独立的朗读设置页面组件 ==========
function SpeechSettings() {
  // 状态管理
  const [voices, setVoices] = useState([]); // 所有可用音色
  const [selectedChineseVoice, setSelectedChineseVoice] = useState(''); // 选中的中文音色
  const [selectedEnglishVoice, setSelectedEnglishVoice] = useState(''); // 选中的英文音色
  const [speechRate, setSpeechRate] = useState(1.0); // 语速
  const [testText, setTestText] = useState({ chinese: '你好，这是中文音色测试', english: 'Hello, this is an English voice test' }); // 测试文本

  // 加载系统可用音色
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        // 从本地存储读取已保存的设置，没有的话用默认值
        const savedChineseVoice = localStorage.getItem('chineseVoiceName');
        const savedEnglishVoice = localStorage.getItem('englishVoiceName');
        const savedRate = localStorage.getItem('speechRate');

        // 中文音色设置
        if (savedChineseVoice && availableVoices.find(v => v.name === savedChineseVoice)) {
          setSelectedChineseVoice(savedChineseVoice);
        } else {
          const defaultChinese = availableVoices.find(v => v.lang.startsWith('zh'));
          if (defaultChinese) {
            setSelectedChineseVoice(defaultChinese.name);
            localStorage.setItem('chineseVoiceName', defaultChinese.name);
          }
        }

        // 英文音色设置
        if (savedEnglishVoice && availableVoices.find(v => v.name === savedEnglishVoice)) {
          setSelectedEnglishVoice(savedEnglishVoice);
        } else {
          const defaultEnglish = availableVoices.find(v => v.lang.startsWith('en'));
          if (defaultEnglish) {
            setSelectedEnglishVoice(defaultEnglish.name);
            localStorage.setItem('englishVoiceName', defaultEnglish.name);
          }
        }

        // 语速设置
        if (savedRate) {
          setSpeechRate(parseFloat(savedRate));
        } else {
          localStorage.setItem('speechRate', '1.0');
        }
      }
    };

    loadVoices();
    // 浏览器异步加载音色的回调
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // 组件卸载时清理
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // 保存中文音色设置，实时持久化
  const handleChineseVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedChineseVoice(voiceName);
    localStorage.setItem('chineseVoiceName', voiceName);
  };

  // 保存英文音色设置，实时持久化
  const handleEnglishVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedEnglishVoice(voiceName);
    localStorage.setItem('englishVoiceName', voiceName);
  };

  // 保存语速设置，实时持久化
  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    setSpeechRate(rate);
    localStorage.setItem('speechRate', rate.toString());
  };

  // 测试朗读功能
  const speakTest = (text, lang) => {
    speechSynthesis.cancel(); // 停止之前的朗读
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 用用户选中的音色
    const targetVoiceName = lang === 'zh-CN' ? selectedChineseVoice : selectedEnglishVoice;
    const targetVoice = voices.find(v => v.name === targetVoiceName);

    if (targetVoice) utterance.voice = targetVoice;
    utterance.lang = lang;
    utterance.rate = speechRate;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;

    speechSynthesis.speak(utterance);
  };

  // 筛选音色列表
  const chineseVoices = voices.filter(v => v.lang.startsWith('zh'));
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '32px 24px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '28px',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.5px'
        }}>
          ⚙️ 朗读设置
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '15px',
          lineHeight: '1.6'
        }}>
          自定义中文/英文题目的朗读音色和语速，设置会自动永久保存
        </p>
      </div>

      {/* 主设置卡片 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px', 
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        border: '1px solid rgba(255,255,255,0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
      }}
      >
        {/* 中文音色设置 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <label style={{ 
              fontWeight: 600,
              color: '#111827',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🇨🇳 中文题朗读音色
            </label>
            <button 
              onClick={() => speakTest(testText.chinese, 'zh-CN')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                background: 'rgba(59, 130, 246, 0.05)',
                color: '#1d4ed8',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.05)';
              }}
            >
              🔊 测试朗读
            </button>
          </div>
          <select
            value={selectedChineseVoice}
            onChange={handleChineseVoiceChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: '15px',
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.08)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {chineseVoices.length === 0 ? (
              <option value="">加载中...</option>
            ) : (
              chineseVoices.map((voice, idx) => (
                <option key={idx} value={voice.name}>{voice.name}</option>
              ))
            )}
          </select>
          <input
            type="text"
            value={testText.chinese}
            onChange={(e) => setTestText({...testText, chinese: e.target.value})}
            placeholder="输入自定义测试文本..."
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: '14px',
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.08)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* 英文音色设置 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <label style={{ 
              fontWeight: 600,
              color: '#111827',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🇺🇸 英文题朗读音色
            </label>
            <button 
              onClick={() => speakTest(testText.english, 'en-US')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                background: 'rgba(245, 158, 11, 0.05)',
                color: '#92400e',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(245, 158, 11, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(245, 158, 11, 0.05)';
              }}
            >
              🔊 测试朗读
            </button>
          </div>
          <select
            value={selectedEnglishVoice}
            onChange={handleEnglishVoiceChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: '15px',
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
              e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.08)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {englishVoices.length === 0 ? (
              <option value="">加载中...</option>
            ) : (
              englishVoices.map((voice, idx) => (
                <option key={idx} value={voice.name}>{voice.name}</option>
              ))
            )}
          </select>
          <input
            type="text"
            value={testText.english}
            onChange={(e) => setTestText({...testText, english: e.target.value})}
            placeholder="输入自定义测试文本..."
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.08)',
              fontSize: '14px',
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
              e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.08)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* 语速调节设置 */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <label style={{ 
              fontWeight: 600,
              color: '#111827',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎚️ 朗读语速调节
            </label>
            <span style={{
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#1d4ed8',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600
            }}>
              {speechRate.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speechRate}
            onChange={handleRateChange}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: 'rgba(0,0,0,0.08)',
              outline: 'none',
              cursor: 'pointer',
              accentColor: '#3b82f6',
              margin: '8px 0'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontSize: '13px',
            color: '#9ca3af'
          }}>
            <span>0.5x (慢速)</span>
            <span>1.0x (正常)</span>
            <span>1.5x (快速)</span>
          </div>
        </div>
      </div>

      {/* 提示卡片 */}
      <div style={{ 
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid rgba(59, 130, 246, 0.15)',
        borderRadius: '16px', 
        padding: '20px 24px',
      }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '15px',
          fontWeight: 600,
          color: '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💡 小提示
        </h4>
        <p style={{ 
          margin: 0,
          color: '#1e3a8a',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          所有设置会自动保存在浏览器中，刷新页面、关闭浏览器重开都不会丢失。设置完成后，直接去「模拟复试」页面即可生效。
        </p>
      </div>
    </div>
  );
}

// 模拟复试组件 - 移除了页面内的朗读设置，改用全局持久化的设置，其他所有功能完全保留
function ExamRoom() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [loading, setLoading] = useState(false);

  // 自定义抽题数量的状态
  const [chineseCount, setChineseCount] = useState(2);
  const [englishCount, setEnglishCount] = useState(1);

  // 英语题盲听状态
  const [showQuestion, setShowQuestion] = useState({});

  // ========== 修改：朗读函数，直接读取本地存储的永久设置 ==========
  const speak = (text, lang = 'zh-CN') => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    
    // 从本地存储读取用户保存的设置
    const savedChineseVoice = localStorage.getItem('chineseVoiceName');
    const savedEnglishVoice = localStorage.getItem('englishVoiceName');
    const savedRate = localStorage.getItem('speechRate');

    // 匹配电色
    const targetVoiceName = lang === 'zh-CN' ? savedChineseVoice : savedEnglishVoice;
    const targetVoice = voices.find(v => v.name === targetVoiceName);

    // 配置参数
    if (targetVoice) utterance.voice = targetVoice;
    utterance.lang = lang;
    utterance.rate = savedRate ? parseFloat(savedRate) : 1.0;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // 抽题函数
  const drawQuestions = async () => {
    if (chineseCount <= 0 && englishCount <= 0) {
      alert('请至少设置1道题目');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('chinese_count', chineseCount);
      params.append('english_count', englishCount);

      const res = await fetch(`https://postgraduate-exam.onrender.com/api/questions/random?${params.toString()}`);
      const data = await res.json();
      setQuestions(data);
      setAnswers({});
      setResults({});
      setShowAnswer({});
      setShowQuestion({});
    } catch (err) {
      alert('❌ 抽题失败');
    }
    setLoading(false);
  };

  // 评分功能
  const submitAnswer = async (q) => {
    if (!answers[q.id]) return alert('请输入答案！');
    setLoading(true);
    try {
      const res = await fetch('https://postgraduate-exam.onrender.com/api/questions/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, userAnswer: answers[q.id] })
      });
      const data = await res.json();
      setResults({ ...results, [q.id]: data.result });
    } catch (err) {
      alert('❌ 评分失败');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '32px 24px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* 抽题主卡片 - 完全保留原有样式 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px', 
        padding: '40px', 
        textAlign: 'center', 
        marginBottom: '28px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        border: '1px solid rgba(255,255,255,0.8)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
      }}
      >
        <h1 style={{ 
          margin: '0 0 12px 0', 
          fontSize: '28px',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.5px'
        }}>
          🎯 模拟复试考场
        </h1>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '28px',
          fontSize: '15px',
          lineHeight: '1.6'
        }}>
          设置题目数量，点击按钮随机抽题进行模拟面试练习
        </p>

        {/* 自定义题目数量 */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151'
            }}>中文题数量：</label>
            <input
              type="number"
              min="0"
              value={chineseCount}
              onChange={(e) => setChineseCount(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: '60px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.08)',
                fontSize: '14px',
                outline: 'none',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151'
            }}>英文题数量：</label>
            <input
              type="number"
              min="0"
              value={englishCount}
              onChange={(e) => setEnglishCount(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: '60px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.08)',
                fontSize: '14px',
                outline: 'none',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <button 
          onClick={drawQuestions} 
          disabled={loading} 
          style={{ 
            padding: '14px 32px', 
            background: '#111827', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '14px', 
            fontSize: '16px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            opacity: loading ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.background = '#000';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.background = '#111827';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? '抽题中...' : '🎲 开始随机抽题'}
        </button>
      </div>

      {/* 抽题结果展示 - 完全保留原有样式和盲听功能 */}
      {questions.length > 0 && questions.map((q, index) => (
        <div 
          key={q.id} 
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px', 
            padding: '32px', 
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.8)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            opacity: 0,
            transform: 'translateY(20px)',
            animationDelay: `${index * 0.12}s`
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ 
                  padding: '6px 14px', 
                  background: q.type === 'chinese' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                  borderRadius: '20px', 
                  fontSize: '13px',
                  fontWeight: 600,
                  color: q.type === 'chinese' ? '#1d4ed8' : '#92400e'
                }}>
                  第{index+1}题
                </span>
                <span style={{ 
                  padding: '6px 14px', 
                  background: q.type === 'english' && !showQuestion[q.id] ? 'rgba(168, 85, 247, 0.1)' : 'rgba(0,0,0,0.04)', 
                  borderRadius: '20px', 
                  fontSize: '13px',
                  fontWeight: 500,
                  color: q.type === 'english' && !showQuestion[q.id] ? '#7c3aed' : '#6b7280'
                }}>
                  {q.type === 'chinese' ? '中文题' : (showQuestion[q.id] ? '英文题' : '🔇 英文盲听模式')}
                </span>
              </div>

              {/* 盲听逻辑 */}
              {q.type === 'chinese' || showQuestion[q.id] ? (
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '18px',
                  color: '#111827',
                  lineHeight: '1.6',
                  fontWeight: 600,
                  letterSpacing: '-0.3px'
                }}>
                  {q.content}
                </h3>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '30px 20px',
                  background: 'rgba(168, 85, 247, 0.05)',
                  borderRadius: '16px',
                  border: '2px dashed rgba(168, 85, 247, 0.2)',
                  marginBottom: '16px'
                }}>
                  <p style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '15px', 
                    color: '#7c3aed',
                    fontWeight: 500
                  }}>
                    🔇 题目已隐藏，请先点击右侧「朗读」按钮盲听
                  </p>
                  <button 
                    onClick={() => setShowQuestion({...showQuestion, [q.id]: true})}
                    style={{
                      padding: '10px 24px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#6d28d9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#7c3aed';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    📝 显示题目
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => speak(q.content, q.type === 'english' ? 'en-US' : 'zh-CN')} 
              style={{ 
                padding: '10px 16px', 
                border: '1px solid rgba(0,0,0,0.08)', 
                background: 'white', 
                borderRadius: '10px', 
                cursor: 'pointer',
                fontWeight: 500,
                color: '#6b7280',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                e.target.style.color = '#374151';
                e.target.style.background = 'rgba(0,0,0,0.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                e.target.style.color = '#6b7280';
                e.target.style.background = 'white';
              }}
            >
              🔊 朗读
            </button>
          </div>

          {/* 翻译显示 */}
          {(q.type === 'chinese' || showQuestion[q.id]) && q.translation && (
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '16px',
              padding: '12px 14px',
              background: 'rgba(0,0,0,0.02)',
              borderRadius: '10px',
              fontSize: '14px',
              lineHeight: '1.6',
              borderLeft: '3px solid #3b82f6'
            }}>
              <strong style={{ color: '#374151', fontWeight: 500 }}>📝 翻译：</strong>{q.translation}
            </p>
          )}

          {/* 查看答案/作答按钮 */}
          {(q.type === 'chinese' || showQuestion[q.id]) && !showAnswer[q.id] && !results[q.id] && (
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '24px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => setShowAnswer({...showAnswer, [q.id]: true})} 
                style={{ 
                  padding: '12px 20px', 
                  border: '1px solid rgba(0,0,0,0.08)', 
                  background: 'white', 
                  cursor: 'pointer', 
                  borderRadius: '10px',
                  fontWeight: 500,
                  color: '#6b7280',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.15)';
                  e.target.style.color = '#374151';
                  e.target.style.background = 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.08)';
                  e.target.style.color = '#6b7280';
                  e.target.style.background = 'white';
                }}
              >
                📖 查看答案
              </button>
              <button 
                onClick={() => setShowAnswer({...showAnswer, [q.id]: '作答'})} 
                style={{ 
                  padding: '12px 20px', 
                  border: 'none', 
                  background: '#111827', 
                  color: '#fff', 
                  cursor: 'pointer', 
                  borderRadius: '10px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#000';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#111827';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✍️ 开始作答
              </button>
            </div>
          )}

          {/* 查看答案区域 */}
          {(q.type === 'chinese' || showQuestion[q.id]) && showAnswer[q.id] === true && (
            <div style={{ 
              marginTop: '24px', 
              padding: '24px', 
              background: 'rgba(59, 130, 246, 0.05)', 
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1e40af'
                }}>
                  📖 标准答案
                </h4>
                <button 
                  onClick={() => speak(q.standard_answer, q.type === 'english' ? 'en-US' : 'zh-CN')} 
                  style={{ 
                    padding: '8px 14px', 
                    border: '1px solid rgba(59, 130, 246, 0.2)', 
                    background: 'white', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 500,
                    color: '#1d4ed8',
                    transition: 'all 0.2s ease',
                    fontSize: '13px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                  }}
                >
                  🔊 朗读
                </button>
              </div>
              <p style={{ 
                margin: '0 0 16px 0', 
                color: '#1e3a8a',
                lineHeight: '1.7',
                fontSize: '15px'
              }}>
                {q.standard_answer}
              </p>
              {q.answer_translation && (
                <div style={{
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  borderLeft: '3px solid #3b82f6',
                  marginTop: '16px'
                }}>
                  <p style={{ 
                    margin: 0, 
                    fontWeight: 500,
                    color: '#1d4ed8',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    答案翻译：
                  </p>
                  <p style={{ 
                    margin: 0, 
                    color: '#1e3a8a',
                    lineHeight: '1.6',
                    fontSize: '14px'
                  }}>
                    {q.answer_translation}
                  </p>
                </div>
              )}
              <button 
                onClick={() => setShowAnswer({...showAnswer, [q.id]: '作答'})} 
                style={{ 
                  marginTop: '20px', 
                  padding: '12px 24px', 
                  background: '#111827', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#000';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#111827';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🚀 立即作答
              </button>
            </div>
          )}

          {/* 作答区域 */}
          {(q.type === 'chinese' || showQuestion[q.id]) && showAnswer[q.id] === '作答' && !results[q.id] && (
            <div style={{ 
              marginTop: '24px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <textarea 
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  minHeight: '160px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  background: 'rgba(255,255,255,0.9)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }} 
                value={answers[q.id] || ''} 
                onChange={e => setAnswers({...answers, [q.id]: e.target.value})} 
                placeholder="请在此输入你的答案，充分展示你的专业知识和教学能力..."
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button 
                onClick={() => submitAnswer(q)} 
                disabled={loading} 
                style={{ 
                  marginTop: '16px', 
                  padding: '12px 24px', 
                  background: '#111827', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  fontSize: '15px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: loading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = '#000';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = '#111827';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? 'AI评分中...' : '🤖 提交并AI评分'}
              </button>
            </div>
          )}

          {/* 评分结果 */}
          {(q.type === 'chinese' || showQuestion[q.id]) && results[q.id] && (
            <div style={{ 
              marginTop: '24px', 
              padding: '28px', 
              background: 'rgba(16, 185, 129, 0.08)', 
              borderRadius: '16px', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s ease',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#065f46'
                }}>
                  AI评分结果
                </h4>
              </div>
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                lineHeight: '1.8',
                color: '#065f46',
                whiteSpace: 'pre-wrap',
                fontSize: '15px'
              }}>
                {results[q.id]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 主应用 - 新增朗读设置路由
export default function App() {
  return (
    <div style={globalStyles.app}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<QuestionManager />} />
          <Route path="/exam" element={<ExamRoom />} />
          <Route path="/settings" element={<SpeechSettings />} /> {/* 新增设置页面路由 */}
        </Routes>
      </BrowserRouter>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.96);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
