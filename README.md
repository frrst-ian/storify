# Storify

A file storage web app. Upload, organize, and manage files through a clean interface.

**Live:** https://storify-m2ij.onrender.com

## Features

- Secure sign up / log in with encrypted passwords
- Upload files (multiple formats supported)
- Organize files into folders
- Rename, move, delete, download files
- Responsive across desktop and mobile

## Challenges

**Prisma ORM** was new to me. Getting the schema, relations, and migrations right took time, especially when integrating with auth and session management.

**Authentication** with Passport.js and Bcrypt required careful handling of session state and access control across routes.

## Future Plans

- Nested folders
- File sharing via links
- File preview for images and PDFs
- Search
- Bulk operations

## Installation

```bash
git clone https://github.com/frrst-ian/storify.git
cd storify
npm install
npx prisma generate
```

Create `.env`:

```
DATABASE_URL=
SECRET_SESSION=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

```bash
node app.js
```

App runs at `http://localhost:3000`.
