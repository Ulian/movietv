const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()

const server = require('../../server/index')

describe('collectionsController', () => {
  const collectionId = 173710

  it('it should get collection data', (done) => {
    chai.request(server)
      .get(`/api/collection/${collectionId}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['name'].should.be.equal('El planeta de los simios (El origen) - Colección')
        done()
      })
  })
})
