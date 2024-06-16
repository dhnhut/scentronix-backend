import { ServerEndPoint } from '../definitions/server-endpoint';

function ServersEndPoint(): ServerEndPoint[] {
  const servers: ServerEndPoint[] = [
    new ServerEndPoint('https://does-not-work.perfume.new', 1),
    new ServerEndPoint('https://gitlab.com', 4),
    new ServerEndPoint('http://app.scnt.me', 3),
    new ServerEndPoint('https://offline.scentronix.com', 2),
  ];
  return servers;
}

const getAvailableServers = async () => {
  const endpoints = ServersEndPoint();
  const _res = await Promise.all(
    endpoints.map((s) => s.checkServerAvailability())
  );
  let availableEndpoints = endpoints
    .filter((endpoint) => endpoint.Available)
    .sort((endpoint) => -endpoint.Priority);
  return availableEndpoints;
};

const findServer = () => {
  return new Promise((resolve, reject) => {
    getAvailableServers().then((availableServers) => {
      if (availableServers.length === 0) {
        reject();
      }
      resolve(availableServers[0]);
    });
  });
};

export = findServer;
