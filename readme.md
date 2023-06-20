## Movie Listing App API Documentation

### Introduction

Welcome to the API documentation for the Movie Listing App. This API allows you to manage movies and TV shows in the application.

### Authentication Endpoints

> **signup**

- **Endpoint: `/api/auth/signup`**  
- **Method:** POST
- **Description:** Creates a new user account.
- **Parameters:**
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
    "Message": "User created successfull",
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