# Certificate Generator

Certificate Generator is a web application designed to automate the process of generating and managing certificates for various courses. The application allows users to request certificates, which can then be approved and generated in PDF format. The generated certificates are stored on Google Drive and can be accessed via a link.

## Live Demo

Check out the live website : [Certificate Generator](https://certificate-generator1.netlify.app)

## Features

- **CRUD Operations**: Full create, read, update, and delete functionality for certificate generation management.
- **Certificate Request**: Users can request certificates by providing necessary details.
- **Certificate Approval**: Admins can approve or reject certificate requests.
- **PDF Generation**: Generate certificate PDFs with dynamic user data.
- **Google Drive Integration**: Store generated certificates on Google Drive.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](#) &nbsp;&nbsp; 
[![Redux](https://img.shields.io/badge/Redux-593D88?logo=redux&logoColor=white)](#) &nbsp;&nbsp; 
[![Node.js](https://img.shields.io/badge/Node%20js-339933?logo=nodedotjs&logoColor=white)](#) &nbsp;&nbsp; 
[![Express.js](https://img.shields.io/badge/Express%20js-000000?logo=express&logoColor=white)](#) &nbsp;&nbsp; 
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](#) &nbsp;&nbsp; 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](#) &nbsp;&nbsp; 
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E)](#) &nbsp;&nbsp; 
[![Axios](https://img.shields.io/badge/axios-671ddf?&logo=axios&logoColor=white)](#) &nbsp;&nbsp; 
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#) &nbsp;&nbsp; 
[![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)](#)

### Frontend

- **Vite**: Fast build tool for modern web projects.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router Dom**: Declarative routing for React applications.
- **SweetAlert2**: Stylish alerts and popups.
- **sweetalert2-react-content**: SweetAlert2 integration for React.

### Backend

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **Google APIs**: Node.js client library for using Google APIs.
- **Google Drive API**: Integration with Google Drive for storing PDFs.
- **PDF-Lib**: Library for creating and modifying PDF documents.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Mongoose

### Google Drive API Setup

To enable Google Drive integration, you need to set up Google Drive API credentials.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to **API & Services** > **Credentials**.
4. Click **Create Credentials** and select **Service Account**.
5. Follow the prompts to create a new service account and download the JSON key file.
6. Enable the Google Drive API for your project by navigating to **API & Services** > **Library** and searching for "Google Drive API", then enabling it.

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/certificate_generator.git
   cd certificate_generator/server

2. Install dependencies:
```npm install```
OR
```yarn```

3. Configure environment variables: Create a .env file in the server directory with the following variables:

   - MONGODB_URI=<your_mongodb_uri>
   - GOOGLE_CLIENT_EMAIL=<your_google_client_email>
   - GOOGLE_PRIVATE_KEY=<your_google_private_key>
   - GOOGLE_DRIVE_FOLDER_ID=<your_google_drive_folder_id>
   - CERTIFICATE_TEMPLATE_URL=<your_certificate_template_url>
   - PORT=<PORT_NO>

4. Start the server:
```npm start```
OR
```yarn start```

### Frontend Setup

1. Navigate to the client directory:
cd ../client

2. Install dependencies:
```npm install```
OR
```yarn```

3. Create a .env file in the client directory with the following variable(s):

   - BASE_URL=<your_base_url>

4. Start the development server:
```npm run dev```
OR
```yarn dev```

## API Endpoints

- GET `/api/certificates/all`: Get all approved certificates.

- GET `/api/certificates/requests`: Get all pending certificates.

- POST `/api/certificates/request`: Create a new certificate request.

- PUT `/api/certificates/create/:id`: Approve a certificate request and generate the certificate PDF, saving the PDF on Google Drive.

- DELETE `/api/certificates/reject/:id`: Reject a certificate request.

## Contribution Guidelines

Feel free to contribute to the Repo:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.
<br/><br/>

## Please Star⭐=>🌟 the Repo if you like the Code, UI, or anything about the Project
