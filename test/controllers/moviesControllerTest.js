const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()

const server = require('../../server/index')

describe('celebritiesController', () => {
  const states = ['now_playing', 'popular', 'top_rated', 'upcoming']
  const page = 2

  const movieId = 76341

  states.forEach((value) => {
    it(`it should get first page of ${value} movies`, (done) => {
      chai.request(server)
        .get(`/api/movies/${value}`)
        .end((error, res) => {
          should.not.exist(error)
          should.exist(res)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body['page'].should.be.equal(1)
          done()
        })
    })

    it(`it should get second page of ${value} movies`, (done) => {
      chai.request(server)
        .get(`/api/movies/${value}/${page}`)
        .end((error, res) => {
          should.not.exist(error)
          should.exist(res)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body['page'].should.be.equal(2)
          done()
        })
    })
  })

  it('it should get Mad Max movie data', (done) => {
    chai.request(server)
      .get(`/api/movie/${movieId}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['title'].should.be.equal('Mad Max: Furia en la carretera')
        done()
      })
  })
})
