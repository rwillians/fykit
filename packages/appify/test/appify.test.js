/* eslint-env mocha */
'use strict'

const axiosist = require('axiosist')
const { appify } = require('../dist/index.js')
const { environments } = require('@fykit/commons')
const { expect } = require('chai')
const { UnprocessableEntityHttpError } = require('@fykit/commons')

describe('const requestListener = appify(async ({ ...callbackProps }) => void)({ ...factoryProps })', () => {
  describe('common behavior', () => {
    let factoryarg
    let api

    before(async () => {
      const appFactory = appify(async ({ router, config, environment, logger, bar }) => {
        factoryarg = { router, config, environment, logger }

        router.get('/foo', (_req, res) => {
          res.end('bar')
        })

        router.get('/bar', (_req, res) => {
          res.end(bar)
        })

        router.get('/err', (_req, _res, next) => {
          next(new Error('non-http error message'))
        })

        router.get('/422', (_req, _res, next) => {
          next(new UnprocessableEntityHttpError({
            code: 'ARBITRARY_CODE',
            message: 'fluvers invalid payload',
            details: [
              { foo: 'bar' }
            ]
          }))
        })
      })

      api = axiosist(await appFactory({
        environment: environments.TEST,
        logger: {
          error: () => {},
          log: () => {},
          warn: () => {},
        },
        bar: 'baz'
      }))
    })

    it('passes a `router` property into the callback\'s argument, which is an instance of express.Router', () => {
      expect(factoryarg).to.have.a.property('router')
    })

    it('passes an `environment` string property into the callback\'s argument', () => {
      expect(factoryarg).to.have.a.property('environment')
      expect(factoryarg.environment).to.be.a('string')
    })

    it('passes a `logger` object property into the callback\'s argument', () => {
      expect(factoryarg).to.have.a.property('logger')
      expect(factoryarg.logger).to.be.an('object')
      expect(factoryarg.logger).to.have.a.property('error')
      expect(factoryarg.logger.error).to.be.a('function')
    })

    it('successfully exposes a ping endpoint', async () => {
      const response = await api
        .get('/ping')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(200)
      expect(response.data).to.be.equals('pong!')
    })

    it('allows exposing custom endpoints using router', async () => {
      const response = await api
        .get('/foo')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(200)
      expect(response.data).to.be.equals('bar')
    })

    it('exposes custom properties to be exposed to the factory as property argument', async () => {
      const response = await api
        .get('/bar')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(200)
      expect(response.data).to.be.equals('baz')
    })

    it('non-http errors gets exposed as internal server error', async () => {
      const response = await api
        .get('/err')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(500)
      expect(response.data.error.message).to.be.equals('non-http error message')
    })

    it('http errors gets properly rendered and details are exposed', async () => {
      const response = await api
        .get('/422')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(422)
      expect(response.data.error.code).to.be.equals('ARBITRARY_CODE')
      expect(response.data.error.message).to.be.equals('fluvers invalid payload')
      expect(response.data.error.details).to.have.length(1)
    })

    it('requesting an unregistered route results in a 404 error', async () => {
      const response = await api
        .get('/bla')
        .catch((err) => err.response)

      expect(response.status).to.be.equal(404)
    })

    it('no-cache is enabled by default', async () => {
      const response = await api
        .get('/ping')
        .catch((err) => err.response)

      expect(response.headers).to.have.a.property('cache-control')
      expect(response.headers['cache-control']).to.be.equals('no-store, no-cache, must-revalidate, proxy-revalidate')

      expect(response.headers).to.have.a.property('expires')
      expect(response.headers['expires']).to.be.equals('0')
    })
  })

  describe('when `factoryProps.config` property is a factory function', () => {
    let factoryarg
    let api

    before(async () => {
      process.env.APPIFY_APP_NAME = 'foobar'

      const appFactory = appify(async ({ config }) => {
        factoryarg = { config }
      })

      const configFactory = (environment, baseconfig) => ({
        sentry: { tags: { env: environment } },
        my: { app: { name: baseconfig.app.name } },
      })

      api = axiosist(await appFactory({
        environment: environments.TEST,
        config: configFactory,
        logger: {
          error: () => {},
          log: () => {},
          warn: () => {},
        },
        bar: 'baz'
      }))
    })

    it('passes a `callbackProps.config` object property into the callback function', () => {
      expect(factoryarg).to.have.a.property('config')
      expect(factoryarg.config).to.be.an('object')
    })

    describe('this `config` object', () => {
      it('is the result of your config factory\'s result object with default values from appify\'s base config', () => {
        expect(factoryarg.config.sentry.environment).to.be.equals(environments.TEST)
        expect(factoryarg.config.sentry.tags.env).to.be.equals(environments.TEST)
        expect(factoryarg.config.my.app.name).to.be.equals('foobar')
      })
    })
  })

  describe('when the `factoryProps.config` property is an object', () => {
    let factoryarg
    let api

    before(async () => {
      const appFactory = appify(async ({ config }) => {
        factoryarg = { config }
      })

      api = axiosist(await appFactory({
        environment: environments.TEST,
        config: {
          sentry: { tags: { foo: 'bar' } },
          my: { bar: 'baz' },
        },
        logger: {
          error: () => {},
          log: () => {},
          warn: () => {},
        },
        bar: 'baz'
      }))
    })

    it('passes a `callbackProps.config` object property into the callback function', () => {
      expect(factoryarg).to.have.a.property('config')
      expect(factoryarg.config).to.be.an('object')
    })

    describe('this `config` object', () => {
      it('is the your userland config object with default values from appify\'s base config', () => {
        expect(factoryarg.config.sentry.environment).to.be.equals(environments.TEST)
        expect(factoryarg.config.sentry.tags.foo).to.be.equals('bar')
        expect(factoryarg.config.my.bar).to.be.equals('baz')
      })
    })
  })
})
