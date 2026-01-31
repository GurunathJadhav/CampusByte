import api from './api';

const reportService = {
  getAttendanceReport: async (params = {}) => {
    const response = await api.get('/reports/attendance', { params });
    return response.data;
  },

  getStudentReport: async (studentId, params = {}) => {
    const response = await api.get(`/reports/student/${studentId}`, { params });
    return response.data;
  },

  getFacultyReport: async (facultyId, params = {}) => {
    const response = await api.get(`/reports/faculty/${facultyId}`, { params });
    return response.data;
  },

  getDepartmentReport: async (departmentId, params = {}) => {
    const response = await api.get(`/reports/department/${departmentId}`, { params });
    return response.data;
  },

  getDashboardStats: async (role = 'ADMIN') => {
    const response = await api.get('/reports/dashboard', { params: { role } });
    return response.data;
  },

  getEnrollmentStats: async (params = {}) => {
    const response = await api.get('/reports/enrollment', { params });
    return response.data;
  },

  getPerformanceAnalytics: async (params = {}) => {
    const response = await api.get('/reports/performance', { params });
    return response.data;
  },

  exportPDF: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/pdf`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },

  exportExcel: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/excel`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default reportService;
