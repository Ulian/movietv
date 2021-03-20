/* eslint-disable no-unused-expressions */

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()
const expect = chai.expect

const server = require('../../src')

describe('celebritiesController', () => {
  const states = ['airing_today', 'popular', 'top_rated', 'on_the_air']
  const page = 2

  const tvId = 1402

  states.forEach((value) => {
    it(`it should get first page of ${value} tvshows`, (done) => {
      chai.request(server)
        .get(`/api/tvshows/${value}`)
        .end((error, res) => {
          should.not.exist(error)
          should.exist(res)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body['page'].should.be.equal(1)
          done()
        })
    })

    it(`it should get second page of ${value} tvshows`, (done) => {
      chai.request(server)
        .get(`/api/tvshows/${value}/${page}`)
        .end((error, res) => {
          should.not.exist(error)
          should.exist(res)
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body['page'].should.be.equal(page)
          done()
        })
    })
  })

  it('it should get The Walking Dead tvshow data', (done) => {
    chai.request(server)
      .get(`/api/tvshow/${tvId}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['name'].should.be.equal('The Walking Dead')
        done()
      })
  })

  it('it should get The Walking Dead first season data', (done) => {
    chai.request(server)
      .get(`/api/season/${tvId}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['name'].should.be.equal('Temporada 1')
        expect(res.body['episodes']).to.be.an('array').that.is.not.empty
        done()
      })
  })
})
