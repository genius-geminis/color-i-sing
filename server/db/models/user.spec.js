/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        fullName: 'Cody Banks',
        email: 'cody@email.com',
        password: 'bones',
        googleId: 'cody@email.com'
      })
    })
    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })
      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })
    describe('correctInfo', () => {
      it('returns true if the Full Name is correct', () => {
        expect(cody.correctInfo('Cody Banks')).to.be.equal(true)
      })
      it('returns false if the Full Name is incorrect', () => {
        expect(cody.correctInfo('Cody Bankkakaka')).to.be.equal(false)
      })
      it('returns true if the Google ID is correct', () => {
        expect(cody.correctInfo('cody@email.com')).to.be.equal(true)
      })
      it('returns false if the Google ID is incorrect', () => {
        expect(cody.correctInfo('Cody Bankkakaka@email.com')).to.be.equal(false)
      })
    })
  }) // end describe('correctPassword')
  // end describe('instanceMethods')
}) // end describe('User model')
