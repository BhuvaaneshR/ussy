import React from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  onSubmit: () => void;
  children: React.ReactNode;
  cta: string;
  footer?: React.ReactNode;
  afterButton?: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  onSubmit,
  children,
  cta,
  footer,
  afterButton,
}: AuthCardProps) {
  return (
    <div className="container">
      <div className="card">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
          <button className="primary" type="submit">{cta}</button>
        </form>
        {afterButton}
        {footer}
      </div>
    </div>
  );
}
