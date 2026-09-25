const API_URL = {
  AUTH: {
    LOGIN: "/v1/admin/login",
    REGISTER: "/v1/admin/create",
    LOGOUT: "/auth/logout",
  },
  COMPLAINT: {
    REGISTER: "/v2/problems/create",
    DETAILS: "/v2/problems/my",
    DETAILS_BY_ID: (id) => `/v2/problems/${id}`
  },

  USER: {
    GET_USER: "/users/find",
    GET_ALL: "/users",
    GET_BY_ID: (id) => `/users/${id}`,
    DELETE_ONE: "/users/delete",
  },

};

export default API_URL;