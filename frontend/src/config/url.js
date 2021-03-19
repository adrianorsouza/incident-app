const url = {
  api: {
    baseURL: `http://localhost:8000`,
    incident: {
      create: `/api/incident`,
      read: (id) => (!id && `/api/incident`) || `/api/incident/${id}`,
      update: (id) => `/api/incident/${id}`,
      delete: (id) => `/api/incident/${id}`,
    },
  },
};

export default url;
