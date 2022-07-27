import app from '../src/app.js';
import request from 'supertest';

describe('GET /tasks', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200)
    })

    test('should respond with a array', async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /tasks', () => {

    describe('given a title and description', () => {
        
        const newTask = {
            title: 'New Task',
            description: 'New Task Description'
        }

        //Should respond with a 200 status code
        test('should respond with a 200 status code', async () => {
            const respond = await request(app).post('/tasks').send(newTask)
            expect(respond.statusCode).toBe(200)
        })
        //Should respond with a content type of application/json
        test('should have a content-type: aplication/json in header', async () => {
            const respond = await request(app).post('/tasks').send(newTask)
            expect(respond.header['content-type']).toEqual(expect.stringContaining('json'))
        })
        //Should respond with a json object containing the new task with a title
        test('should response with an task ID', async () => {
            const respond = await request(app).post('/tasks').send(newTask)
            expect(respond.body.id).toBeDefined()
        })
    })

    describe('when a title and description is missing', () => {
        test('should respond with a 400 status code', async () => {
            const respond = await request(app).post('/tasks').send({})
            expect(respond.statusCode).toBe(400)
        })
    })

    
})