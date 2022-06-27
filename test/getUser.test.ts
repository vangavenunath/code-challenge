import { app } from '../src/app';
import request from 'supertest';


describe('GET /users/{id}', () => {
    it('Should get user successfully', async () => {
        const data = {
            "name": "venu",
            "email": "test@gmail.com",
            "dob": "19/02/1990"
        }
        const res = await request(app).post('/users').send(data);
        expect(res.statusCode).toBe(201)

        const users = require('../data/users.json')
        const sampleUserId = Object.keys(users)[0];
        const getResponse = await request(app).get(`/users/${sampleUserId}`).send({});
        expect(getResponse.statusCode).toBe(200)
        expect(getResponse.body).toMatchObject({ "message": "user found" })
    })

    it('Should return user not found for unknown userid', async () => {
        const res = await request(app).get('/users/test').send({});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "message": "userId - test does not exist" })
    })

})