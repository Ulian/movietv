const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()

const server = require('../../server/index')

describe('searchController', () => {
  it('it should search a query', (done) => {
    const query = 'the walking dead'

    chai.request(server)
      .get(`/api/search/${query}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

  it('it should not allow to search with a query.length less than 3 characters', (done) => {
    const query = '1'

    chai.request(server)
      .get(`/api/search/${query}`)
      .end((error, res) => {
        should.exist(error)
        should.exist(res)
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        done()
      })
  })
})
