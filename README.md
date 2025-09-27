# Self-Advocate Web Application

A full-stack web application designed to empower users in self-advocacy by providing a platform to securely register, log in, and upload case files. The application is built with Node.js on the backend and is integrated with AWS for database and storage solutions.

## Features

- **User Authentication**: Provides secure user registration and login functionality.
- **File Upload to Cloud**: Users can upload image, audio, and video files, which are stored directly in an AWS S3 bucket.
- **Dynamic Content Display**: Uploaded media is dynamically rendered on the frontend for user viewing after a successful upload.
- **Responsive Design**: The user interface is styled with Tailwind CSS, ensuring a responsive experience across devices.

## Tech Stack

- **Backend**: Node.js, Express.js.
- **Frontend**: HTML, JavaScript, Tailwind CSS.
- **Database**: MySQL (hosted on AWS RDS).
- **Cloud Infrastructure**: AWS S3 (for object storage).
- **Deployment**: Nginx (configured as a reverse proxy).
- **Key Dependencies**: `aws-sdk`, `multer`, `mysql2`, `cors`, `body-parser`.

## Getting Started

### Prerequisites

- Node.js
- An active AWS account with a configured S3 bucket and RDS MySQL instance.

### Installation

1.  Clone the repository to your local machine.
2.  Navigate into the project directory.
3.  Install the necessary dependencies using npm:
    ```bash
    npm install
    ```
4.  Update the database and AWS S3 configuration details within `server.js` with your credentials:
    -   MySQL connection details (host, user, password, database).
    -   AWS S3 bucket name.
5.  Start the application:
    ```bash
    npm start
    ```
    The server will start and listen on port 3000.

## API Endpoints

The application exposes the following RESTful API endpoints:

-   `POST /signup`: Registers a new user. Requires `fullName`, `mobileNumber`, `email`, and `password` in the request body.
-   `POST /login`: Authenticates an existing user. Requires `email` and `password` in the request body.
-   `POST /upload`: Handles file uploads. Accepts a `multipart/form-data` request with a single file under the `file` key.
