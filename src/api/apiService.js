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

export const getForgotPasswordOtp = (email) => {
  return axiosInstance.post(
    API_URL.AUTH.FORGOT_PASSWORD_OTP,
    null,
    {
      params: { email }
    }
  );
};

export const getForgotPasswordVerify = (email, otp, newPassword) => {
  return axiosInstance.post(
    API_URL.AUTH.FORGOT_PASSWORD_VERIFY,
    null,
    {
      params: {
        email,
        otp,
        newPassword

      }
    }
  );
}

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

export const getUpdateUser = (data) => {
  return axiosInstance.put(
    API_URL.USER.UPDATE_USER,
    data
  );
}

//ADMIN PANNEL


export const getAllUsers = () => {
  return axiosInstance.get(
    API_URL.USER.GET_ALL_USERS
  );
}

export const getAdminUserById = (id) => {
  return axiosInstance.get(
    API_URL.USER.GET_USER_BY_ADMIN(id)
  );
}

export const getDeleteUserByAdmin = (id) => {
  return axiosInstance.delete(
    API_URL.USER.GET_DELETEUSER_BY_ADMIN(id)
  );
}

export const getUserFilter = (username) => {
  return axiosInstance.get(
    API_URL.USER.GET_FILTER_BY_USERNAME,
    {
      params: {
        username: username
      }
    }
  )
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

//dashborad

export const getTotalNumber = () => {
  return axiosInstance.get(
    API_URL.ADMIN_DASHBORAD.GET_TOTAL_NUMBER
  );
}

// ==================== AI CHAT ====================


export const getAIChatAsk = (data) => {
  return axiosInstance.post(
    API_URL.AICHAT.GET_ASK_AI,
    data
  );
}