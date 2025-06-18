# TaskFlow - A Next.js Task Management App

TaskFlow is a modern web application built with Next.js and Firebase that allows users to manage their tasks efficiently. It features user authentication, real-time task updates with Firestore, and a clean, responsive interface.

## Core Features

- **Firebase Authentication**: Secure login and registration using email and password.
- **Firestore Integration**: Tasks are stored and managed in Firestore, associated with authenticated users.
- **CRUD Operations**: Users can add, list, update (status), and delete tasks.
- **Real-time Updates**: Task list updates in real-time when changes occur.
- **User Profile**: View user information and logout.
- **Responsive Design**: Clean, card-based layout that works on various screen sizes.
- **Modern UI**: Styled with Tailwind CSS and ShadCN UI components, featuring a custom color theme.

## Tech Stack

- Next.js (App Router, Server Components, TypeScript)
- Firebase (Authentication, Firestore SDK v9+)
- Tailwind CSS
- ShadCN UI
- React Hook Form & Zod (for form validation)
- Lucide React (for icons)
- date-fns (for date formatting)

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

## Firebase Setup

Before running the application, you need to set up a Firebase project:

1.  **Create a Firebase Project**:
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Click on "Add project" and follow the instructions.

2.  **Add a Web App to Your Project**:
    *   In your Firebase project dashboard, click the Web icon (`</>`) to add a new web app.
    *   Register your app (you can name it "TaskFlow" or similar).
    *   Firebase will provide you with a `firebaseConfig` object. Copy these values.

3.  **Enable Firebase Authentication**:
    *   In the Firebase console, go to "Authentication" (under Build).
    *   Click "Get started".
    *   Under "Sign-in method", enable "Email/Password".

4.  **Set up Firestore Database**:
    *   In the Firebase console, go to "Firestore Database" (under Build).
    *   Click "Create database".
    *   Start in **test mode** for easy setup (you can configure security rules later for production).
    *   Choose a Firestore location closest to your users.

5.  **Configure Environment Variables**:
    *   In the root directory of this project, create a file named `.env.local`.
    *   Add your Firebase configuration keys to this file, like so:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

    Replace `your_api_key`, `your_auth_domain`, etc., with the actual values from your Firebase project's web app configuration.

## Getting Started

1.  **Clone the repository (if applicable) or ensure you have the project files.**

2.  **Install dependencies**:
    Open your terminal, navigate to the project directory, and run:
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

    The application should now be running at [http://localhost:9002](http://localhost:9002) (or another port if 9002 is in use - check your terminal output).

## Project Structure

-   `src/app/`: Next.js App Router pages and layouts.
    -   `(app)/`: Group for authenticated routes (dashboard, add task, profile).
    -   `login/`: Login page.
    -   `register/`: Registration page.
-   `src/components/`: Reusable React components.
    -   `auth/`: Authentication-related components (login/register forms, AuthGuard).
    -   `layout/`: Layout components like Navbar.
    -   `tasks/`: Task-related components (task list, item, add form).
    -   `ui/`: ShadCN UI components.
-   `src/context/`: React Context providers (e.g., `AuthContext`).
-   `src/firebase/`: Firebase configuration and service functions.
    -   `config.ts`: Firebase app initialization.
    -   `firestore.ts`: Firestore CRUD operations for tasks.
-   `src/hooks/`: Custom React hooks.
-   `src/lib/`: Utility functions and type definitions.
    -   `types.ts`: TypeScript type definitions.
    -   `utils.ts`: General utility functions.

## Building for Production

To build the application for production, run:
```bash
npm run build
```
Then, to start the production server:
```bash
npm run start
```
