import AuthCard from "../components/AuthCard";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return alert("No user found. Please sign up first.");
    const user = JSON.parse(stored);
    if (email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", "true");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account"
      onSubmit={handleLogin}
      cta="Sign In"
      afterButton={
        <>
          <div className="oauth-divider">
            <span>OR</span>
          </div>
          <GoogleSignInButton mode="signin" />
        </>
      }
      footer={
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      }
    >
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
    </AuthCard>
  );
}
