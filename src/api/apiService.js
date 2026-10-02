import axiosInstance from "./axiosInstance";
import API_URL from "./url.js";

// ==================== AUTH ====================

export const loginUser = (data) => {
  return axiosInstance.post(
    API_URL.AUTH.LOGIN,
    data
  );
};

export const registerUser = (data) => {
  return axiosInstance.post(
    API_URL.AUTH.REGISTER,
    data
  );
};

export const logoutUser = () => {
  return axiosInstance.post(
    API_URL.AUTH.LOGOUT
  );
};

// --------COMPLAINT------>

export const registerComplaint = (data) => {
  return axiosInstance.post(
    API_URL.COMPLAINT.REGISTER,
    data
  );
};

export const getComplaintDetails = () => {
  return axiosInstance.get(
    API_URL.COMPLAINT.DETAILS
  );
}

export const getComplaintById = (id) => {
  return axiosInstance.get(
    API_URL.COMPLAINT.DETAILS_BY_ID(id)
  );
}

// ==================== USER ====================

export const getUserProfile = () => {
  return axiosInstance.get(
    API_URL.USER.GET_USER
  );
};

export const getUserById = (id) => {
  return axiosInstance.get(
    API_URL.USER.GET_BY_ID(id)
  );
};


export const getDeleteOne = () => {
  return axiosInstance.delete(API_URL.USER.DELETE_ONE);
}

// ==================== project ====================

export const getCreateProject = (data) => {
  return axiosInstance.post(
    API_URL.PROJECT.CREATE_PROJECT,
    data
  );
};

export const getAllProjects = () => {
  return axiosInstance.get(
    API_URL.PROJECT.GET_ALL_PROJECT,
  );
};

export const getProjectDetailById = (id) => {
  return axiosInstance.get(
    API_URL.PROJECT.GET_DETAILS_BY_ID(id)
  );
};

export const getUpdateProject = (id, data) => {
  return axiosInstance.put(
    API_URL.PROJECT.GET_UPDATE_PROJECT(id),
    data
  );
};

export const getDeleteProject = (id) => {
  return axiosInstance.delete(
    API_URL.PROJECT.GET_DELETE_PROJECT(id)
  );
};