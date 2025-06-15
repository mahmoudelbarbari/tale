# 📝 Tale - A Place to wirte you story
![image](https://github.com/user-attachments/assets/2c3437db-f1f0-44a9-b624-d266b12a7b99)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge&logo=vercel)](https://tale-nine.vercel.app/)


A full-featured blogging application built with **React** and **Firebase**, allowing users to create, read, update, and delete their own blog posts. It also includes user authentication and a seamless light/dark mode toggle for a modern user experience.

## 🚀 Features

- ✍️ **Create Blog Posts**: Users can add blogs with a title, description, and image.
- 🔐 **Authentication**: Secure login and signup using Firebase Authentication.
- ✏️ **Edit & Delete**: Only the author of a blog can edit or delete their own posts.
- 🌗 **Light/Dark Mode**: Toggle between light and dark themes to suit your preference.
- 🔒 **Authorization Rules**: Users cannot access or modify content created by others.

## 🛠️ Tech Stack

- **Frontend**: React (with Hooks)
- **Backend**: Firebase (Firestore + Firebase Auth + Storage)
- **Styling**: Material UI
- **Routing**: React Router

## 📁 Project Structure

```bash
src/
│
├── assets/           # Images   (Logo, Hero)
├── components/       # Reusable components (Navbar, Dialogs, Footer,etc.)
├── pages/            # Pages (Home)
├── firebase/         # Firebase configuration
├── utils/            # Helper functions
└── App.js            # Main app component
```
## 🔐 Firebase Rules (Example)
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```
## 💡 Getting Started
1. Clone the repository
```bash
git clone https://github.com/mahmoudelbarbari/tale.git
cd tale
```
2. Install dependencies
```bash
npm install
```
3. Setup Firebase
 -Create a Firebase project.

 -Enable Email/Password Authentication.

 -Create a Firestore database and Firebase Storage.

 -Add your Firebase config to the firebase/firebaseConfig.js file.
 ```bash
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```
4. Start the app
```bash
npm run dev
```
## 🌍 Deployment
This app is deployed on Vercel. You can deploy your own copy easily:

  - Push your project to GitHub.

  - Go to vercel.com, sign in with GitHub.

  - Import your repo and configure the build settings (npm run build).

  - Set Firebase environment variables if needed.

## 🙌 Contributing
  - Contributions are welcome! Feel free to fork the project and open a pull request with your improvements.

📃 License
  - This project is licensed under the MIT License.
