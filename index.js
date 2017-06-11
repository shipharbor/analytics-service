var toObject = require('json-stream-to-object')
var hyperdiscovery = require('hyperdiscovery')
var raf = require('random-access-file')
var hypercore = require('hypercore')
var hyperdb = require('hyperdb')
var merry = require('merry')

var errors = require('./errors')

var env = {
  PORT: Number,
  DB: '/tmp/analytics.db'
}
var app = merry({ env: env })

var core = hypercore(storage, { valueEncoding: 'json', sparse: true })
var db = hyperdb([ core ])

app.route('GET', '/ping', function (req, res, ctx) {
  ctx.send(200, { status: 'ok' })
})

app.route('PUT', '/log', function (req, res, ctx) {
  toObject(req, function (err, obj) {
    if (err) return errors.EPARSEFAIL(req, res, ctx)

    db.put(obj, 'true', function (err) {
      if (err) return errors.EDBPUTFAIL(req, res, ctx)
      ctx.send(200, {})
    })
  })
})

// start
db.ready(function () {
  hyperdiscovery(db.feeds[0], { live: true })
  app.listen(app.env.PORT)
})

function storage (name) {
  return raf(app.env.DB + name)
}
