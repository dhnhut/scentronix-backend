import { ServerEndPoint } from '../definitions/server-endpoint';

const ServerEndPoints = (): ServerEndPoint[] => {
  const servers: ServerEndPoint[] = [
    new ServerEndPoint('https://does-not-work.perfume.new', 1),
    new ServerEndPoint('https://gitlab.com', 4),
    new ServerEndPoint('http://app.scnt.me', 3),
    new ServerEndPoint('https://offline.scentronix.com', 2),
  ];
  return servers;
};

export = ServerEndPoints;
