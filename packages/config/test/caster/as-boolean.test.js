/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const { default: asBoolean } = require('../../dist/src/casters/as-boolean.js')
const { default: PropertyValueCastingError } = require('../../dist/src/errors/PropertyValueCastingError.js')

describe('@deeptrace/config', () => {
  describe('casters', () => {
    describe('as-boolean', () => {
      it('returns null when value is empty', () => {
        const caster = asBoolean()

        expect(caster({ value: '', originEnvName: 'FOO' }))
          .to.be.equals(null)
      })

      it('returns false when value is a valid boolean-like falsey string', () => {
        const caster = asBoolean()

        expect(caster({ value: '0', originEnvName: 'FOO' }))
          .to.be.equals(false)

        expect(caster({ value: 'false', originEnvName: 'FOO' }))
          .to.be.equals(false)
      })

      it('returns true when value is a valid boolean-like truthy string', () => {
        const caster = asBoolean()

        expect(caster({ value: '1', originEnvName: 'FOO' }))
          .to.be.equals(true)

        expect(caster({ value: 'true', originEnvName: 'FOO' }))
          .to.be.equals(true)
      })

      it('throws a PropertyValueCastingError when value is not a valid boolean-like string', () => {
        const caster = asBoolean()

        expect(() => caster({ value: 'asdf', originEnvName: 'FOO' }))
          .to.throw(PropertyValueCastingError)
      })
    })
  })
})
