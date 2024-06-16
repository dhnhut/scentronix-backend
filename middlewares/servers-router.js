const serverResolver = require('../libs/server-resolver')

const serversRouter = function (req, res, next) {
  const server = serverResolver();
  console.log(server)
  next()
}

module.exports = serversRouter;