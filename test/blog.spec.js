const request = require('supertest')
const app = require('../app');
const mongoose = require("mongoose")
require("dotenv").config();

describe('Post Route', () => { 
    
    beforeEach(async () => {
        mongoose.connect(process.env.MONGODB_URI)
    })

    afterEach(async () => {
        await mongoose.connection.close();
    })

    test.skip("get all blogs", async () => {
        
        const response = await request(app)
            .get('/blogs/searchByQuery?tags=football&order_by=Created_at,read_count,reading_time&order=asc')
            .set('content-type', 'application/json')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status')
        expect.arrayContaining(response.body.searchedPost)
    })
    test("get single blog", async () => {
        
        // const id = ""
        const response = await request(app)
            .get("/blogs/singleBlog/63601adc30f407c9f92a2e97")
            
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status')
        expect.objectContaining(response.body.blog)
    })
})