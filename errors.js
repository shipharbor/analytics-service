exports.EDBQUERYFAIL = function (req, res, ctx) {
  ctx.log.error('EDBQUERYFAIL')
  ctx.send(500, { message: 'Internal server error' })
}

exports.EDBQUERYNOTFOUND = function (req, res, ctx) {
  ctx.log.warn('EDBQUERYNOTFOUND', ctx.params.params.query) // TODO: merry bugg
  ctx.send(401, { message: 'Did not find a value for the query' })
}

exports.EDBPUTFAIL = function (req, res, ctx) {
  ctx.log.error('EDBPUTFAIL')
  ctx.send(500, { message: 'Internal server error' })
}
