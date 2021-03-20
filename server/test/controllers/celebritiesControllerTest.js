/* eslint-disable no-unused-expressions */

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()
const expect = chai.expect

const server = require('../../index')

describe('celebritiesController', () => {
  const celebId = 1245
  const page = 2

  it('it should get first page of celebrities', (done) => {
    chai.request(server)
      .get(`/api/celebrities`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['page'].should.be.equal(1)
        done()
      })
  })

  it('it should get second page of celebrities', (done) => {
    chai.request(server)
      .get(`/api/celebrities/${page}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['page'].should.be.equal(page)
        done()
      })
  })

  it('it should get Scarlett Johansson data', (done) => {
    chai.request(server)
      .get(`/api/celebritie/${celebId}`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['name'].should.be.equal('Scarlett Johansson')
        done()
      })
  })

  it('it should get first page of Scarlett Johansson images', (done) => {
    chai.request(server)
      .get(`/api/celebritie/${celebId}/tagged_images`)
      .end((error, res) => {
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['page'].should.be.equal(1)
        expect(res.body['results']).to.be.an('array').that.is.not.empty
        done()
      })
  })

  it.skip('it should get second page of Scarlett Johansson images', (done) => {
    chai.request(server)
      .get(`/api/celebritie/${celebId}/tagged_images/${page}`)
      .end((error, res) => {
        console.log(res.body);
        should.not.exist(error)
        should.exist(res)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body['page'].should.be.equal(page)
        expect(res.body['results']).to.be.an('array').that.is.not.empty
        done()
      })
  })
})
