/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { default: isRequired } = require('../../dist/src/validators/is-required.js')
const { default: PropertyValueValidationError } = require('../../dist/src/errors/PropertyValueValidationError.js')

describe('@deeptrace/config', () => {
  describe('validators', () => {
    describe('is-required', () => {
      it('returns the value when value is not empty', () => {
        const validator = isRequired()

        expect(validator({ value: 'foo' }))
          .to.be.equals('foo')
      })

      it('throws a PropertyValueValidationError error when value is empty', () => {
        const validator = isRequired()

        expect(() => validator({ value: null, requestedEnvNames: [ 'FOO_BAR' ] }))
          .to.throw(PropertyValueValidationError)
      })
    })
  })
})
