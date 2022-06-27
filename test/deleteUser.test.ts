import { app } from '../src/app';
import request from 'supertest';


describe('DELETE /users/{id}', () => {
    it('Should delete user successfully', async () => {
        const res = await request(app).post('/users').send({
            "name": "venu",
            "email": "test@gmail.com",
            "dob": "19/02/1990"
        });
        expect(res.statusCode).toBe(201)

        const users = require('../data/users.json')
        const sampleUserId = Object.keys(users)[0];
        const delResponse = await request(app).delete(`/users/${sampleUserId}`).send({});
        expect(delResponse.statusCode).toBe(200)
        expect(delResponse.body).toEqual({ "message": `userId - ${sampleUserId} deleted successfully` })
    })

    it('Should return user not found for unknown userid', async () => {
        const res = await request(app).delete('/users/test').send({});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "message": "userId - test does not exist" })
    })

})