import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys", ()=> {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await createConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new survey", async() => {
        const response = await request(app).post("/surveys")
        .send({
            title: "Title Test 01",
            description: "Description Teste 01"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("created_at");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys")
        .send({
            title: "Title Test 02",
            description: "Description Test 02"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});