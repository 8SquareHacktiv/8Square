# 8Square
8Square is a website that allows its user to see recommendation of places nearby. Once they've visited the place, the User can give rating and review.

  - Built with jquery, implementing Single Page Application 
 - Built with rest API
 - Data storage is in Postgres utilizing sequelize
 - Integrated with 4 third party API;
    ```
    geoplugin > get ip address
    ipstack > get location of user based on ipaddress
    4square > get recommendation of places
    google maps > get information of distance taken and time that would be required to reach said place
    ```
# Usage
Make sure to install all dependencies on both client and server side
> npm install

Assuming that live-server has been installed globally, on the client side run :
> live-server --host=localhost

On the server side, run:
>npm run dev
# User Route
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /users/register |null| POST |username, email, password, token|201(Created), 500(Internal Server Error)|Sign in to the website|
| /users/login |null| POST |email,  password|200(Created), 500(Internal Server Error)|Log in to the website|
| /users/google |null| POST |email,  password, username|201(Created), 500(Internal Server Error)|Google Sign in|
| /users/facebook |null| POST |email,  password, username|201(Created), 500(Internal Server Error)|Facebook Sign in|

# Third Party API Routes
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /googleMaps |null| POST |start, end|201(Created), 500(Internal Server Error)|Get details of distance and time taken to reach|
| /geo |null| POST |ipAddress|200(Created), 500(Internal Server Error)|GEt location based on ip address|

# Review Route
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /review/:idAPIplace | POST |token|rating, review|201(Created),500(Internal Server Error) |Post Review
| /review/:idPlace| GET |null|null|201(OK),500(Internal Server Error) |get Id details (authenticated User)
| /review/:idReview | PUT|token|null|200(OK), 500(Internal Server Error)|update review
| /review/:idReview| DELETE |token|null|200(OK),500(Internal Server Error) |Edit to do  (authenticated and authorized)