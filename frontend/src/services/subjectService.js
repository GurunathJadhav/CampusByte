import api from './api';

const subjectService = {
  getAll: async (params = {}) => {
    const response = await api.get('/subjects', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
  },

  create: async (subjectData) => {
    const response = await api.post('/subjects', subjectData);
    return response.data;
  },

  update: async (id, subjectData) => {
    const response = await api.put(`/subjects/${id}`, subjectData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
  },

  getByDepartment: async (departmentId) => {
    const response = await api.get(`/subjects/department/${departmentId}`);
    return response.data;
  },

  getBySemester: async (semester) => {
    const response = await api.get(`/subjects/semester/${semester}`);
    return response.data;
  },

  getEnrolledStudents: async (subjectId) => {
    const response = await api.get(`/subjects/${subjectId}/students`);
    return response.data;
  },

  enrollStudent: async (subjectId, studentId) => {
    const response = await api.post(`/subjects/${subjectId}/students/${studentId}`);
    return response.data;
  },

  unenrollStudent: async (subjectId, studentId) => {
    const response = await api.delete(`/subjects/${subjectId}/students/${studentId}`);
    return response.data;
  },

  getSchedule: async (subjectId) => {
    const response = await api.get(`/subjects/${subjectId}/schedule`);
    return response.data;
  },
};

export default subjectService;
