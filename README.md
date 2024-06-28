# User Profile Management System

## Project Overview

This project is a User Profile Management System divided into two main parts:
- User Profile Management: Manage user profiles with basic CRUD operations.
- Data Table: Display and process a large set of data efficiently.

## Features

- User Profile CRUD operations
- Pagination and filtering for large data sets
- Responsive design with Tailwind CSS
- Real-time updates using React Query (TanStack Query)

## Prerequisites

- Node.js (v14.x or later)
- MongoDB

## Getting Started

Follow these instructions to set up and run the project locally.

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/soycaringal/user-profile-management.git
    cd user-profile-management/backend
    ```

2. **Install backend dependencies**:
    ```bash
    npm install
    ```

3. **Copy the environment variables file**:
    ```bash
    cp .env.example .env
    ```

4. **Configure the environment variables**:
    - Open the `.env` file and set the following variables:
      ```env
      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/userProfileDB
      ```

5. **Run database migrations**:
    ```bash
    npx migrate-mongo up
    ```

6. **Build the backend server**:
    ```bash
    npm run build
    ```

7. **Run the backend server**:
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Copy the environment variables file**:
    ```bash
    cp .env.example .env
    ```

4. **Configure the environment variables**:
    - Open the `.env` file and set the following variable:
      ```env
      REACT_APP_API_URL=http://localhost:3000/api
      ```

5. **Run the frontend application**:
    ```bash
    npm start
    ```

## Running the Application

- The backend server will be running on `http://localhost:3000`.
- The frontend application will be running on `http://localhost:3001` (or another port if specified).
