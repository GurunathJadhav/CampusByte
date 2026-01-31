import api from './api';

const facultyService = {
  getAll: async (params = {}) => {
    const response = await api.get('/faculty', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/faculty/${id}`);
    return response.data;
  },

  create: async (facultyData) => {
    const response = await api.post('/faculty', facultyData);
    return response.data;
  },

  update: async (id, facultyData) => {
    const response = await api.put(`/faculty/${id}`, facultyData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/faculty/${id}`);
    return response.data;
  },

  getByDepartment: async (departmentId) => {
    const response = await api.get(`/faculty/department/${departmentId}`);
    return response.data;
  },

  getAssignedCourses: async (facultyId) => {
    const response = await api.get(`/faculty/${facultyId}/courses`);
    return response.data;
  },

  assignCourse: async (facultyId, courseId) => {
    const response = await api.post(`/faculty/${facultyId}/courses/${courseId}`);
    return response.data;
  },

  removeCourse: async (facultyId, courseId) => {
    const response = await api.delete(`/faculty/${facultyId}/courses/${courseId}`);
    return response.data;
  },

  getSchedule: async (facultyId, params = {}) => {
    const response = await api.get(`/faculty/${facultyId}/schedule`, { params });
    return response.data;
  },
};

export default facultyService;
