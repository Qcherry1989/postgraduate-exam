import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// 全局样式 - 优化移动端适配
const globalStyles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f5f7fa 0%, #eef1f5 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", sans-serif',
    margin: 0,
    padding: 0,
    color: '#1f2937',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowX: 'hidden',
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '15px'
    }
  }
};

// 导航组件 - 移动端标题简写
function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <div style={{ 
          fontSize: isMobile ? '15px' : '18px', 
          fontWeight: 600, 
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '-0.3px'
        }}>
          <span style={{ fontSize: '22px' }}>🎓</span>
          <span>
            {isMobile ? '复试系统' : '国际中文教育复试系统'}
          </span>
        </div>
        
        <div style={{ 
          position: 'static',
          display: 'flex', 
          gap: '8px',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
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

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '20px'
            }
          }}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div style={{
          display: 'none',
          '@media (max-width: 768px)': {
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }
        }}>
          <button 
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }} 
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '16px',
              textAlign: 'left',
              marginBottom: '8px'
            }}
          >
            题库管理
          </button>
          <button 
            onClick={() => { navigate('/exam'); setMobileMenuOpen(false); }} 
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/exam' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/exam' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '16px',
              textAlign: 'left',
              marginBottom: '8px'
            }}
          >
            模拟复试
          </button>
          <button 
            onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }} 
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: location.pathname === '/settings' ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              color: location.pathname === '/settings' ? '#111827' : '#6b7280',
              transition: 'all 0.2s ease',
              fontSize: '16px',
              textAlign: 'left'
            }}
          >
            朗读设置
          </button>
        </div>
      )}
    </nav>
  );
}

// 题库管理组件 - 移动端样式适配 + 分页 + 加载动画 + 勾选功能
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
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [showList, setShowList] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [exportOption, setExportOption] = useState('with-answer');

  // 分页相关
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);

  // 勾选相关
  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = localStorage.getItem('selectedQuestionIds');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedQuestionIds', JSON.stringify(selectedIds));
  }, [selectedIds]);

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (sortOrder) params.append('sort', sortOrder);
      const res = await fetch(`https://postgraduate-exam.onrender.com/api/questions?${params.toString()}`);
      const data = await res.json();
      setQuestions(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('加载失败:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [keyword, sortOrder]);

  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllCurrentPage = () => {
    const currentIds = currentQuestions.map(q => q._id);
    setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

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

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这道题吗？')) {
      try {
        await fetch(`https://postgraduate-exam.onrender.com/api/questions/${id}`, { method: 'DELETE' });
        alert('✅ 删除成功！');
        setSelectedIds(prev => prev.filter(i => i !== id));
        loadQuestions();
      } catch (err) {
        alert('❌ 删除失败');
      }
    }
  };

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
      await fetch(`https://postgraduate-exam.onrender.com/api/questions/${editingQuestion._id}`, {
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

  const exportToWord = async () => {
    try {
      const res = await fetch('https://postgraduate-exam.onrender.com/api/questions');
      const allQuestions = await res.json();

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
          docContent += `<p><strong>题型：</strong>${q.type === 'chinese' ? '中文题' : '英文题'}</p>`;
          docContent += `<p><strong>题目：</strong>${q.content}</p>`;
          
          if (q.translation) {
            docContent += `<p><strong>翻译：</strong>${q.translation}</p>`;
          }
          
          if (exportOption === 'with-answer') {
            docContent += `<p><strong>标准答案：</strong>${q.standard_answer}</p>`;
            if (q.answer_translation) {
              docContent += `<p><strong>答案翻译：</strong>${q.answer_translation}</p>`;
            }
          } else {
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

      const blob = new Blob([docContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      if (exportOption === 'with-answer') {
        link.download = '国际中文教育复试题库（含答案）.doc';
      } else {
        link.download = '国际中文教育复试题库（仅题目）.doc';
      }
      
      document.body.appendChild(link);
      link.click();
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
      padding: '20px 16px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* 添加题目卡片 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', 
        padding: '20px 16px',
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
          margin: '0 0 20px 0',
          fontSize: '18px',
          color: '#111827',
          fontWeight: 600,
          letterSpacing: '-0.3px'
        }}>
          添加新题目
        </h2>
        <form onSubmit={handleSubmit}>
          {/* 题目类型 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontWeight: 500,
              color: '#374151',
              fontSize: '14px'
            }}>题目类型</label>
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: form.type === 'chinese' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${form.type === 'chinese' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px'
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
                border: `1px solid ${form.type === 'english' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px'
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
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontWeight: 500,
              color: '#374151',
              fontSize: '14px'
            }}>答案生成方式</label>
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: '10px',
                background: answerMode === 'ai' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${answerMode === 'ai' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px'
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
                border: `1px solid ${answerMode === 'manual' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px'
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
          <div style={{ marginBottom: '20px' }}>
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
              <div style={{ marginBottom: '20px' }}>
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
                  <div style={{ marginBottom: '20px' }}>
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
                  <div style={{ marginBottom: '20px' }}>
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
              opacity: loading ? 0.6 : 1,
              width: '100%',
              justifyContent: 'center'
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

      {/* 题目列表卡片 */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', 
        padding: '20px 16px',
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
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '18px',
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
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            width: '100%',
            '@media (min-width: 768px)': {
              width: 'auto'
            }
          }}>
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
                marginRight: '8px',
                flex: '1'
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
                gap: '6px',
                flex: '1'
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
                fontSize: '14px',
                flex: '1'
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
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="🔍 输入关键词搜索题目..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                flex: '1 1 100%',
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
                whiteSpace: 'nowrap',
                flex: '1 1 100%',
                marginTop: '8px'
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
          <div>
            {/* 勾选操作栏 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '16px', 
              gap: '8px', 
              flexWrap: 'wrap' 
            }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                已选中 {selectedIds.length} 道题
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={selectAllCurrentPage} 
                  style={{ 
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    background: 'white', 
                    cursor: 'pointer', 
                    fontSize: '12px', 
                    color: '#374151' 
                  }}
                >
                  全选当前页
                </button>
                <button 
                  onClick={clearSelection} 
                  style={{ 
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    background: 'white', 
                    cursor: 'pointer', 
                    fontSize: '12px', 
                    color: '#dc2626' 
                  }}
                >
                  清空全部
                </button>
              </div>
            </div>

            {loadingQuestions ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '4px solid rgba(59, 130, 246, 0.2)',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
                <p style={{ marginTop: '16px', color: '#6b7280' }}>加载题目中...</p>
              </div>
            ) : questions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                <p style={{ margin: 0, fontSize: '15px' }}>暂无题目，请先在上方添加</p>
              </div>
            ) : (
              <>
                {currentQuestions.map((q, index) => (
                  <div 
                    key={q._id} 
                    style={{ 
                      padding: '20px 16px',
                      borderBottom: index === currentQuestions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.04)', 
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
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <div style={{ flex: '1 1 100%', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(q._id)}
                          onChange={() => toggleSelect(q._id)}
                          style={{ marginTop: '2px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
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
                            {indexOfFirst + index + 1}. {q.content}
                          </h4>
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginLeft: '0',
                        flex: '1 1 100%',
                        marginTop: '10px',
                        marginLeft: '30px'
                      }}>
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
                            transition: 'all 0.2s ease',
                            flex: '1'
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
                          onClick={() => handleDelete(q._id)} 
                          style={{ 
                            padding: '8px 14px', 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            color: '#dc2626', 
                            border: 'none', 
                            borderRadius: '8px', 
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                            flex: '1'
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
                      padding: '18px 16px',
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
                ))}

                {/* 分页控件 */}
                {totalPages > 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: currentPage === 1 ? '#f3f4f6' : 'white',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      上一页
                    </button>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      第 {currentPage} / {totalPages} 页
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: currentPage === totalPages ? '#f3f4f6' : 'white',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      下一页
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 编辑弹窗 */}
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
            padding: '20px 16px',
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
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
              animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 16px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              flexShrink: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111827' }}>编辑题目</h3>
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
              >
                ✕
              </button>
            </div>
            
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 16px',
              paddingRight: '16px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151', fontSize: '14px' }}>题目内容</label>
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
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                  value={editForm.content} 
                  onChange={e => setEditForm({...editForm, content: e.target.value})} 
                />
              </div>
              {editingQuestion?.type === 'english' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151', fontSize: '14px' }}>题目翻译</label>
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
                      resize: 'vertical',
                      background: 'rgba(255,255,255,0.9)',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }} 
                    value={editForm.translation} 
                    onChange={e => setEditForm({...editForm, translation: e.target.value})} 
                  />
                </div>
              )}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151', fontSize: '14px' }}>标准答案</label>
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
                    resize: 'vertical',
                    background: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                  value={editForm.standard_answer} 
                  onChange={e => setEditForm({...editForm, standard_answer: e.target.value})} 
                />
              </div>
              {editingQuestion?.type === 'english' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151', fontSize: '14px' }}>答案翻译</label>
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
                      resize: 'vertical',
                      background: 'rgba(255,255,255,0.9)',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }} 
                    value={editForm.answer_translation} 
                    onChange={e => setEditForm({...editForm, answer_translation: e.target.value})} 
                  />
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              flexShrink: 0,
              padding: '20px 16px',
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
                  transition: 'all 0.2s ease',
                  flex: '1'
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
                  transition: 'all 0.2s ease',
                  flex: '1'
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

// 朗读设置页面 - 修复移动端和朗读功能
function SpeechSettings() {
  const [voices, setVoices] = useState([]);
  const [selectedChineseVoice, setSelectedChineseVoice] = useState('');
  const [selectedEnglishVoice, setSelectedEnglishVoice] = useState('');
  const [speechRate, setSpeechRate] = useState(1.0);
  const [testText, setTestText] = useState({ chinese: '你好，这是中文音色测试', english: 'Hello, this is an English voice test' });
  const [voiceLoading, setVoiceLoading] = useState(true);

  useEffect(() => {
    const loadVoices = () => {
      const getVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          setVoiceLoading(false);
          
          const savedChineseVoice = localStorage.getItem('chineseVoiceName');
          const savedEnglishVoice = localStorage.getItem('englishVoiceName');
          const savedRate = localStorage.getItem('speechRate');

          if (savedChineseVoice && availableVoices.find(v => v.name === savedChineseVoice)) {
            setSelectedChineseVoice(savedChineseVoice);
          } else {
            const defaultChinese = availableVoices.find(v => v.lang.startsWith('zh')) || availableVoices[0];
            if (defaultChinese) {
              setSelectedChineseVoice(defaultChinese.name);
              localStorage.setItem('chineseVoiceName', defaultChinese.name);
            }
          }

          if (savedEnglishVoice && availableVoices.find(v => v.name === savedEnglishVoice)) {
            setSelectedEnglishVoice(savedEnglishVoice);
          } else {
            const defaultEnglish = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
            if (defaultEnglish) {
              setSelectedEnglishVoice(defaultEnglish.name);
              localStorage.setItem('englishVoiceName', defaultEnglish.name);
            }
          }

          if (savedRate) {
            setSpeechRate(parseFloat(savedRate));
          } else {
            localStorage.setItem('speechRate', '1.0');
          }
        } else {
          setTimeout(getVoices, 300);
        }
      };

      getVoices();
      speechSynthesis.onvoiceschanged = getVoices;
    };

    loadVoices();

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const handleChineseVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedChineseVoice(voiceName);
    localStorage.setItem('chineseVoiceName', voiceName);
  };

  const handleEnglishVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedEnglishVoice(voiceName);
    localStorage.setItem('englishVoiceName', voiceName);
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    setSpeechRate(rate);
    localStorage.setItem('speechRate', rate.toString());
  };

  const speakTest = (text, lang) => {
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const targetVoiceName = lang === 'zh-CN' ? selectedChineseVoice : selectedEnglishVoice;
      const targetVoice = voices.find(v => v.name === targetVoiceName) || voices[0];

      if (targetVoice) utterance.voice = targetVoice;
      utterance.lang = lang;
      utterance.rate = speechRate;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;

      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('朗读失败:', error);
      alert('朗读功能暂不可用，请检查浏览器权限或更换浏览器');
    }
  };

  const chineseVoices = voices.filter(v => v.lang.startsWith('zh'));
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px 16px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '24px',
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

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px', 
        padding: '20px 16px',
        marginBottom: '20px',
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
        {voiceLoading && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p>🔄 正在加载系统音色，请稍候...</p>
          </div>
        )}

        {!voiceLoading && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '10px'
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
                    transition: 'all 0.2s ease',
                    flex: '1 1 100%',
                    marginTop: '8px'
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
                  <option value="">暂无中文音色，使用默认音色</option>
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

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '10px'
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
                    transition: 'all 0.2s ease',
                    flex: '1 1 100%',
                    marginTop: '8px'
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
                  <option value="">暂无英文音色，使用默认音色</option>
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
          </>
        )}
      </div>

      <div style={{ 
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid rgba(59, 130, 246, 0.15)',
        borderRadius: '16px', 
        padding: '16px 16px',
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
          1. 移动端朗读功能需要先点击页面任意位置激活<br/>
          2. 部分浏览器可能需要开启麦克风/语音权限<br/>
          3. 设置会自动保存在浏览器中，刷新不会丢失
        </p>
      </div>
    </div>
  );
}

// 模拟复试组件 - 增加“仅从勾选题目中抽取”选项
function ExamRoom() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const [chineseCount, setChineseCount] = useState(2);
  const [englishCount, setEnglishCount] = useState(1);
  const [showQuestion, setShowQuestion] = useState({});
  const [useSelected, setUseSelected] = useState(false);

  const speak = (text, lang = 'zh-CN') => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      
      const savedChineseVoice = localStorage.getItem('chineseVoiceName');
      const savedEnglishVoice = localStorage.getItem('englishVoiceName');
      const savedRate = localStorage.getItem('speechRate');

      const targetVoiceName = lang === 'zh-CN' ? savedChineseVoice : savedEnglishVoice;
      const targetVoice = voices.find(v => v.name === targetVoiceName) || voices.find(v => v.lang.startsWith(lang.split('-')[0])) || voices[0];

      if (targetVoice) utterance.voice = targetVoice;
      utterance.lang = lang;
      utterance.rate = savedRate ? parseFloat(savedRate) : 1.0;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('朗读失败:', error);
      alert('朗读功能暂不可用，请先去「朗读设置」页面配置或检查浏览器权限');
    }
  };

  const drawQuestions = async () => {
    if (chineseCount <= 0 && englishCount <= 0) {
      alert('请至少设置1道题目');
      return;
    }

    setLoading(true);
    try {
      let allData;
      if (useSelected) {
        const selectedIds = JSON.parse(localStorage.getItem('selectedQuestionIds') || '[]');
        if (selectedIds.length === 0) {
          alert('没有勾选任何题目，请先在题库管理页面勾选题目！');
          setLoading(false);
          return;
        }
        const res = await fetch('https://postgraduate-exam.onrender.com/api/questions');
        const fullData = await res.json();
        allData = fullData.filter(q => selectedIds.includes(q._id));
        if (allData.length === 0) {
          alert('勾选的题目已不存在，请重新勾选！');
          setLoading(false);
          return;
        }
      } else {
        const res = await fetch('https://postgraduate-exam.onrender.com/api/questions');
        allData = await res.json();
        if (allData.length === 0) {
          alert('题库中没有题目！');
          setLoading(false);
          return;
        }
      }

      const chineseQuestions = allData.filter(q => q.type === 'chinese');
      const englishQuestions = allData.filter(q => q.type === 'english');

      if (useSelected) {
        if (chineseQuestions.length < chineseCount) {
          alert(`勾选的中文题不足，仅勾选了 ${chineseQuestions.length} 道，需要 ${chineseCount} 道。`);
          setLoading(false);
          return;
        }
        if (englishQuestions.length < englishCount) {
          alert(`勾选的英文题不足，仅勾选了 ${englishQuestions.length} 道，需要 ${englishCount} 道。`);
          setLoading(false);
          return;
        }
      }

      const randomSelect = (arr, count) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
      };

      const randomChinese = randomSelect(chineseQuestions, chineseCount);
      const randomEnglish = randomSelect(englishQuestions, englishCount);
      const finalQuestions = [...randomChinese, ...randomEnglish];
      setQuestions(finalQuestions);
      setAnswers({});
      setResults({});
      setShowAnswer({});
      setShowQuestion({});
    } catch (err) {
      alert('❌ 抽题失败');
      console.error(err);
    }
    setLoading(false);
  };

  const submitAnswer = async (q) => {
    if (!answers[q._id]) return alert('请输入答案！');
    setLoading(true);
    try {
      const res = await fetch('https://postgraduate-exam.onrender.com/api/questions/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q._id, userAnswer: answers[q._id] })
      });
      const data = await res.json();
      setResults({ ...results, [q._id]: data.result });
    } catch (err) {
      alert('❌ 评分失败');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px 16px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px', 
        padding: '30px 16px',
        textAlign: 'center', 
        marginBottom: '20px',
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
          fontSize: '24px',
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.5px'
        }}>
          🎯 模拟复试考场
        </h1>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '20px',
          fontSize: '15px',
          lineHeight: '1.6'
        }}>
          设置题目数量，点击按钮随机抽题进行模拟面试练习
        </p>

        {/* 仅从勾选题目中抽取复选框 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '20px', 
          gap: '8px' 
        }}>
          <input
            type="checkbox"
            id="useSelected"
            checked={useSelected}
            onChange={(e) => setUseSelected(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="useSelected" style={{ fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            📌 仅从勾选题目中抽取（请在题库管理页面勾选题目）
          </label>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1 1 100%',
            marginBottom: '8px'
          }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>中文题数量：</label>
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
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1 1 100%'
          }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>英文题数量：</label>
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
            opacity: loading ? 0.6 : 1,
            width: '100%'
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

      {/* 抽题结果展示 */}
      {questions.length > 0 && questions.map((q, index) => (
        <div 
          key={q._id} 
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px', 
            padding: '20px 16px',
            marginBottom: '20px',
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
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ flex: '1 1 100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
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
                  background: q.type === 'english' && !showQuestion[q._id] ? 'rgba(168, 85, 247, 0.1)' : 'rgba(0,0,0,0.04)', 
                  borderRadius: '20px', 
                  fontSize: '13px',
                  fontWeight: 500,
                  color: q.type === 'english' && !showQuestion[q._id] ? '#7c3aed' : '#6b7280'
                }}>
                  {q.type === 'chinese' ? '中文题' : (showQuestion[q._id] ? '英文题' : '🔇 英文盲听模式')}
                </span>
              </div>

              {q.type === 'chinese' || showQuestion[q._id] ? (
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '16px',
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
                  padding: '20px 16px',
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
                    onClick={() => setShowQuestion({...showQuestion, [q._id]: true})}
                    style={{
                      padding: '10px 24px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      width: '100%'
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
                fontSize: '14px',
                flex: '1 1 100%',
                justifyContent: 'center',
                marginTop: '10px'
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

          {(q.type === 'chinese' || showQuestion[q._id]) && q.translation && (
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

          {(q.type === 'chinese' || showQuestion[q._id]) && !showAnswer[q._id] && !results[q._id] && (
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => setShowAnswer({...showAnswer, [q._id]: true})} 
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
                  fontSize: '14px',
                  flex: '1 1 calc(50% - 5px)'
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
                onClick={() => setShowAnswer({...showAnswer, [q._id]: '作答'})} 
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
                  fontSize: '14px',
                  flex: '1 1 calc(50% - 5px)'
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

          {(q.type === 'chinese' || showQuestion[q._id]) && showAnswer[q._id] === true && (
            <div style={{ 
              marginTop: '20px', 
              padding: '20px 16px',
              background: 'rgba(59, 130, 246, 0.05)', 
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '10px'
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
                    fontSize: '13px',
                    flex: '1 1 100%',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                  }}
                >
                  🔊 朗读答案
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
                  padding: '16px 14px',
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
                onClick={() => setShowAnswer({...showAnswer, [q._id]: '作答'})} 
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
                  fontSize: '14px',
                  width: '100%',
                  justifyContent: 'center'
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

          {(q.type === 'chinese' || showQuestion[q._id]) && showAnswer[q._id] === '作答' && !results[q._id] && (
            <div style={{ 
              marginTop: '20px',
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
                value={answers[q._id] || ''} 
                onChange={e => setAnswers({...answers, [q._id]: e.target.value})} 
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
                  opacity: loading ? 0.6 : 1,
                  width: '100%',
                  justifyContent: 'center'
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

          {(q.type === 'chinese' || showQuestion[q._id]) && results[q._id] && (
            <div style={{ 
              marginTop: '20px', 
              padding: '20px 16px',
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
                padding: '20px 16px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                lineHeight: '1.8',
                color: '#065f46',
                whiteSpace: 'pre-wrap',
                fontSize: '15px'
              }}>
                {results[q._id]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 主应用
export default function App() {
  return (
    <div style={globalStyles.app}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<QuestionManager />} />
          <Route path="/exam" element={<ExamRoom />} />
          <Route path="/settings" element={<SpeechSettings />} />
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          * {
            box-sizing: border-box;
          }
          
          body {
            font-size: 16px !important;
            line-height: 1.5;
          }
          
          html, body {
            overflow-x: hidden;
            width: 100%;
          }
          
          button, input, select, textarea {
            font-size: 14px !important;
          }
          
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}