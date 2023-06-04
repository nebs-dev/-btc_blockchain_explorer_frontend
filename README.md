# Frontend Btc Block Explorer

This is the frontend component of the Btc Block Explorer project. It provides a user interface for interacting with cryptocurrency data.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Vite: A fast and lightweight development server and build tool for modern web applications.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript for better tooling and maintainability.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- React Router: A library for routing in React applications.
- Axios: A popular library for making HTTP requests.
- Recoil: A state management library for managing application state.
- Socket.io-client: A library for real-time communication between the client and the server.

## Prerequisites

Before running the frontend application, ensure you have the following installed on your system:

- Node.js (version 14 or later)

## Backend

The frontend app requires the backend component of the Btc Block Explorer (https://github.com/nebs-dev/btc_blockchain_explorer_backend) project to be running in order to fetch and interact with cryptocurrency data. Make sure to set up and start the backend before running the frontend.

## Getting Started

To get started with the frontend app, follow these steps:

1. Clone this repository to your local machine:

```bash
   git clone btc_blockchain_explorer_frontend
```

2. Navigate to the project directory:

```bash
   cd frontend-crypto-app
```

3. Install the dependencies:

```bash
   npm install
```

4. Configure the environment variables:

Create a new .env file based on the provided .env.example.
Update the environment variables in the .env file according to your configuration.

5. Start the development server:

```bash
   npm run dev
```

6. The frontend app should now be running on `http://localhost:5173/`.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready app.
- `npm run lint`: Runs the linter to check for code style and formatting issues.
- `npm run preview`: Serves the production build for previewing locally.

#

Feel free to explore and modify the code to fit your project requirements.
Remember to start the backend server separately to enable full functionality of the frontend app.
