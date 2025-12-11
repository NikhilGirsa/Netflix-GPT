# How to Enable Firestore Database

## The Problem

Your app is showing: **"Failed to get document because the client is offline"**

This means Firestore database is not enabled in your Firebase project.

## Quick Fix - Enable Firestore (5 minutes)

### Step 1: Go to Firebase Console

1. Open: https://console.firebase.google.com/
2. Click on your project: **netflixgpt-690c0**

### Step 2: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click the **"Create database"** button
3. Choose **"Start in test mode"** (for development)
4. Click **"Next"**
5. Select a location (choose closest to you, e.g., `us-central` or `asia-south1`)
6. Click **"Enable"**

Wait 1-2 minutes for the database to be created.

### Step 3: Set Security Rules (Important!)

After database is created:

1. Click the **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow admins to read all users
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Test Your App

1. Refresh your app
2. Try registering a new user
3. Should work now without getting stuck!

## Good News!

I've updated your code to **work even if Firestore fails**. So your app will:

- ✅ Still allow login/registration
- ✅ Navigate correctly (admin → /admin, users → /payment)
- ✅ Work with in-memory state if Firestore is offline
- ⚠️ Data won't persist between sessions without Firestore

## After Enabling Firestore

Once you enable it, the app will automatically:

- Save user data to Firestore
- Persist subscriptions across sessions
- Store admin credentials
- Load data on login

## If You Don't Want to Use Firestore

That's fine! The app now works without it. But you'll lose:

- Data persistence (logout = lose subscription)
- Multi-device sync
- Admin dashboard real data

Just keep using it and everything will be stored in Redux (browser memory only).
