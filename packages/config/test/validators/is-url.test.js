/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { default: isUrl } = require('../../dist/src/validators/is-url.js')
const { default: PropertyValueValidationError } = require('../../dist/src/errors/PropertyValueValidationError.js')

describe('@deeptrace/config', () => {
  describe('validators', () => {
    describe('is-url', () => {
      it('returns the null when value is empty', () => {
        const validator = isUrl()

        expect(validator({ value: '' }))
          .to.be.equals(null)
      })

      it('returns the value when value is not empty and is a valid url', () => {
        const validator = isUrl()

        expect(validator({ value: 'http://localhost:3000/' }))
          .to.be.equals('http://localhost:3000/')
      })

      it('ensures trailing slash after hostname when no path is given', () => {
        const validator = isUrl()

        expect(validator({ value: 'http://localhost:3000' }))
          .to.be.equals('http://localhost:3000/')
      })

      it('does not ensures trailing slash after path', () => {
        const validator = isUrl()

        expect(validator({ value: 'http://localhost:3000/foo/bar' }))
          .to.be.equals('http://localhost:3000/foo/bar')
      })

      it('keeps trailing slash after path', () => {
        const validator = isUrl()

        expect(validator({ value: 'http://localhost:3000/foo/bar/' }))
          .to.be.equals('http://localhost:3000/foo/bar/')
      })

      it('throws a PropertyValueValidationError error when value is not a valid url', () => {
        const validator = isUrl()

        expect(() => validator({ value: 'asf', requestedEnvNames: [ 'FOO_BAR' ] }))
          .to.throw(PropertyValueValidationError)
      })
    })
  })
})
