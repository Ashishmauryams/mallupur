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
  PROJECT: {
    CREATE_PROJECT: "/v2/village/create",
    GET_ALL_PROJECT: "/v2/village",
    GET_DETAILS_BY_ID: (id) => `/v2/village/byid/${id}`,
    GET_UPDATE_PROJECT: (id) => `/v2/village/update/byid/${id}`,
    GET_DELETE_PROJECT: (id) => `/v2/village/delete/byid/${id}`
  }
};

export default API_URL;