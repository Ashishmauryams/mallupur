const API_URL = {
  AUTH: {
    LOGIN: "/v1/admin/login",
    REGISTER: "/v1/admin/create",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD_OTP: "/v1/verification/send-otp",
    FORGOT_PASSWORD_VERIFY: "/v1/verification/forget-pass"
  },
  COMPLAINT: {
    REGISTER: "/v2/problems/create",
    DETAILS: "/v2/problems/my",
    DETAILS_BY_ID: (id) => `/v2/problems/${id}`
  },

  USER: {
    GET_USER: "/v1/users/find",

    GET_ALL_USERS: "/v1/admin/find-all",
    GET_USER_BY_ADMIN: (id) => `/v1/admin/get-id/${id}`,
    GET_DELETEUSER_BY_ADMIN: (id) => `/v1/admin/delete/${id}`,
    GET_FILTER_BY_USERNAME: "/v1/admin/by-username",


    GET_BY_ID: (id) => `/users/${id}`,
    DELETE_ONE: "/v1/users/delete",
    UPDATE_USER: "/v1/users/update"
  },
  PROJECT: {
    CREATE_PROJECT: "/v2/village/create",
    GET_ALL_PROJECT: "/v2/village/find",
    GET_DETAILS_BY_ID: (id) => `/v2/village/byid/${id}`,
    GET_UPDATE_PROJECT: (id) => `/v2/village/update/byid/${id}`,
    GET_DELETE_PROJECT: (id) => `/v2/village/delete/byid/${id}`
  },
  ADMIN_DASHBORAD: {
    GET_TOTAL_NUMBER: "/v1/dashboard/count"
  },
  AICHAT: {
    GET_ASK_AI: "/ai/ask"
  }

};

export default API_URL;