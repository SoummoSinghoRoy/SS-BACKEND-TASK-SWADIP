## *Movie Listing App API service Documentation*

### Introduction

Welcome to the API documentation for the Movie Listing App. This API allows you to manage movies and TV shows in the application. This provides access to a vast database of movies and tvshows.

> **Server listen URI(localhost)**: `"localhost:6060"`
> **Example of usage**: `"server-listen-uri/api-endpoint"`

### *Authentication Endpoints*

> **signup**

- **Endpoint: `"/api/auth/signup"`**  
- **Method:** POST
- **Description:** Creates a new user account.
- **Body parameters:**
  - **username** (string, required): The user name of the user.
  - **email** (string, required): The email address of the user.
  - **password** (string, required): The password for the user account and minimum length 6.
  - **confirmPassword** (string, required): The confirm password must be match with **`password`**.
  - **role** (string, required): define user role **admin** or **general**
- **Example request**

```
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "Admin"
}
```

- **Example response**

```
  {
    "Message": "User created successfully",
    "registered_user": {
      "username": "john",
      "email": "john@example.com",
      "password": "$2b$12$QRFJhBTkvN4XASGtIPAQge2i3xDyW1oYhKp9pBLMHHKoxKEZ1gujO",
      "role": "GENERAL",
      "_id": "6491f98db03d97143c6ed32f",
      ...
    }
  }
```

> **login**

- **Endpoint: `"/api/auth/login"`**  
- **Method:** POST
- **Description:** Login with user account. 
- **Body parameters:**
  - **email** (string, required): The email address of the user.
  - **password** (string, required): The valid password for the user account.
- **Example request**

```
{
  "email": "john@example.com",
  "password": "password123",
}
```

- **Example response**

```
{
  "Message": "Successfully logged in",
  "Auhtorization": true
}
```

> **logout**

- **Endpoint: `"/api/auth/logout"`**  
- **Method:** POST
- **Description:** Logout from api service or server. 
- **Example response**


```
{
  "Message": "Successfully logged out",
  "Auhtorization": false
}
```

### Request headers

**Authorization:** `Not required`

### *Movie Endpoints*

> **fetch-movies**

- **Endpoint: `"/api/movie/all?page=n&limit=n"`**  
- **Method:** GET
- **Description:** Fetch all movie.
- **Request headers:** No
- **Query parameters:**
  - **page**: 2.
  - **limit**: 10.
- **Example response**

```
{
  "movies": [
    {
      "_id": "6491e589fa39d8d8e7606d3c",
      "title": "Jurassic World",
      "actor": "Bryce Dallas Howard",
      "actress": "Chris Pratt",
      "director": "Colin Trevorrow",
      "producer": "Amanda Silver",
      "releaseDate": "2015-01-15T00:00:00.000Z",
      "duration": "1h 45m",
      "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
      "poster": "/uploads/poster-1687283081061-jurrasic-world.jpg",
      "__v": 0
    }
    more records...
  ],
  "totalMovies": 15,
  "itemsPerPage": 10,
  "currentPage": 1,
  "totalPages": 2
}
```

> **fetch-single-movie**

- **Endpoint: `"/api/movie/single/:movieId"`**  
- **Method:** GET
- **Description:** Fetch single movie by movie id.
- **Request headers:** No
- **Query parameters:**
  - **movieId**: `6492984ac5de9b9d2b17618f`
- **Example response**

```
{
  "movie": {
    "_id": "6492984ac5de9b9d2b17618f",
    "title": "Jurassic World 2",
    "actor": "Bryce Dallas Howard",
    "actress": "Chris Pratt",
    "director": "Colin Trevorrow",
    "producer": "Amanda Silver",
    "releaseDate": "2018-01-15T00:00:00.000Z",
    "duration": "2h 5m",
    "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
    "poster": "/uploads/poster-1687328842159-jurrasic-world.jpg",
    ...
  }
}
```

> **create-movie**

- **Endpoint: `"/api/movie/create"`**  
- **Method:** POST
- **Description:** Add new movie.
- **Request headers:** No 
- **Body parameters:**
  - **title** (string, required): Name of the movie.
  - **actor** (string, required): Name of the movie actor.
  - **actress** (string, required): Name of the movie actree.
  - **director** (string, required): Name of the movie director.
  - **producer** (string, required): Name of the movie producer.
  - **releaseDate** (string, required): Movie release date.
  - **duration** (string, required): Movie duration.
  - **detail** (string, required): Movie short detail.
  - **poster** (file, required): Movie poster/img.
- **Example request**

```
{
  "title": "Jurassic World",
  "actor": "Bryce Dallas Howard",
  "actress": "Chris Pratt",
  "director": "Colin Trevorrow",
  "producer": "Amanda Silver",
  "releaseDate": "2015-01-15",
  "duration": "105",
  "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
  "poster": poster.jpg
}
```

- **Example response**

```
{
  "Message": "Movie added successfully",
  "newMovie": {
    "title": "Jurassic World",
    "actor": "Bryce Dallas Howard",
    "actress": "Chris Pratt",
    "director": "Colin Trevorrow",
    "producer": "Amanda Silver",
    "releaseDate": "2015-01-15T00:00:00.000Z",
    "duration": "1h 45m",
    "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
    "poster": "/uploads/poster-1687328842159-poster.jpg",
    "_id": "6492984ac5de9b9d2b17618f",
    ...
  }
}
```

> **edit-movie**

- **Endpoint: `"/api/movie/edit/:movieId"`**  
- **Method:** PUT
- **Description:** Edit existing movie by movie id.
- **Request headers:** No
- **Query parameters:**
  - **movieId**: `6492984ac5de9b9d2b17618f`
- **Body parameters:**
  - **title** (string, required): Name of the movie.
  - **actor** (string, required): Name of the movie actor.
  - **actress** (string, required): Name of the movie actree.
  - **director** (string, required): Name of the movie director.
  - **producer** (string, required): Name of the movie producer.
  - **releaseDate** (string, required): Movie release date.
  - **duration** (string, required): Movie duration.
  - **detail** (string, required): Movie short detail.
- **Example request**

```
{
  "title": "Jurassic World 2",
  "actor": "Bryce Dallas Howard",
  "actress": "Chris Pratt",
  "director": "Colin Trevorrow",
  "producer": "Amanda Silver",
  "releaseDate": "2018-01-15",
  "duration": "125",
  "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree."
}
```

- **Example response**

```
{
  "msg": "Movie updated successfully",
  "updatedMovie": {
    "_id": "6492984ac5de9b9d2b17618f",
    "title": "Jurassic World 2",
    "actor": "Bryce Dallas Howard",
    "actress": "Chris Pratt",
    "director": "Colin Trevorrow",
    "producer": "Amanda Silver",
    "releaseDate": "2018-01-15T00:00:00.000Z",
    "duration": "2h 5m",
    "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
    "poster": "/uploads/poster-1687328842159-jurrasic-world.jpg",
    ...
  }
}
```

> **delete-movie**

- **Endpoint: `"/api/movie/delete/:movieId"`**  
- **Method:** DELETE
- **Description:** Delete existing movie by movie id.
- **Request headers:** No
- **Query parameters:**
  - **movieId**: `6492984ac5de9b9d2b17618f`
- **Example response**

```
{
  "Message": "Movie successfully deleted",
  "deletedMovie": {
    "_id": "6492984ac5de9b9d2b17618f",
    "title": "Jurassic World 2",
    "actor": "Bryce Dallas Howard",
    "actress": "Chris Pratt",
    "director": "Colin Trevorrow",
    "producer": "Amanda Silver",
    "releaseDate": "2018-01-15T00:00:00.000Z",
    "duration": "2h 5m",
    "detail": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.",
    "poster": "/uploads/poster-1687328842159-jurrasic-world.jpg",
    ...
  }
}
```

### *TvShow Endpoints*

> **fetch-tvshows**

- **Endpoint: `"/api/movietvShows/all?page=n&limit=n"`**  
- **Method:** GET
- **Description:** Fetch all tvshow.
- **Request headers:** No
- **Query parameters:**
  - **page**: 2.
  - **limit**: 10.
- **Example response**

```
{
  "tvShows": [
    {
      "_id": "64929fb8d69ea780fd0fae41",
      "title": "Breaking Bad",
      "actor": "Bryan Cranston",
      "actress": "Anna Gunn",
      "director": "Vince Gilligan",
      "producer": "Vince Gilligan",
      "releaseDate": "2008-02-13T00:00:00.000Z",
      "duration": "0h 45m",
      "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
      "poster": "/uploads/poster-1687330744020-breaking-bad.jpg",
      "__v": 0
    }
    more records...
  ],
  "totalTvShows": 15,
  "itemsPerPage": 10,
  "currentPage": 1,
  "totalPages": 2
}
```

> **fetch-single-tvshow**

- **Endpoint: `"/api/tvShows/single/:showId"`**  
- **Method:** GET
- **Description:** Fetch single tvshow by show id.
- **Request headers:** No
- **Query parameters:**
  - **showId**: `64929fb8d69ea780fd0fae41`
- **Example response**

```
{
  "show": {
    "_id": "64929fb8d69ea780fd0fae41",
    "title": "Breaking Bad",
    "actor": "Bryan Cranston",
    "actress": "Anna Gunn",
    "director": "Vince Gilligan",
    "producer": "Vince Gilligan",
    "releaseDate": "2008-02-13T00:00:00.000Z",
    "duration": "0h 45m",
    "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    "poster": "/uploads/poster-1687330744020-breaking-bad.jpg",
    ...
  }
}
```

> **create-tvshow**

- **Endpoint: `"/api/tvShows/create"`**  
- **Method:** POST
- **Description:** Add new tvshow.
- **Request headers:** No 
- **Body parameters:**
  - **title** (string, required): Name of the tvshow.
  - **actor** (string, required): Name of the tvshow actor.
  - **actress** (string, required): Name of the tvshow actree.
  - **director** (string, required): Name of the tvshow director.
  - **producer** (string, required): Name of the tvshow producer.
  - **releaseDate** (string, required): tvshow release date.
  - **duration** (string, required): tvshow duration.
  - **detail** (string, required): tvshow short detail.
  - **poster** (file, required): tvshow poster/img.
- **Example request**

```
{
  "title": "Breaking Bad",
  "actor": "Bryan Cranston",
  "actress": "Anna Gunn",
  "director": "Vince Gilligan",
  "producer": "Vince Gilligan",
  "releaseDate": "2008-02-13",
  "duration": "45",
  "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
  "poster": "/uploads/poster-1687330744020-poster.jpg"
}
```

- **Example response**

```
{
  "Message": "Show added successfully",
  "newTvShows": {
    "title": "Breaking Bad",
    "actor": "Bryan Cranston",
    "actress": "Anna Gunn",
    "director": "Vince Gilligan",
    "producer": "Vince Gilligan",
    "releaseDate": "2008-02-13T00:00:00.000Z",
    "duration": "0h 45m",
    "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    "poster": "/uploads/poster-1687330744020-breaking-bad.jpg",
    "_id": "64929fb8d69ea780fd0fae41",
    ...
  }
}
```

> **edit-movie**

- **Endpoint: `"/api/tvShows/edit/:showId"`**  
- **Method:** PUT
- **Description:** Edit existing tvshow by show id.
- **Request headers:** No
- **Query parameters:**
  - **showId**: `64929fb8d69ea780fd0fae41`
- **Body parameters:**
  - **title** (string, required): Name of the tvshow.
  - **actor** (string, required): Name of the tvshow actor.
  - **actress** (string, required): Name of the tvshow actree.
  - **director** (string, required): Name of the tvshow director.
  - **producer** (string, required): Name of the tvshow producer.
  - **releaseDate** (string, required): tvshow release date.
  - **duration** (string, required): tvshow duration.
  - **detail** (string, required): tvshow short detail.
- **Example request**

```
{
  "title": "Breaking Bad",
  "actor": "Bryan Cranston",
  "actress": "Anna Gunn",
  "director": "Vince Gilligan",
  "producer": "Vince Gilligan",
  "releaseDate": "2008-03-18",
  "duration": "120",
  "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future."
}
```

- **Example response**

```
{
  "msg": "Show updated successfully",
  "updatedShow": {
    "_id": "64929fb8d69ea780fd0fae41",
    "title": "Breaking Bad",
    "actor": "Bryan Cranston",
    "actress": "Anna Gunn",
    "director": "Vince Gilliga",
    "producer": "Vince Gilliga",
    "releaseDate": "2008-03-18T00:00:00.000Z",
    "duration": "2h 0m",
    "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    "poster": "/uploads/poster-1687330744020-breaking-bad.jpg",
    ...
  }
}
```

> **delete-show**

- **Endpoint: `"/api/tvShows/delete/:showId"`**  
- **Method:** DELETE
- **Description:** Delete existing tvshow bt show id.
- **Request headers:** No
- **Query parameters:**
  - **showId**: `64929fb8d69ea780fd0fae41`
- **Example response**

```
{
  "Message": "Show successfully deleted",
  "deletedShow": {
    "_id": "64929fb8d69ea780fd0fae41",
    "title": "Breaking Bad",
    "actor": "Bryan Cranston",
    "actress": "Anna Gunn",
    "director": "Vince Gilliga",
    "producer": "Vince Gilliga",
    "releaseDate": "2008-03-18T00:00:00.000Z",
    "duration": "2h 0m",
    "detail": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    "poster": "/uploads/poster-1687330744020-breaking-bad.jpg",
    ...
  }
}
```

## *Summary:*

The Movie Listing App API allows users to manage movies and TV shows. It supports authentication, CRUD operations for movies and TV shows, and pagination.


*`&copy; 2023 Swadip Singho Roy Soummo. All rights reserved.`*