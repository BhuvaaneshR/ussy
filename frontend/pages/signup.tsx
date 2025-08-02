import AuthCard from "../components/AuthCard";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

const isValidEmail = (email: string) => /@\w+\.edu\.in$/.test(email);
  const handleSignup = () => {
if (!isValidEmail(email)) return alert("Only .edu.in student email addresses are allowed (e.g., student@university.edu.in)");
    if (password !== confirm) return alert("Passwords do not match");
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Signup successful");
    router.push("/login");
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Join us today"
      onSubmit={handleSignup}
      cta="Sign Up"
      afterButton={
        <>
          <div className="oauth-divider">
            <span>OR</span>
          </div>
          <GoogleSignInButton mode="signup" />
        </>
      }
      footer={
        <p>Already have an account? <a href="/login">Sign in</a></p>
      }
    >
      <input 
        type="text" 
        placeholder="Enter your full name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Create a password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Confirm your password" 
        value={confirm} 
        onChange={e => setConfirm(e.target.value)} 
        required 
      />
    </AuthCard>
  );
}
