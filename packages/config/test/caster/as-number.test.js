/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { default: asNumber } = require('../../dist/src/casters/as-number.js')
const { default: PropertyValueCastingError } = require('../../dist/src/errors/PropertyValueCastingError.js')

describe('@deeptrace/config', () => {
  describe('casters', () => {
    describe('as-number', () => {
      it('returns null when value is empty', () => {
        const caster = asNumber()

        expect(caster({ value: '', originEnvName: 'FOO' }))
          .to.be.equals(null)
      })

      it('returns the value as number when value is a valid numeric string', () => {
        const caster = asNumber()

        expect(caster({ value: '123', originEnvName: 'FOO' }))
          .to.be.equals(123)
      })

      it('throws a PropertyValueCastingError when value is not a valid numeric string', () => {
        const caster = asNumber()

        expect(() => caster({ value: 'asdf', originEnvName: 'FOO' }))
          .to.throw(PropertyValueCastingError)
      })
    })
  })
})
