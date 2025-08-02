import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { 
  GOOGLE_CLIENT_ID, 
  GoogleCredentialResponse, 
  parseJwt, 
  isValidEducationalEmail,
  loadGoogleScript 
} from '../utils/googleAuth';

interface GoogleSignInButtonProps {
  mode: 'signin' | 'signup';
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignInButton({ mode, onError }: GoogleSignInButtonProps) {
  const router = useRouter();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleScript().then(() => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: mode === 'signin' ? 'signin_with' : 'signup_with',
          }
        );
      }
    }).catch((error) => {
      console.error('Failed to load Google script:', error);
      onError?.('Failed to load Google authentication');
    });
  }, [mode]);

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    try {
      const userInfo = parseJwt(response.credential);
      
      // Validate educational email
      if (!isValidEducationalEmail(userInfo.email)) {
        alert('Only .edu.in student email addresses are allowed');
        onError?.('Invalid email domain');
        return;
      }

      // Print the name and email as requested
      console.log('Google Authentication Successful!');
      console.log('Name:', userInfo.name);
      console.log('Email:', userInfo.email);
      
      // Also show an alert with the information
      alert(`Authentication Successful!\nName: ${userInfo.name}\nEmail: ${userInfo.email}`);

      if (mode === 'signup') {
        // Store user info for signup
        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          password: 'google-oauth', // We'll use this to identify Google users
          isGoogleUser: true,
          picture: userInfo.picture
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('loggedIn', 'true');
        console.log('Signup completed with Google OAuth');
        router.push('/');
      } else {
        // Sign in mode
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          alert('No account found. Please sign up first.');
          router.push('/signup');
          return;
        }

        const user = JSON.parse(storedUser);
        if (user.email === userInfo.email) {
          localStorage.setItem('loggedIn', 'true');
          console.log('Sign in completed with Google OAuth');
          router.push('/');
        } else {
          alert('Account not found. Please check your email or sign up.');
        }
      }
    } catch (error) {
      console.error('Error handling Google sign-in:', error);
      alert('Authentication failed. Please try again.');
      onError?.('Authentication failed');
    }
  };

  return (
    <div>
      <div ref={googleButtonRef}></div>
    </div>
  );
}
