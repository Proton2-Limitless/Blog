# Blog App
This is an api for a BLog app

---

## Requirements
1. Users should have a first_name, last_name, email, password
2. A user should be able to sign up and sign in into the blog app
3. JWT authentication strategy is Use
4. A blog is in two states; draft and published
5. Logged in and not logged in users are able to get a list of published blogs created
6. Logged in and not logged in users are able to to get a published blog
7. Logged in users can create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog can update the state of the blog to published 
10. The owner of a blog can edit the blog in draft or published state
11. The owner of the blog can delete the blog in draft or published state
12. The owner of the blog can get a list of their blogs
  a. The endpoint is paginated
  b. It should is filterable by state
13. Blogs created have have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users is paginated,
  a. default to 20 blogs per page
  b. It is searchable by author, title and tags.
  c. It is also orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api return the user information(the author) with the blog. The read_count of the blog too is updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog
17. There is a tests for all endpoints
---
## Setup
- Install NodeJS, mongodb, 
- pull this repo
- update env with example.env
- run `npm install`
- run `npm run test`

---
## Base URL
- https://proton-app-blog.herokuapp.com/


## Models
---

### User
| field     | data_type | constraints |
| --------- | --------- | ----------- |
| id        | string    | required    |
| firstname | string    | optional    |
| lastname  | string    | optional    |
| email     | string    | optional    |
| password  | string    | required    |



### Post
| field        | data_type | constraints              |
| ------------ | --------- | ------------------------ |
| title        | string    | required unique          |
| description  | date      |                          |
| state        | number    | required,default:'draft' |
| body         | number    | required                 |
| author       | object    | required                 |
| read_count   | string    | default:0                |
| reading_time | string    |                          |
| tags         | string    |                          |
| timestamp    | Date      |                          |



## APIs
---

### Signup User

- Route: /auth/signup
- Method: POST
- Body: 
```
{
  "email": "test@example.com",
  "password": "test1",
  "firstname": "test",
  "lastname": "test"
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "example@example.com",
        "password": "example",
        "firstname": "example",
        "lastname": "example"
    }
}
```
---
### Login User

- Route: /auth/login
- Method: POST
- Body: 
```
{
  "email": 'example@example.com",
  "password": "example",
}
```

- Responses

Success
```
{
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create post

- Route: owner/createPost
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "state":"published",
  "title": "Zeus",
  "description": "Strong gods",
  "tags": "gods",
  "body": "la el turpis nunc eget lorem dolor es sagittis orci a scelerisque purus Arcu non sodales neque"
  }
```

- Responses

Success
```
{
      message: "Post created succesfully",
      status: true,
    }
```
---
### Get Post

- Route: /owner/getPost
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  status: true,
  post
}
```
---

### Update Posts state

- Route: /owner/updateState/:id?state=published
- Method: PATCH
- Header:
    - Authorization: Bearer {token}

    
- Responses

Success
```
{
      message: "state Updated succesfully",
      status: true,
    }
```
---

### edit Posts

- Route: /owner/editPost/:id
- Method: PUT
- Header:
    - Authorization: Bearer {token}

    
- Responses

Success
```
{
      message: "edited succesfully",
      status: true,
   }
```
---

### delete Posts

- Route: /owner/deletePost/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}

    
- Responses

Success
```
{
      message: "deleted succesfully",
      status: true,
   }
```
---

### get all Posts

- Route: /blogs/getAllBlogs
- Method: GET
    
- Responses

Success
```
{
      status: true,
      blogs
   }
```
---

### get all Posts

- Route: /blogs/searchByQuery?tags=football&order_by=Created_at,read_count,reading_time&order=asc
- Method: GET
    
- Responses

Success
```
{
            status: true,
            searchedPost
        }
```
---

### get all Posts

- Route: /blogs/singleBlog/:id
- Method: GET
    
- Responses

Success
```
{
      status: true,
      blog
  }
```
---

...

## Contributor
- YUSUF HABIB
- Habeebllah77@gmail.com
