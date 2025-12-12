# 🎬 Netflix GPT - AI-Powered Streaming Platform

A modern, feature-rich Netflix clone built with React, enhanced with AI-powered movie recommendations. Experience seamless streaming with intelligent content discovery powered by TMDB API and Firebase authentication.

![Netflix GPT](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.1.0-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux-9.2.0-764ABC?style=for-the-badge&logo=redux)

## ✨ Features

### 🔐 Authentication & User Management

- **Secure Sign Up/Sign In** with Firebase Authentication
- Email validation and password management
- Protected routes for authenticated users
- Persistent user sessions
- Seamless onboarding experience with email pre-fill

### 🎥 Content Discovery

- **Browse Movies & TV Shows** - Extensive collection from TMDB
- **Categories Include:**
  - Now Playing Movies
  - Popular Movies
  - Top Rated Movies
  - Upcoming Releases
  - TV Shows by Genre
  - Trending Content

### 🤖 AI-Powered Features

- **Intelligent Movie Recommendations** - AI Chat Assistant
- Natural language queries for content discovery
- Genre-based suggestions
- Personalized recommendations based on preferences

### 💎 Premium User Experience

- **My List** - Save your favorite content
- **New & Popular** - Stay updated with trending content
- **Browse by Languages** - Multi-language content support
- **Advanced Search** - Find exactly what you're looking for
- **Preview Modal** - Quick content overview with trailers
- **Responsive Design** - Optimized for all devices

### 🎨 UI/UX Highlights

- Netflix-inspired dark theme
- Smooth animations and transitions
- Dynamic hero sections with video backgrounds
- Horizontal scrollable content carousels
- Professional card layouts
- Interactive search functionality

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM 7.7.1** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS 4.1.11** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Icons** - Additional icon library

### Backend & Services

- **Firebase** - Authentication & Cloud Services
  - Firebase Auth for user management
  - Firestore for data storage (optional)
- **TMDB API** - Movie and TV show data
- **RESTful APIs** - External content integration

### Development Tools

- **ESLint** - Code quality and consistency
- **Vite** - Fast HMR (Hot Module Replacement)
- **Firebase Tools** - Deployment and hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- TMDB API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/NikhilGirsa/Netflix-GPT.git
cd Netflix-GPT
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Copy your Firebase configuration
   - Update `src/Utils/Firebase.jsx` with your credentials

4. **Set up TMDB API**

   - Get your API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Update `src/Utils/tmdbConfig.jsx` with your API key and access token

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📁 Project Structure

```
Netflix-GPT/
├── public/                    # Static assets
├── src/
│   ├── Components/           # React components
│   │   ├── Body.jsx         # Router configuration
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Browse.jsx       # Main browse page
│   │   ├── Login.jsx        # Authentication page
│   │   ├── SignUp.jsx       # Sign up component
│   │   ├── SignIn.jsx       # Sign in component
│   │   ├── Register.jsx     # Registration form
│   │   ├── Movies.jsx       # Movies page
│   │   ├── TVShows.jsx      # TV shows page
│   │   ├── AIChat.jsx       # AI chat interface
│   │   ├── MyList.jsx       # User's saved content
│   │   ├── MainContainer.jsx   # Hero section
│   │   ├── SecondaryContainer.jsx  # Content rows
│   │   ├── MovieCard.jsx    # Movie card component
│   │   ├── PreviewModal.jsx # Content preview
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useMovies.jsx   # Movie data hooks
│   │   └── useTVShows.jsx  # TV show hooks
│   ├── Utils/              # Utilities and config
│   │   ├── Firebase.jsx    # Firebase configuration
│   │   ├── tmdbConfig.jsx  # TMDB API config
│   │   ├── appStore.jsx    # Redux store
│   │   ├── userSlice.jsx   # User state
│   │   ├── movieSlice.jsx  # Movie state
│   │   ├── tvSlice.jsx     # TV show state
│   │   ├── myListSlice.jsx # My List state
│   │   └── Constants.jsx   # App constants
│   ├── assets/            # Images and media
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies
├── vite.config.js       # Vite configuration
├── firebase.json        # Firebase config
└── README.md           # This file
```

## 🎯 Key Features Explained

### Authentication Flow

1. Users land on the home page with sign-up prompt
2. Enter email and click "Get Started"
3. Redirected to registration page with pre-filled email
4. Complete registration with password
5. Automatically logged in and redirected to browse page

### State Management

- **Redux Toolkit** manages global state
- Separate slices for users, movies, TV shows, and user lists
- Persistent authentication state with Firebase

### Content Loading

- Custom hooks fetch data from TMDB API
- Lazy loading for optimal performance
- Caching strategy to minimize API calls

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Firebase commands
npm run firebase
```

## 🔒 Environment Variables

Create a `.env` file in the root directory (Note: Currently hardcoded in config files):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_TMDB_API_KEY=your_tmdb_key
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token
```

## 🌟 Future Enhancements

- [ ] Enhanced AI recommendations with machine learning
- [ ] Multi-profile support
- [ ] Download functionality
- [ ] Watch history tracking
- [ ] Parental controls
- [ ] Social features (share, rate, review)
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode
- [ ] Multi-language UI

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes. All movie and TV show data provided by [TMDB](https://www.themoviedb.org/).

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie database API
- [Firebase](https://firebase.google.com/) for authentication and backend services
- [Netflix](https://www.netflix.com/) for design inspiration
- [React](https://react.dev/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Nikhil Girsa - [@NikhilGirsa](https://github.com/NikhilGirsa)

Project Link: [https://github.com/NikhilGirsa/Netflix-GPT](https://github.com/NikhilGirsa/Netflix-GPT)

---

⭐ Star this repo if you found it helpful!
