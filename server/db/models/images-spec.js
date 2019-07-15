const {expect} = require('chai')
const db = require('../index')
const Images = db.model('images')

describe('Images model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Methods', () => {
    describe('correctImages', () => {
      let happy

      beforeEach(async () => {
        happy = await Images.create({
          name: 'happy',
          imageUrl: 'data:image/png;base64,iVBORw0KG=='
        })
      })

      it('returns true if the Image name is accurate', () => {
        expect(happy.correctImages('happy')).to.be.equal(true)
      })

      it('returns false if the Image name is inaccurate', () => {
        expect(happy.correctImages('sad')).to.be.equal(false)
      })
      it('return true if the Image Url is accurate', () => {
        expect(
          happy.correctImages('data:image/png;base64,iVBORw0KG==')
        ).to.be.equal(true)
      })
      it('return true if the Image Url is inaccurate', () => {
        expect(
          happy.correctImages('data:image/png;base64,iVBORw0KG==')
        ).to.be.equal(false)
      })
    })
  })
})
