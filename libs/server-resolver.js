const serversStatus = function () {
  const servers = [
    {
      url: 'https://does-not-work.perfume.new',
      priority: 1,
      available: true
    },
    {
      url: 'https://gitlab.com',
      priority: 4,
      available: true
    },
    {
      url: 'http://app.scnt.me',
      priority: 3,
      available: true
    },
    {
      url: 'https://offline.scentronix.com',
      priority: 2,
      available: true
    },
  ];
  return servers;
};

const findServer = function() {
  return serversStatus()[0]
}

const serverResolver = function() {
  return findServer()
}

module.exports = serverResolver