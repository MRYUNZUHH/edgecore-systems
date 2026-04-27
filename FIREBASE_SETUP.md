# Firebase Setup for EdgeCore Casino

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add Project" → Name it "edgecore-casino"
3. Enable Google Analytics (optional)
4. Click "Create Project"

## Step 2: Enable Authentication
1. In Firebase Console → Build → Authentication
2. Click "Get Started"
3. Enable "Email/Password" provider
4. Enable "Google" provider (optional)
5. Add authorized domains (localhost + your Vercel domain)

## Step 3: Setup Firestore Database
1. In Firebase Console → Build → Firestore Database
2. Click "Create Database"
3. Start in test mode (we will secure later)
4. Choose a location close to your users

## Step 4: Setup Storage
1. In Firebase Console → Build → Storage
2. Click "Get Started"
3. Start in test mode
4. This will be used for avatar uploads

## Step 5: Get Configuration
1. In Firebase Console → Project Settings → General
2. Under "Your apps" → Click "</>"
3. Register app as "edgecore-web"
4. Copy the firebaseConfig object
5. Paste those values into .env.local

## Step 6: Deploy to Vercel
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables from .env.local
5. Deploy!

Your app will be live at: https://your-app.vercel.app
