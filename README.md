# Express MongoDB API

An API built with Express.js and MongoDB for managing posts and comments with user authentication.

## Project Overview

This project is a social media-like backend API that allows users to:
- Register and authenticate
- Create, read, update, and delete posts
- Comment on posts
- Upload images with posts

## Prerequisites

- Node.js
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/antoinebtn/esgi-express-mongodb-groupe-1
   cd esgi-express-mongodb-groupe-1
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret_key
   ```
   Note: Replace `your_jwt_secret_key` with a secure random string for JWT token generation.

## Database Setup

### Local MongoDB

1. Make sure MongoDB is installed and running on your system
2. The application will automatically create the required database and collections

## Running the Application

Start the server:
```
node server.js
```

The server will run on port 3000 by default. You can access the API at `http://localhost:3000`.