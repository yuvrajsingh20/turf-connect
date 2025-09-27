# Turf Connect

## Overview
Turf Connect is a web application that provides authentication functionality for users, allowing them to log in or register. The application uses MongoDB to store user information securely.

## Project Structure
```
turf-connect
├── app
│   ├── auth
│   │   └── page.tsx
│   └── dashboard
│       └── page.tsx
├── components
│   └── header.tsx
├── lib
│   └── mongodb.ts
├── models
│   └── User.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features
- User authentication (login and registration)
- Google authentication integration
- User dashboard for authenticated users
- MongoDB database connection for storing user data

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd turf-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`.

## Usage Guidelines
- Users can register by providing their email and password.
- Existing users can log in using their credentials.
- After successful authentication, users will be redirected to their dashboard.

## Additional Information
- The application is built using Next.js and React.
- MongoDB is used for data storage, with Mongoose as the ODM.
- Ensure that your MongoDB server is running and accessible.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.