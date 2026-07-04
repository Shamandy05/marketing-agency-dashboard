import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MediaAgencyDashboard = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [filterPlatform, setFilterPlatform] = useState('all');

  // ==================== USERS & PERMISSIONS ====================
  const users = {
    'admin@mediaagency.com': { password: 'admin123', role: 'admin', name: 'Admin User', permissions: ['view', 'edit', 'delete', 'manage_users', 'manage_clients'] },
    'manager@mediaagency.com': { password: 'manager123', role: 'manager', name: 'Campaign Manager', permissions: ['view', 'edit', 'manage_clients'] },
    'client@example.com': { password: 'client123', role: 'client', name: 'Client Account', permissions: ['view'] }
  };

  // ==================== MOCK DATA ====================
  const campaigns = [
    { id: 1, name: 'Summer Sale 2024', platform: 'facebook', budget: 50000, spent: 38500, impressions: 2500000, clicks: 125000, conversions: 3250, roi: 245, status: 'active', startDate: '2024-06-01', endDate: '2024-08-31' },
    { id: 2, name: 'Product Launch', platform: 'google', budget: 75000, spent: 62300, impressions: 3800000, clicks: 198000, conversions: 5400, roi: 320, status: 'active', startDate: '2024-07-15', endDate: '2024-09-15' },
    { id: 3, name: 'Brand Awareness', platform: 'instagram', budget: 35000, spent: 25600, impressions: 1900000, clicks: 76000, conversions: 1850, roi: 185, status: 'active', startDate: '2024-08-01', endDate: '2024-10-31' },
    { id: 4, name: 'Holiday Campaign', platform: 'tiktok', budget: 45000, spent: 18900, impressions: 4200000, clicks: 156000, conversions: 2100, roi: 295, status: 'planning', startDate: '2024-11-01', endDate: '2024-12-31' },
    { id: 5, name: 'LinkedIn B2B', platform: 'linkedin', budget: 60000, spent: 52400, impressions: 820000, clicks: 28000, conversions: 890, roi: 210, status: 'active', startDate: '2024-07-01', endDate: '2024-10-01' }
  ];

  const dailyData = [
    { date: 'يوم 1', impressions: 180000, clicks: 8900, conversions: 234, spend: 2100 },
    { date: 'يوم 2', impressions: 220000, clicks: 10400, conversions: 312, spend: 2400 },
    { date: 'يوم 3', impressions: 195000, clicks: 9200, conversions: 278, spend: 2200 },
    { date: 'يوم 4', impressions: 240000, clicks: 11800, conversions: 356, spend: 2800 },
    { date: 'يوم 5', impressions: 210000, clicks: 10100, conversions: 301, spend: 2500 },
    { date: 'يوم 6', impressions: 260000, clicks: 12400, conversions: 389, spend: 2950 },
    { date: 'يوم 7', impressions: 280000, clicks: 13200, conversions: 412, spend: 3100 }
  ];

  const platformData = [
    { name: 'Facebook', value: 35, spend: 45000 },
    { name: 'Google', value: 28, spend: 52400 },
    { name: 'Instagram', value: 18, spend: 21200 },
    { name: 'TikTok', value: 12, spend: 14100 },
    { name: 'LinkedIn', value: 7, spend: 8200 }
  ];

  const clients = [
    { id: 1, name: 'شركة الإلكترونيات', email: 'contact@electronics.sa', campaigns: 2, totalSpent: 95000, status: 'active' },
    { id: 2, name: 'متجر الملابس', email: 'info@fashion.sa', campaigns: 1, totalSpent: 38500, status: 'active' },
    { id: 3, name: 'وكالة السفر', email: 'hello@travel.sa', campaigns: 2, totalSpent: 75000, status: 'inactive' }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // ==================== LOGIN ====================
  const handleLogin = () => {
    const userData = users[email];
    if (userData && userData.password === password) {
      setUser({ email, ...userData });
      setCurrentPage('dashboard');
      setEmail('');
      setPassword('');
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSelectedCampaign(null);
  };

  // ==================== PERMISSIONS CHECK ====================
  const hasPermission = (permission) => user && user.permissions.includes(permission);

  // ==================== LOGIN PAGE ====================
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>📊 Media Agency Dashboard</h1>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '16px' }}
            onMouseOver={(e) => e.target.style.background = '#5568d3'}
            onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            دخول
          </button>
          <div style={{ marginTop: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px', fontSize: '13px' }}>
            <p style={{ margin: '0 0 8px', fontWeight: '600' }}>حسابات تجريبية:</p>
            <p style={{ margin: '4px 0' }}>👤 admin@mediaagency.com / admin123</p>
            <p style={{ margin: '4px 0' }}>👤 manager@mediaagency.com / manager123</p>
            <p style={{ margin: '4px 0' }}>👤 client@example.com / client123</p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== DASHBOARD PAGE ====================
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* HEADER */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>📊 Media Agency Dashboard</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '14px' }}>مرحباً {user.name} • {user.role === 'admin' ? '👑 مدير' : user.role === 'manager' ? '👔 مدير حملات' : '🔹 عميل'}</p>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          خروج
        </button>
      </header>

      {/* NAVIGATION */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 30px', display: 'flex', gap: '30px' }}>
        <button
          onClick={() => { setCurrentPage('dashboard'); setSelectedCampaign(null); }}
          style={{
            padding: '16px 0',
            border: currentPage === 'dashboard' ? '3px solid #667eea' : 'none',
            borderBottom: currentPage === 'dashboard' ? '3px solid #667eea' : 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontWeight: currentPage === 'dashboard' ? '600' : '500',
            color: currentPage === 'dashboard' ? '#667eea' : '#6b7280'
          }}
        >
          📈 اللوحة الرئيسية
        </button>
        <button
          onClick={() => setCurrentPage('campaigns')}
          style={{
            padding: '16px 0',
            border: 'none',
            borderBottom: currentPage === 'campaigns' ? '3px solid #667eea' : 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontWeight: currentPage === 'campaigns' ? '600' : '500',
            color: currentPage === 'campaigns' ? '#667eea' : '#6b7280'
          }}
        >
          🎯 الحملات ({campaigns.length})
        </button>
        {hasPermission('manage_clients') && (
          <button
            onClick={() => setCurrentPage('clients')}
            style={{
              padding: '16px 0',
              border: 'none',
              borderBottom: currentPage === 'clients' ? '3px solid #667eea' : 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: currentPage === 'clients' ? '600' : '500',
              color: currentPage === 'clients' ? '#667eea' : '#6b7280'
            }}
          >
            👥 العملاء
          </button>
        )}
        {user.role === 'admin' && (
          <button
            onClick={() => setCurrentPage('settings')}
            style={{
              padding: '16px 0',
              border: 'none',
              borderBottom: currentPage === 'settings' ? '3px solid #667eea' : 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: currentPage === 'settings' ? '600' : '500',
              color: currentPage === 'settings' ? '#667eea' : '#6b7280'
            }}
          >
            ⚙️ الإعدادات
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: '30px' }}>
        {/* DASHBOARD */}
        {currentPage === 'dashboard' && !selectedCampaign && (
          <div>
            {/* KPI CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>💰 إجمالي الإنفاق</p>
                <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>268,700 ر.س</h3>
                <p style={{ margin: '8px 0 0', color: '#10b981', fontSize: '13px' }}>↑ 12% هذا الشهر</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>📊 إجمالي الانطباعات</p>
                <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>14.2M</h3>
                <p style={{ margin: '8px 0 0', color: '#10b981', fontSize: '13px' }}>↑ 8% عن الأسبوع الماضي</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>🔗 إجمالي النقرات</p>
                <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>583.2K</h3>
                <p style={{ margin: '8px 0 0', color: '#10b981', fontSize: '13px' }}>↑ 15% عن الشهر الماضي</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>✅ إجمالي التحويلات</p>
                <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>13.9K</h3>
                <p style={{ margin: '8px 0 0', color: '#10b981', fontSize: '13px' }}>ROI 255%</p>
              </div>
            </div>

            {/* CHARTS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {/* DAILY PERFORMANCE */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>الأداء اليومي</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="impressions" stroke="#667eea" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* PLATFORM DISTRIBUTION */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>توزيع المنصات</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={platformData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TOP CAMPAIGNS */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>أفضل الحملات أداءً</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280', fontWeight: '600' }}>الحملة</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>المنصة</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>الإنفاق</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>ROI</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.slice(0, 5).map((campaign) => (
                      <tr key={campaign.id} style={{ borderBottom: '1px solid #f3f4f6', hover: { background: '#f9fafb' } }}>
                        <td style={{ padding: '12px', color: '#1f2937', fontWeight: '500' }}>{campaign.name}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{campaign.platform === 'facebook' ? '📘' : campaign.platform === 'google' ? '🔍' : campaign.platform === 'instagram' ? '📷' : campaign.platform === 'tiktok' ? '🎵' : '💼'}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#667eea', fontWeight: '600' }}>{(campaign.spent / 1000).toFixed(1)}K ر.س</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>{campaign.roi}%</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{ padding: '4px 12px', background: campaign.status === 'active' ? '#dcfce7' : '#fef3c7', color: campaign.status === 'active' ? '#166534' : '#92400e', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                            {campaign.status === 'active' ? '🟢 نشط' : '🟡 قيد التخطيط'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CAMPAIGNS PAGE */}
        {currentPage === 'campaigns' && !selectedCampaign && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: '0', fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>إدارة الحملات</h2>
              {hasPermission('edit') && (
                <button style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                  ➕ حملة جديدة
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {['all', 'facebook', 'google', 'instagram', 'tiktok', 'linkedin'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setFilterPlatform(platform)}
                  style={{
                    padding: '8px 16px',
                    background: filterPlatform === platform ? '#667eea' : '#e5e7eb',
                    color: filterPlatform === platform ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px'
                  }}
                >
                  {platform === 'all' ? 'الكل' : platform === 'facebook' ? '📘 Facebook' : platform === 'google' ? '🔍 Google' : platform === 'instagram' ? '📷 Instagram' : platform === 'tiktok' ? '🎵 TikTok' : '💼 LinkedIn'}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {campaigns.filter((c) => filterPlatform === 'all' || c.platform === filterPlatform).map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    hover: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>{campaign.name}</h3>
                    <span style={{ padding: '4px 12px', background: campaign.status === 'active' ? '#dcfce7' : '#fef3c7', color: campaign.status === 'active' ? '#166534' : '#92400e', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                      {campaign.status === 'active' ? 'نشط' : 'قيد التخطيط'}
                    </span>
                  </div>
                  <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '13px' }}>المنصة: {campaign.platform}</p>
                    <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '13px' }}>الميزانية: {(campaign.budget / 1000).toFixed(0)}K ر.س</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>الإنطباعات</p>
                      <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{(campaign.impressions / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>ROI</p>
                      <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#10b981' }}>{campaign.roi}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAMPAIGN DETAILS */}
        {selectedCampaign && (
          <div>
            <button onClick={() => setSelectedCampaign(null)} style={{ marginBottom: '20px', padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              ← العودة
            </button>
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{selectedCampaign.name}</h2>
                  <p style={{ margin: '0', color: '#6b7280' }}>المنصة: {selectedCampaign.platform} | الحالة: {selectedCampaign.status === 'active' ? '🟢 نشط' : '🟡 قيد التخطيط'}</p>
                </div>
                {hasPermission('edit') && (
                  <button style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    ✏️ تعديل
                  </button>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>الميزانية الإجمالية</p>
                  <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>{(selectedCampaign.budget / 1000).toFixed(0)}K ر.س</h3>
                </div>
                <div>
                  <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>المبلغ المستخدم</p>
                  <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>{(selectedCampaign.spent / 1000).toFixed(1)}K ر.س</h3>
                  <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>({((selectedCampaign.spent / selectedCampaign.budget) * 100).toFixed(1)}%)</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>ROI</p>
                  <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#10b981' }}>{selectedCampaign.roi}%</h3>
                </div>
              </div>

              {/* PERFORMANCE METRICS */}
              <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>مؤشرات الأداء</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>الانطباعات</p>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{(selectedCampaign.impressions / 1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>النقرات</p>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{(selectedCampaign.clicks / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>التحويلات</p>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{selectedCampaign.conversions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '12px' }}>CTR</p>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{((selectedCampaign.clicks / selectedCampaign.impressions) * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* CONNECTED PLATFORMS */}
              <div style={{ background: '#e0e7ff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #c7d2fe' }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>🔗 المنصات المتصلة</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'white', padding: '12px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <span style={{ fontSize: '16px' }}>📘</span> Facebook متصل ✓
                  </div>
                  <div style={{ background: 'white', padding: '12px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <span style={{ fontSize: '16px' }}>🔍</span> Google متصل ✓
                  </div>
                </div>
              </div>

              {/* TIMELINE */}
              <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>📅 الجدول الزمني</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '13px' }}>تاريخ البدء</p>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedCampaign.startDate}</p>
                  </div>
                  <div style={{ flex: 1, height: '2px', background: '#e5e7eb', margin: '0 20px' }}></div>
                  <div>
                    <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '13px' }}>تاريخ الانتهاء</p>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{selectedCampaign.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLIENTS PAGE */}
        {currentPage === 'clients' && (
          <div>
            <h2 style={{ margin: '0 0 20px', fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>إدارة العملاء</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
              {clients.map((client) => (
                <div key={client.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>{client.name}</h3>
                    <span style={{ padding: '4px 12px', background: client.status === 'active' ? '#dcfce7' : '#fee2e2', color: client.status === 'active' ? '#166534' : '#991b1b', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                      {client.status === 'active' ? '✓ نشط' : 'غير نشط'}
                    </span>
                  </div>
                  <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '13px' }}>📧 {client.email}</p>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '6px', margin: '12px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6b7280', fontSize: '12px' }}>عدد الحملات</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{client.campaigns}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280', fontSize: '12px' }}>إجمالي الإنفاق</span>
                      <span style={{ fontWeight: '600', color: '#667eea' }}>{(client.totalSpent / 1000).toFixed(0)}K ر.س</span>
                    </div>
                  </div>
                  {hasPermission('manage_clients') && (
                    <button style={{ width: '100%', padding: '10px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', color: '#374151' }}>
                      📊 عرض التقارير
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS PAGE */}
        {currentPage === 'settings' && (
          <div>
            <h2 style={{ margin: '0 0 20px', fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>الإعدادات والصلاحيات</h2>
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '800px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>👥 إدارة المستخدمين والصلاحيات</h3>
              <div style={{ marginBottom: '30px' }}>
                {Object.entries(users).map(([email, userData]) => (
                  <div key={email} style={{ padding: '16px', background: '#f9fafb', borderRadius: '6px', marginBottom: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#1f2937' }}>{userData.name}</p>
                        <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '13px' }}>{email}</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {userData.permissions.map((perm) => (
                            <span key={perm} style={{ padding: '4px 8px', background: '#dbeafe', color: '#1e40af', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                              {perm === 'view' ? '👁️ عرض' : perm === 'edit' ? '✏️ تعديل' : perm === 'delete' ? '🗑️ حذف' : perm === 'manage_users' ? '👥 إدارة' : '🤝 عملاء'}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span style={{ padding: '6px 12px', background: userData.role === 'admin' ? '#fed7aa' : userData.role === 'manager' ? '#bfdbfe' : '#dbeafe', color: userData.role === 'admin' ? '#92400e' : userData.role === 'manager' ? '#1e40af' : '#1e40af', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                        {userData.role === 'admin' ? '👑 مدير' : userData.role === 'manager' ? '👔 مدير' : '🔹 عميل'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>🔗 المنصات المتصلة</h3>
              <div>
                {['📘 Facebook Ads', '🔍 Google Ads', '📷 Instagram Business', '🎵 TikTok Ads', '💼 LinkedIn Ads'].map((platform, idx) => (
                  <div key={idx} style={{ padding: '12px', background: '#f9fafb', borderRadius: '6px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#1f2937', fontWeight: '500' }}>{platform}</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>✓ متصل</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaAgencyDashboard;
