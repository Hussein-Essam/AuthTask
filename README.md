# Auth App

## Overview

This project consists of a **NestJS** backend and a **React** frontend that work together to provide authentication features. Users can sign up and sign in using the provided API endpoints.

## Technologies Used

- **Backend**: NestJS, Mongoose, Mongodb, JWT
- **Frontend**: React, Axios, React Router

## Installation

### Backend (NestJS)

1. Navigate to the backend directory:
   ```sh
   cd api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables by creating a `.env` file:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```
4. Start the NestJS server:
   ```sh
   npm run start:dev
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables by creating a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```
4. Start the React application:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication Endpoints

#### Signup

- **Endpoint:** `POST /api/auth/signup`

#### Signin

- **Endpoint:** `POST /api/auth/signin`

## Folder Structure

```
project-root/
│── backend/            # NestJS API
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│── frontend/           # React App
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│── README.md
```

## Notes

- Ensure your backend is running on **port 3000** (default NestJS port) and your frontend on **port 3001** (or another available port).
- Protect sensitive information using `.env` files.

## License

This project is licensed under the MIT License.
