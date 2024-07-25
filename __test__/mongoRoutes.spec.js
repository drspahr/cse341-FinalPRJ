/**********
 You should install the following

npm install jest --save--dev 

npm install mongodb dotenv supertest @jest/globals
npm install --save-dev jest

 ******/




const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('MongoDB Routes', () => {
    let connection;
    let db;
    let testUserId;
    const userCollection = 'users';

    beforeAll(async () => {
        // Initialize MongoDB connection
        connection = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db(); // Use the appropriate database name

        // Insert a test user
        const result = await db.collection(userCollection).insertOne({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password'
        });
        testUserId = result.insertedId;
    });

    afterAll(async () => {
        // Clean up the test user
        if (db) {
            await db.collection(userCollection).deleteOne({ _id: testUserId });
        }
        if (connection) {
            await connection.close();
        }
    });

    test('GET /item should return all items', async () => {
        const res = await request.get('/item');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.statusCode).toBe(200);
    });
});

test('GET /inventory should return all electronics', async () => {
    const res = await request.get(`/inventory`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
});

test('POST /item should create a new  item of grocery', async () => {
    const res = await request.post('/users').send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'newpassword'
    });
    expect(res.statusCode).toBe(204);
});

test('DELETE /item/:id should delete the user', async () => {
    const res = await request.delete(`/item/${testUserId}`);
    expect(res.statusCode).toBe(204);
});