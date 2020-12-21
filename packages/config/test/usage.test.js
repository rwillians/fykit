/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { config, ConfigValidationError } = require('../dist/index.js')

describe('@deeptrace/config', () => {
  describe('usage', () => {
    it('can build a config object', () => {
      process.env.TEST_A__ENABLED = '1'
      process.env.TEST_A__MONGO_URL = 'mongodb://localhost:27017/'
      process.env.TEST_A__MONGO_POOL_SIZE = '10'

      const builtObject = config(({ env, is, as }) => ({
        enabled: env('TEST_A__ENABLED', [ as.boolean() ]),
        namespace: env('TEST_A__NAMESPACE', [ is.defaultTo('traces') ]),
        mongo: {
          url: env('TEST_A__MONGO_URL', [ is.required() ]),
          poolsize: env('TEST_A__MONGO_POOL_SIZE', [ is.required(), as.integer() ])
        }
      }))

      expect(builtObject).to.be.deep.equals({
        enabled: true,
        namespace: 'traces',
        mongo: {
          url: 'mongodb://localhost:27017/',
          poolsize: 10
        }
      })
    })

    it('throws a ConfigValidationError when there are on or more errors', () => {
      process.env.TEST_B__ENABLED = 'asdf'
      process.env.TEST_B__MONGO_URL = 'mongodb://localhost:27017/'

      let error

      try {
        config(({ env, is, as }) => ({
          enabled: env('TEST_B__ENABLED', [ as.boolean() ]),
          namespace: env('TEST_B__NAMESPACE', [ is.defaultTo('traces') ]),
          mongo: {
            url: env('TEST_B__MONGO_URL', [ is.required() ]),
            poolsize: env('TEST_B__MONGO_POOL_SIZE', [ is.required(), as.integer() ])
          }
        }))
      } catch (err) {
        error = err
      }

      expect(error).to.be.an.instanceOf(ConfigValidationError)
      expect(error.errors.length).to.be.equals(2)
    })
  })
})
