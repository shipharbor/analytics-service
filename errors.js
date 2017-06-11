exports.EDBPUTFAIL = function (req, res, ctx) {
  ctx.log.error('EDBPUTFAIL')
  ctx.send(500, { message: 'Internal server error' })
}

exports.EPARSEFAIL = function (req, res, ctx) {
  ctx.log.error('EPARSEFAIL')
  ctx.send(400, { message: 'Could not parse body' })
}
