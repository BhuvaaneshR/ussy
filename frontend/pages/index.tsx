import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; picture?: string; isGoogleUser?: boolean } | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    if (!isLoggedIn || !storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          {user.picture && (
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                marginRight: '1rem' 
              }} 
            />
          )}
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>Welcome {user.name}</h2>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              {user.email}
              {user.isGoogleUser && <span style={{ marginLeft: '0.5rem', color: '#4285f4' }}>• Google Account</span>}
            </p>
          </div>
        </div>
        
        <button 
          className="primary" 
          onClick={handleSignOut}
          style={{ marginTop: '1rem' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
