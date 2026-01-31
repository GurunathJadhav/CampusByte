import api from './api';

const attendanceService = {
  getAll: async (params = {}) => {
    const response = await api.get('/attendance', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  },

  markAttendance: async (attendanceData) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  },

  markBulkAttendance: async (attendanceRecords) => {
    const response = await api.post('/attendance/bulk', { records: attendanceRecords });
    return response.data;
  },

  update: async (id, attendanceData) => {
    const response = await api.put(`/attendance/${id}`, attendanceData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  },

  getByStudent: async (studentId, params = {}) => {
    const response = await api.get(`/attendance/student/${studentId}`, { params });
    return response.data;
  },

  getBySubject: async (subjectId, params = {}) => {
    const response = await api.get(`/attendance/subject/${subjectId}`, { params });
    return response.data;
  },

  getByDateRange: async (startDate, endDate, params = {}) => {
    const response = await api.get('/attendance/range', {
      params: { startDate, endDate, ...params },
    });
    return response.data;
  },

  getStats: async (params = {}) => {
    const response = await api.get('/attendance/stats', { params });
    return response.data;
  },

  getLowAttendanceStudents: async (threshold = 75) => {
    const response = await api.get('/attendance/low-attendance', {
      params: { threshold },
    });
    return response.data;
  },

  exportReport: async (params = {}) => {
    const response = await api.get('/attendance/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default attendanceService;
