- create rep
- npm init
- then create folder src/app.js
- install express
- then create server
  listen to port
- write reuest handlers for /test, /helli
- then install npm i -g nodemon and update scripts inside package.json

git push code

…or create a new repository on the command line
echo "# devTinder" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/wdcs-trigunapatel/devTinder.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/wdcs-trigunapatel/devTinder.git
git branch -M main
git push -u origin main

-what is middleware

- http status code

- install mangoose library
- connect application to the database "localhost/devtinder"
- call the connectDB function and connect to database before starting appication on 3001
  -javsacript vs jSON object

-----jwt token set:----
-install cookie-parser
-just send a dummy cookie to user
-create GET/profile API and check if you get the cookie back
-intsall jsonwebtoken
-in login API, after email and password validation, create a JWT token and sent it to user
-read the cookies inside your profile API and find the logged in user

- : for rwquest API:
- Create Connection Request Scheme
- Send Connection Request API
- Proper Validation of Data
- Think about All corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query/or/
- Schema.pre("save) function
- Read more about indexes in MongoDB
- Why do we need index in DB
- what is the advantanges and disadvantages of creating?
- Read this article about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

feed:id = this is paramas req.params.id
for feed/1 id nd all

feed?page=1 == this is query params req.query.page
for pagination nd all

pagination: using query params
feed?page=1&limit=10 => 1-10 => .skip(0) & limit(10)
feed?page=2&limit=10 => 11-20 => .skip(10) & limit(10)
feed?page=3&limit=10 => 21-30 => .skip(20) & limit(10)
feed?page=4&limit=10 => 34-40 => .skip(30) & limit(10)

skip = (page -1)*limit
page 4 = (4-1)*10 = 3\*10 = 30 skip 30 user
