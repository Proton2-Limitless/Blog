const request = require('supertest')
const app = require('../app');
const mongoose = require("mongoose")
require("dotenv").config();

describe.skip('Post Route', () => {
    
    beforeEach(async () => {
        mongoose.connect(process.env.MONGODB_URI)
    })

    afterEach(async () => {
        await mongoose.connection.close();
    })
    async function returnToken(email,password){
        const loginResponse = await request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({email,password});

        return loginResponse.body.token;
    }
    test('should create post', async () => {
        const dummyPost = {
            "title": "Zeus, Kratos",
            "description": "Strong gods",
            "tags": "gods",
            "body": "labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis. Tempor id eu nisl nunc. Magna etiam tempor orci eu. Nunc pulvinar sapien et ligula. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Duis tristique sollicitudin nibh sit amet commodo. Id leo in vitae turpis. Viverra nam libero justo laoreet sit amet cursus. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Euismod lacinia at quis risus sed vulputate odio ut enim. Turpis egestas pretium aenean pharetra magna. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam. Integer enim neque volutpat ac tincidunt vitae semper.Tortor id aliquet lectus proin nibh. Convallis a cras semper auctor neque vitae tempus. Purus in massa tempor nec feugiat. Morbi blandit cursus risus at. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Elementum nisi quis eleifend quam adipiscing. Tortor vitae purus faucibus ornare suspendisse. Placerat in egestas erat imperdiet sed euismod nisi. Eu consequat ac felis donec et. Lobortis mattis aliquam faucibus purus in massa tempor nec. Turpis egestas sed tempus urna et pharetra. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Laoreet non curabitur gravida arcu ac tortor dignissim. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus Arcu non sodales neque sodales ut etiam sit amet nisl. Justo laoreet sit amet cursus sit amet dictum sit. Non consectetur a erat nam. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Adipiscing elit ut aliquam purus sit. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Convallis posuere morbi leo urna. Nisl vel pretium lectus quam id leo. Semper feugiat nibh sed pulvinar proin. Mattis aliquam faucibus purus in massa tempor nec feugiat. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Placerat duis ultricies lacus sed turpis tincidunt. Blandit cursus risus at ultrices mi. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Mauris a diam maecenas sed enim ut sem viverra. Donec ac odio tempor orci dapibus"
        }

        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);
        const token = await returnToken(dummyUser.email,dummyUser.password)

        const response = await request(app)
            .post('/owner/createPost')
            .set('content-type', 'application/json')
            .set('Authorization', `bearer ${token}`)
            .send(dummyPost)
        // console.log(response.body)
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('status')
    })

    test("should get posts", async () => {
        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);
        const token = await returnToken(dummyUser.email,dummyUser.password)
        // console.log(token)
        const response = await request(app)
        .get('/owner/getPost?state=draft')
        .set('content-type', 'application/json')
        .set('Authorization', `bearer ${token}`)
        // .send()
        expect(response.status).toBe(200)
        expect.arrayContaining(response.body.post)
    })
    test("update state", async () => {
        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);
        const token = await returnToken(dummyUser.email,dummyUser.password)

        const id= ''
        const response = await request(app)
        .patch(`/owner/updateState/${id}?state=published`)
        .set('content-type', 'application/json')
        .set('Authorization', `bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('status')
        // console.log(response.body)
    })
    test("edit post", async () => {
        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);
        const token = await returnToken(dummyUser.email,dummyUser.password)

        const update = {
            title:"updated title",
            body: "Felis eget velit aliquet sagittis id consectetur. Id interdum velit laoreet id donec ultrices. Sit amet facilisis magna etiam. Vitae sapien pellentesque habitant morbi tristique senectus et. Non blandit massa enim nec dui nunc mattis enim ut. Velit dignissim sodales ut eu. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Nisl nunc mi ipsum faucibus vitae aliquet nec. Id nibh tortor id aliquet lectus proin. Praesent tristique magna sit amet purus gravida quis. Sollicitudin ac orci phasellus egestas. Suscipit adipiscing bibendum est ultricies integer. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Egestas dui id ornare arcu. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Aliquet lectus proin nibh nisl condimentum id. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Maecenas accumsan lacus vel facilisis volutpat est. Risus at ultrices mi tempus imperdiet nulla malesuada"
        }
        const id= ''
        const response = await request(app)
        .put(`/owner/editPost/${id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `bearer ${token}`)
        .send(update)
        // console.log(response.body)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('status')
    })
    test("delete post", async () => {
        const dummyUser = { email: 'Habib2@gmail.com', password: 'testtest' }
        // await UserModel.create(dummyUser);
        const token = await returnToken(dummyUser.email,dummyUser.password)
        // console.log(token)
        const id= ''
        const response = await request(app)
        .del(`/owner/deletePost/${id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('status')
        // console.log(response.body)
    })
})