import reqests from 'supertest'
import expect from 'chai'
import { Application } from 'express'
import createServer from 'app'


let app: Application = createServer(2111)

describe("server checks", function () {
    it("server was created successfully", function (done) {
        reqests(app).get('/api/v1/healthcheck').expect(200, done)
    })
})