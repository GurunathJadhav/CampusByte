import api from './api';

const studentService = {
  getAll: async (params = {}) => {
    const response = await api.get('/students', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  create: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  update: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },

  getByDepartment: async (departmentId) => {
    const response = await api.get(`/students/department/${departmentId}`);
    return response.data;
  },

  getAttendance: async (studentId, params = {}) => {
    const response = await api.get(`/students/${studentId}/attendance`, { params });
    return response.data;
  },

  getGrades: async (studentId) => {
    const response = await api.get(`/students/${studentId}/grades`);
    return response.data;
  },

  bulkImport: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/students/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  exportToExcel: async (params = {}) => {
    const response = await api.get('/students/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default studentService;
