import { ServerEndPoint } from '../definitions/server-endpoint';

function serversStatus(): ServerEndPoint[] {
  const servers : ServerEndPoint[]  =[
    new ServerEndPoint('https://does-not-work.perfume.new', 1),
    new ServerEndPoint('http://app.scnt.me', 2),
    new ServerEndPoint('http://app.scnt.me', 3),
    new ServerEndPoint('https://offline.scentronix.com', 4),
  ];
  return servers;
}

const findServer = function () {
  return serversStatus()[0];
};

const serverResolver = function () {
  return findServer();
};

export = serverResolver;
