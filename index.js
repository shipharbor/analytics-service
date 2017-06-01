var hyperdiscovery = require('hyperdiscovery')
var raf = require('random-access-file')
var hypercore = require('hypercore')
var hyperdb = require('hyperdb')
var merry = require('merry')

var errors = require('./errors')

var env = { PORT: Number, DB: '/tmp/analytics.db' }
var app = merry({ env: env })

var core = hypercore(storage, { valueEncoding: 'json', sparse: true })
var db = hyperdb([ core ])

app.route('GET', '/:query', function (req, res, ctx) {
  var val = ctx.params.params.query
  db.get(val, function (err, nodes) {
    if (err) return errors.EDBQUERYFAIL(req, res, ctx)
    if (nodes && nodes[0] && nodes[0].value) ctx.send(200, nodes[0].value)
    else errors.EDBQUERYNOTFOUND(req, res, ctx)
  })
})

app.route('PUT', '/:query', function (req, res, ctx) {
  var val = ctx.params.params.query
  db.put(val, 'true', function (err) {
    if (err) return errors.EDBPUTFAIL(req, res, ctx)
    ctx.send(200, {})
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
