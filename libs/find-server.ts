import ServerEndPoints from './server-endpoints';

const getAvailableServers = async () => {
  const endpoints = ServerEndPoints();
  const _res = await Promise.all(
    endpoints.map((s) => s.checkServerAvailability())
  );
  return endpoints
    .sort((a, b) => a.Priority - b.Priority)
    .find((endpoint) => endpoint.Available);
};

const findServer = () => {
  return new Promise((resolve, reject) => {
    getAvailableServers().then((availableServers) => {
      if (availableServers) {
        resolve(availableServers);
      }
      reject('No any available server');
    });
  });
};

export = findServer;
