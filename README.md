# **_Motivate The Mind API_**

**Check-Out the API at:**
[Motivate The Mind API]().

For access to the API repo of Coeus System Inc. click on [Motivate The Mind API](https://github.com/tchang46343/mind-game-api.git).

## Motivate The Mind API Summary:

As a result, the benefit of using Motivate The Mind API is to provide database management system. As an added benefit the application data exists in the cloud, which in turn lets the customers have complete visibility to their account information. The API hosting platform is all done through Heroku. Heroku is the key to the data base for production.

## API Methods:

- **Returns json data about all the game slide card available.**

`/gameslides`

- **Methods:**

`GET`

## URL Params:

- **Required:**
  `id=[integer]`

- **Data Params:**
  `None`

- **Sucess Response:**
  - Code:200
  - Content: `{"id": 1, "word": "Alleviation: The contemplation of your own thoughts and desires and conduct.", "quote": "Jus do it! -Phil Night", "imageurl": "https://www.dropbox.com/home/Relaxing%20Images?preview=Snow.jpg"}`
- **Error Response:**

  - Code:404 Not Found
  - Content: `{ error : "Game Slides doesn't exist" }`

- **Sample Call for all game slides:**

  `gameslideRouter.route("/")`
  `.get((req, res, next) => { const knexInstance = req.app.get("db"); GameSlides.getAllSlides(knexInstance)`
  `.then(slides => { res.json(slides); })`
  `.catch(next); });`

- **Sample Call for a single game slides:**

  `gameslideRouter.route("/gameslides/:gameslide_id")`
  `.get((req, res, next) => { const knexInstance = req.app.get("db"); GameSlides.getById(knexInstance, req.params.gameslide_id)`
  `.then(slides => { if (!slides) { return res.status(404).json({ error: { message:Game slide not found.} }); } res.json(slideparams(slides)); })`
  `catch(next); });`

- **User can also create new account via POST to the Database.**

`/users`

- **Method:**

`POST`

## URL Params:

- **Required:**
  `firstname: [First Name],`
  `lastname: [Last Name],`
  `email: [Email Address],`
  `password: [Password]`

* **Data Params:**
  Application/JSON Format

* **Sucess Response:**

  - Code:200
  - Content: `{"id": 1, "firstname": "Terrance", "lastname": "Chang", "email": "tchang@gmail.com", "password": "Admin123"}`

* **Error Response:**
  - Code:404 Not Found
  - Content: `Missing required parameters in the request body`

- **Users can also sign in to their account via POST to the Database.**

`/login`

- **Method:**

`POST`

## URL Params:

- **Required:**
  `email: [Email Address],`
  `password: [Password]`

* **Data Params:**
  Application/JSON Format

* **Sucess Response:**

  - Code:200
  - Content: `You have sucessfully login!`

- **Error Response:**
  - Code:404 Not Found
  - Content: `Error message option 1: Email does not exist`
    `Error message option 2: Please try to enter password again`

## Technology Languages Used:

- POSTGRESQL
- Javascript
- NODE
- MIDDLEWARE FRAMEWORKS: (EXPRESS, MORGAN, MOCHA, CHAI)
- Postgrator
