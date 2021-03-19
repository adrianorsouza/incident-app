const app = {
  name: process.env.REACT_APP_NAME || `Incident App`,
  env: process.env.NODE_ENV,
  version: process.env.REACT_APP_VERSION,
  consoleLogRequests: false,
  timeout: process.env.REACT_APP_REQUEST_TIMEOUT || 30000,
};

export default app;
