// Google OAuth configuration
export const GOOGLE_CLIENT_ID = "315654933732-t1ft055ik4ofki63sf9cqg5tj5kscljk.apps.googleusercontent.com";

// Types for Google OAuth response
export interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

// Decode JWT token to get user info
export function parseJwt(token: string): GoogleUser {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    throw new Error('Invalid token');
  }
}

// Check if email is valid (.edu.in domain)
export function isValidEducationalEmail(email: string): boolean {
  return /@\w+\.edu\.in$/.test(email);
}

// Load Google Identity Services script
export function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google script'));
    document.head.appendChild(script);
  });
}
