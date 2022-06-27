import { app } from '../src/app';
import request from 'supertest';
import * as services from '../src/services/add-user';
let errorLogFn: any;

describe('POST /users', () => {
    beforeAll(() => {
     errorLogFn = console.error
     console.error = () => {}
    })

    afterAll(() => {
        console.error = errorLogFn
    })
    it('Should add user successfully', async () => {
        const res = await request(app).post('/users').send({
            "name": "venu",
            "email": "test@gmail.com",
            "dob": "19/02/1990"
        });
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ "message": "user added successfully" })
    })

    it('Should return error for bad request body', async () => {
        const res = await request(app).post('/users').send({});
        expect(res.statusCode).toBe(400)
    })

    it('Should return internal server error when occurs', async () => {
        const orig = services.addUserInFile
        //@ts-ignore
        services.addUserInFile = jest.fn(orig)
        //@ts-ignore
        services.addUserInFile.mockImplementation(() => {throw new Error('test')});

        const res = await request(app).post('/users').send({
            "name": "venu",
            "email": "test@gmail.com",
            "dob": "19/02/1990"
        });
        expect(res.status).toBe(500);
    })

})
