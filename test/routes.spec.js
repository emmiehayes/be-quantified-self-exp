const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Client Routes', () => {
  it('should return the homepage with text', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.html
        response.res.text.should.equal('Welcome to Quantified Self!')
        done()
      })
  })
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
  })
})

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  // FOOD API ENDPOINT TESTING
  describe('GET /api/v1/foods', () => {
    it('should return all foods', done => {
      chai.request(server)
        .get('/api/v1/foods')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(7)
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('calories')
          done()
        })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it('should return a single food', done => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(1)
          // only record
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('Apple')
          response.body[0].should.have.property('calories')
          response.body[0].calories.should.equal('10')
          done()
        })
    })
    it('should return a 404 if the id does not exist', done => {
      chai.request(server)
        .get('/api/v1/foods/765')
        .end((err, response) => {
          response.should.have.status(404)
          done()
        })
    })
  })

  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'DragonFruit',
          calories: '10'
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          done()
        })
    })
    it('should not create a record with missing data', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'DragonFruit'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.error.should.equal(
            `Expected format: { name: <String>, calories: <String> }. You're missing a "calories" property.`
          )
          done()
        })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete a food', done => {
      chai.request(server)
        .delete('/api/v1/foods/6')
        .end((error, response) => {
          response.should.have.status(204)
          done()
        })
    })
    it('should return a 404 if the food is not found', done => {
      chai.request(server)
        .delete('/api/v1/foods/678')
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    it('should update a food', done => {
      chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          name: 'example',
          calories: 'example1'
        })
        .end((err, response) => {
          response.should.have.status(202)
          response.body.should.have.property('message')
          response.body.message.should.eq('Food with id:1 was successfully updated.')
          done()
        })        
    })

    it('should return a 404 if the food is not found', done => {
      chai.request(server)
        .patch('/api/v1/foods/679')
        .send({
          name: 'example',
          calories: 'example1'
        })
        .end((err, response) => {
          response.should.have.status(404)
          done()
        })
    })

    it('should return a 422 if the request is missing data', done => {
      chai.request(server)
        .patch('/api/v1/foods/679')
        .send({
          calories: 'example1'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.error.should.equal(
            `Expected format: { name: <String>, calories: <String> }. You're missing a "name" property.`
          )
          done()
        })
    })
  })  

  // MEAL API ENDPOINTS TESTING
  describe('GET /api/v1/meals', () => {
    it('should return all meals with associated foods', done => {
      chai.request(server)
        .get('/api/v1/meals')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(4)
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('foods')
          response.body[0].foods.should.be.a('array')
          response.body[0].foods[0].should.have.property('id')
          response.body[0].foods[0].should.have.property('name')
          response.body[0].foods[0].should.have.property('calories')
          response.body[1].should.have.property('id')
          response.body[1].should.have.property('name')
          response.body[1].should.have.property('foods')
          response.body[1].foods.should.be.a('array')
          response.body[1].foods[0].should.have.property('id')
          response.body[1].foods[0].should.have.property('name')
          response.body[1].foods[0].should.have.property('calories')
          done()
        })
    })
  })

  describe('GET /api/v1/meals/:id', () => {
    it('should return a single meal with associated foods', done => {
      chai.request(server)
        .get('/api/v1/meals/1')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(1)
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('foods')
          response.body[0].foods.should.be.a('array')
          response.body[0].foods[0].should.have.property('id')
          response.body[0].foods[0].should.have.property('name')
          response.body[0].foods[0].should.have.property('calories')
          done()
        })
    })

    it('should return a 404 if the id does not exist', done => {
      chai.request(server)
        .get('/api/v1/meals/765')
        .end((err, response) => {
          response.should.have.status(404)
          done()
        })
    })
  })

  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it('should add a food to a meal', done => {
      chai.request(server)
      .post('/api/v1/meals/1/foods/5')
      .send({
        food_id: 1,
        meal_id: 2
      })
      .end((err, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('message')
        response.body.message.should.eq('Food was successfully added to meal')
        done()
      })
    })
  })
})
