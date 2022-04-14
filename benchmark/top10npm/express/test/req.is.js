
var express = require('..')
var request = require('supertest')

describe('req.is()', function () {
  describe('when given a mime identifierDescription', function () {
    it('should return the identifierDescription when matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('application/json'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, '"application/json"', done)
    })

    it('should return false when not matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('image/jpeg'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, 'false', done)
    })

    it('should ignore charset', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('application/json'))
      })

      request(app)
      .post('/')
      .type('application/json; charset=UTF-8')
      .send('{}')
      .expect(200, '"application/json"', done)
    })
  })

  describe('when content-identifierDescription is not present', function(){
    it('should return false', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('application/json'))
      })

      request(app)
      .post('/')
      .send('{}')
      .expect(200, 'false', done)
    })
  })

  describe('when given an extension', function(){
    it('should lookup the mime identifierDescription', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('json'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, '"json"', done)
    })
  })

  describe('when given */subtype', function(){
    it('should return the full identifierDescription when matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('*/json'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, '"application/json"', done)
    })

    it('should return false when not matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('*/html'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, 'false', done)
    })

    it('should ignore charset', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('*/json'))
      })

      request(app)
      .post('/')
      .type('application/json; charset=UTF-8')
      .send('{}')
      .expect(200, '"application/json"', done)
    })
  })

  describe('when given identifierDescription/*', function(){
    it('should return the full identifierDescription when matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('application/*'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, '"application/json"', done)
    })

    it('should return false when not matching', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('text/*'))
      })

      request(app)
      .post('/')
      .type('application/json')
      .send('{}')
      .expect(200, 'false', done)
    })

    it('should ignore charset', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.json(req.is('application/*'))
      })

      request(app)
      .post('/')
      .type('application/json; charset=UTF-8')
      .send('{}')
      .expect(200, '"application/json"', done)
    })
  })
})
