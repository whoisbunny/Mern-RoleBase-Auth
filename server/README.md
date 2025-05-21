# Role-Based Auth API Documentation

## Live Demo

- **Backend (API):** [https://rolebase-auth.onrender.com](https://rolebase-auth.onrender.com)
- **Frontend (Client):** [https://wib-email-auth.vercel.app](https://wib-email-auth.vercel.app)

You can see the project live using the above URLs.

## Environment Variables (from `.env`)

```
PORT=4000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
TOKEN_EXPIRY=2d
CLIENT=https://wib-email-auth.vercel.app
BACKEND_URL=https://rolebase-auth.onrender.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## API Endpoints

### 1. Register User
- **URL:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "yourpassword",
    "role": "customer" // or "admin"
  }
  ```
- **Response:**
  - `201 Created` (on success):
    ```json
    {
      "message": "Verification Email has been sent to your email, Please verify your email."
    }
    ```
  - `400/409` (on error):
    ```json
    { "message": "Error message" }
    ```

### 2. Verify Email
- **URL:** `GET /api/auth/verify-email?token=...`
- **Request Query:**
  - `token`: JWT token sent via email
- **Response:**
  - Redirects to client with email as query param
  - Or JSON error message

### 3. Admin Login
- **URL:** `POST /api/auth/admin-login`
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK` (on success):
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token",
      "user": {
        "id": "...",
        "firstName": "...",
        "lastName": "...",
        "email": "...",
        "role": "admin"
      }
    }
    ```
  - `400/401/403` (on error):
    ```json
    { "message": "Error message" }
    ```

### 4. Customer Login
- **URL:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "customer@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK` (on success):
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token",
      "user": {
        "id": "...",
        "firstName": "...",
        "lastName": "...",
        "email": "...",
        "role": "customer"
      }
    }
    ```
  - `400/401/403` (on error):
    ```json
    { "message": "Error message" }
    ```

### 5. Get Profile
- **URL:** `GET /api/auth/profile`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` (on success):
    ```json
    {
      "message": "User profile",
      "user": {
        "id": "...",
        "firstName": "...",
        "lastName": "...",
        "email": "...",
        "role": "..."
      }
    }
    ```
  - `404/500` (on error):
    ```json
    { "message": "Error message" }
    ```

---

## Notes
- All endpoints return JSON responses.
- Registration requires email verification before login.
- Use the token from login responses for authenticated requests (e.g., profile).
- Environment variables must be set for email and JWT functionality.
