import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await createConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            name: "User Test 01",
            email: "user@example.com",
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new user with exists email", async ()=> {
        const response = await request(app).post("/users")
        .send({
            name: "User Test 01",
            email: "user@example.com",
        });

        expect(response.status).toBe(400);
    });
});