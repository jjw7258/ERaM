import React, { useState } from "react";
import authService from "./authService";
import "./SignupForm.css"; // 폼에 대한 스타일을 포함하는 CSS 파일

const SignupForm = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signup({ id, email, password, name, mobile });
      window.location.href = "/login";
    } catch (err) {
      setError("Signup failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading} className="submit-btn">
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;