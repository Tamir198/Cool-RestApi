
#### Please note: 

Before you run the project you should have `.env` file with `SECRET_KEY=the value` in the root level of the project : 
![image](https://github.com/Tamir198/Cool-RestApi/assets/34707669/d0c02689-4426-4c56-a051-585e47d16aa6)



 

---

## Running the server
To run the server first clone the project then run:

```
npm i
npm start
```

Your server will run on `http://localhost:3000`.

To view the Swagger UI interface go to:

```
http://localhost:3000/docs
```

---

## Test that everything works:

For easy start you can import the postman collection via the  [cool-rest-api.postman_collection.json](https://github.com/Tamir198/Cool-RestApi/blob/main/cool-rest-api.postman_collection.json) file.

once imported you will see this in your postman : 

![image](https://github.com/Tamir198/Cool-RestApi/assets/34707669/84cdcac5-705c-4a8b-b5f5-3fc981155e3d)

Once the server is running you test it with postman - just make sure to change the tokens for different results just like the video below : 

https://github.com/Tamir198/Cool-RestApi/assets/34707669/ec72e6b4-6218-45e7-93e3-9779e9c54152

Also for checking all the server functionality dont forget to check all the edge cases by changing the `operation` header : 

https://github.com/Tamir198/Cool-RestApi/assets/34707669/bc77c80f-02f5-42c9-b65b-0087b44e4587



Or you can test it via Swagger UI interface : 



https://github.com/Tamir198/Cool-RestApi/assets/34707669/66e44f91-3b5b-4036-bae0-210695123bc9


For testing purposes, you can use these tokens (since this will not go into production and does not contain any sensitive data, I have included the tokens here):

| User Type          | Name                     | Password   | Role       | Token                                                                                               |
|--------------------|--------------------------|------------|------------|-----------------------------------------------------------------------------------------------------|
| Admin (Non-expire) | Non-expire-admin-user    | 123456     | admin      | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9uLWV4cGlyZS11c2VyIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg2OTkyNDMsImV4cCI6MjAzNDI3NTI0M30.pPIRx6vOjzXVcAwJi82C9bLyRyDTyznspDAIGrSZSGk` |
| User (Non-expire)  | Non-expire-user-non-admin| 123456     | user       | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9uLWV4cGlyZS1ub24tYWRtaW4tdXNlciIsInBhc3N3b3JkIjoiMTIzNDU2Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTg2OTk1NDgsImV4cCI6MjAzNDI3NTU0OH0.qrskmS6mcLEeV46UTGRNZF2YY9yt67tpmbRXyjKHtSM` |
| Admin (Expired)    | Tamir                    | 123456     | admin      | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFtaXIiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxODY5NzU5NywiZXhwIjoxNzE4NzAxMTk3fQ.QuR3OoCKRUiiO54ybRwTsWQgMzNit9p2LhXi5Wej_1A` |
| User (Expired)     | yona                     | 123456     | user       | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW9uYSIsInBhc3N3b3JkIjoiMTIzNDU2Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTg2OTg5MjcsImV4cCI6MTcxODY5ODk4N30.bkEeKpf8HvoDnFr__1M5nqm0IFzZBGK3_rM_QzfqR3g` |

Admin tokens should pass the authorization; user tokens should not, assuming they are not expired.
## Unit tests : 

Run `npm test` and you should see all the tests running: 

![image](https://github.com/Tamir198/Cool-RestApi/assets/34707669/1c1b16d8-cf55-4c77-a617-ba59127e11a8)



---

  <img src="https://skillicons.dev/icons?i=docker"  style="margin: 5px;">


To run the project with docker you need to run : 

```
docker compose build
```

Once done you should see a new image : 

![image](https://github.com/Tamir198/Cool-RestApi/assets/34707669/98da3670-e4ea-49e8-bf91-dd4c2da3ece7)

To generate container from the image: 

```
docker compose up
```

You should see a message indication that the server is running : 

```
$ docker compose up
[+] Running 2/2
 ✔ Network cool-restapi_default            Created                                                                                                                                               0.7s 
 ✔ Container cool-restapi-cool-rest-api-1  Created                                                                                                                                               0.0s 
Attaching to cool-restapi-cool-rest-api-1
cool-restapi-cool-rest-api-1  | Tue, 18 Jun 2024 10:15:52 GMT body-parser deprecated undefined extended: provide extended option at node_modules/oas3-tools/dist/middleware/express.app.config.js:22:33
cool-restapi-cool-rest-api-1  |   Mock mode: disabled
cool-restapi-cool-rest-api-1  | Your server is listening on port 3000 (http://localhost:3000)
cool-restapi-cool-rest-api-1  | Swagger-ui is available on http://localhost:3000/docs
```

And live container as well (it will run on the same port as the localhost so you may need to close your local server first): 

![image](https://github.com/Tamir198/Cool-RestApi/assets/34707669/acd5a375-1b66-4747-a12c-7b0f84433257)



