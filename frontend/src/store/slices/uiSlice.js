import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCollapsed: false,
  darkMode: localStorage.getItem('darkMode') === 'true',
  toasts: [],
  loading: {
    global: false,
    components: {},
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload.toString());
      if (action.payload) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    addToast: (state, action) => {
      const toast = {
        id: Date.now().toString(),
        type: 'info',
        duration: 5000,
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.components[component] = loading;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleDarkMode,
  setDarkMode,
  addToast,
  removeToast,
  clearToasts,
  setGlobalLoading,
  setComponentLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
