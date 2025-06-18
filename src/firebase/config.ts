
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Define all required environment variables for Firebase and their expected names
const firebaseEnvValues = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const envVarDefinitions: { key: keyof typeof firebaseEnvValues, name: string }[] = [
  { key: 'apiKey', name: 'NEXT_PUBLIC_FIREBASE_API_KEY' },
  { key: 'authDomain', name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN' },
  { key: 'projectId', name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID' },
  { key: 'storageBucket', name: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET' },
  { key: 'messagingSenderId', name: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID' },
  { key: 'appId', name: 'NEXT_PUBLIC_FIREBASE_APP_ID' },
];

// Check for missing environment variables
const missingEnvVarNames: string[] = [];
for (const def of envVarDefinitions) {
  if (!firebaseEnvValues[def.key]) {
    missingEnvVarNames.push(def.name);
  }
}

if (missingEnvVarNames.length > 0) {
  const errorMessage = `Firebase configuration error: The following required environment variables are missing or undefined:
${missingEnvVarNames.map(name => `- ${name}`).join('\n')}

Please create or check your '.env.local' file in the project root and ensure all Firebase configuration keys from your Firebase project console are correctly set.
Refer to the README.md file (section "Firebase Setup", step 5 "Configure Environment Variables") for detailed setup instructions.

Example '.env.local' content:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Replace 'your_api_key', etc., with your actual Firebase project values.
After creating or updating '.env.local', you may need to restart your development server.
`;
  throw new Error(errorMessage);
}

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseEnvValues.apiKey,
  authDomain: firebaseEnvValues.authDomain,
  projectId: firebaseEnvValues.projectId,
  storageBucket: firebaseEnvValues.storageBucket,
  messagingSenderId: firebaseEnvValues.messagingSenderId,
  appId: firebaseEnvValues.appId,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
