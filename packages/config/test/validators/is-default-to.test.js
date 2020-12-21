/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { default: isDefaultTo } = require('../../dist/src/validators/is-default-to.js')

describe('@deeptrace/config', () => {
  describe('validators', () => {
    describe('is-default-to', () => {
      it('returns the value when value is not empty', () => {
        const validator = isDefaultTo('')

        expect(validator({ value: 'foo' }))
          .to.be.equals('foo')
      })

      it('returns the default value when value is empty', () => {
        const validator = isDefaultTo('foo')

        expect(validator({ value: '' }))
          .to.be.equals('foo')
      })

      it('returns the default value when value is null', () => {
        const validator = isDefaultTo('foo')

        expect(validator({ value: null }))
          .to.be.equals('foo')
      })
    })
  })
})
