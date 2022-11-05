const request = require('supertest')
const UserModel = require('../models/user')
const app = require('../app');
const mongoose = require("mongoose")
require("dotenv").config();

describe.skip('Auth route', () => {
    // let conn;
    beforeEach(async () => {
        mongoose.connect(process.env.MONGODB_URI);
    })

    afterEach(async () => {
        await mongoose.connection.close();
    })
    test.only('should login a user', async () => {
        // create user in out db
        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);

        // login user
        const response = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send(dummyUser);


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })
    test('should signup a user', async () => {
        const newUser = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
        }
        const response = await request(app).post('/auth/signup')
            .set('content-type', 'application/json')
            .send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('firstname', '')
        expect(response.body.user).toHaveProperty('lastname', '')
        expect(response.body.user).toHaveProperty('email', '@mail.com')
    })
})