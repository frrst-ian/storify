# Storify

## Table of Contents

1. [Description](#description)
1. [Demo](#demo)
1. [Design](#design)
1. [Features](#features)
1. [Technologies Used](#technologies-used)
1. [Project Challenges](#project-challenges)
1. [Thoughts and Observations](#thoughts-and-observations)
1. [Future Enhancements](#future-enhancements)
1. [Installation](#installation)

## Description

Storify is a comprehensive file management application designed to simplify the process of organizing and managing digital files. This web-based platform allows users to upload, store, and perform complete CRUD (Create, Read, Update, Delete) operations on their files and folders through an intuitive interface. Built with modern web technologies, Storify provides a secure and efficient solution for personal file storage and organization.

## Demo

Experience the live application: [https://storify-ymie.onrender.com/](https://storify-ymie.onrender.com/)

## Design

<div align='center'>
<img src='./path/to/your/desktop.png' alt='Screenshot of desktop design - Main dashboard view'>
<img src='../path/to/your/mobile.png' alt='Screenshot of mobile design - Responsive interface'>
</div>

*The application features a clean, responsive design that adapts seamlessly across desktop and mobile devices, ensuring optimal user experience regardless of screen size.*

## Features

- **User Authentication**: Secure account creation and login system with password encryption
- **File Upload**: Support for multiple file formats
- **Folder Management**: Create and organize folders to maintain file structure
- **CRUD Operations**: Complete file and folder management (Create, Read, Update, Delete)
- **File Download**: One-click download functionality for individual files
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **Secure Storage**: Protected file storage with user-based access control

## Technologies Used

**Frontend:**
- **EJS (Embedded JavaScript Templates)**: Server-side templating engine for dynamic HTML generation
- **CSS3**: Modern styling with responsive design principles

**Backend:**
- **Node.js**: JavaScript runtime environment for server-side development
- **Express.js**: Fast, unopinionated web framework for Node.js
- **PostgreSQL**: Robust, open-source relational database system
- **Bcrypt**: Password hashing library for enhanced security
- **Prisma ORM**: Next-generation database toolkit and ORM for seamless database operations

**Deployment & Hosting:**
- **Render**: Cloud platform for hosting web applications and databases

## Project Challenges

During the development process, I encountered several significant challenges that contributed to my growth as a developer:

**Database Integration**: Working with Prisma ORM for the first time presented a steep learning curve, particularly when creating complex data models and establishing relationships between entities. Understanding the schema definition syntax and migration processes required considerable research and experimentation.

**Authentication Implementation**: Integrating user authentication with Prisma controllers proved challenging, especially ensuring secure password hashing with Bcrypt and maintaining proper session management throughout the application.

**File Management Logic**: Implementing robust file upload, storage, and retrieval systems while maintaining data integrity and preventing unauthorized access required careful planning and multiple iterations.

## Thoughts and Observations

Throughout this project's development, I've experienced significant professional growth and technical advancement:

**Enhanced Planning Skills**: This project taught me the importance of thorough planning and architectural design before diving into implementation. I learned to create detailed wireframes and database schemas, which significantly streamlined the development process.

**Node.js Mastery**: My proficiency in Node.js has substantially improved, particularly in areas such as middleware implementation, error handling, and asynchronous programming patterns.

**Database Management**: Working with Prisma ORM was initially challenging but ultimately rewarding. The automated migration system and type-safe database access significantly accelerated development once I mastered the fundamentals.

**Full-Stack Integration**: This project provided valuable experience in connecting frontend and backend components, managing state between client and server, and implementing secure data flow throughout the application.

## Future Enhancements

**Planned Features:**
- **Nested Folder Structure**: Implement the ability to create folders within folders for better organization
- **Enhanced UI/UX Design**: Modernize the interface with improved visual design and user experience elements
- **File Sharing**: Add functionality to share files with other users via secure links
- **Search Functionality**: Implement search capabilities to quickly locate files and folders
- **File Preview**: Add preview functionality for common file types (images, PDFs, documents)
- **Bulk Operations**: Enable multiple file selection for batch operations
- **File Versioning**: Track and manage different versions of uploaded files
- **Storage Analytics**: Provide users with insights into their storage usage and file statistics

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/frrst-ian/storify.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd storify
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   SESSION_SECRET="your_session_secret_key"
   ```

5. **Database Setup:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Build the project:**
   ```bash
   npm run build
   ```

7. **Start the development server:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` (or your configured port).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for bugs and feature requests.

## License

This project is open source and available under the [Apache License](LICENSE).