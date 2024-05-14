import React, { useState } from "react";
import authService from "./authService";
import "./LoginForm.css"; // LoginForm에 대한 스타일을 포함하는 CSS 파일

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login({ email, password });
      // 로그인 성공 후 페이지 리디렉션 또는 상태 업데이트
      window.location.href = "/home"; // 예: 홈 페이지로 리다이렉트
    } catch (err) {
      setError("Login failed");
      setLoading(false);
    }
  };

  const handleSignup = () => {
    // 회원가입 페이지로 이동하는 로직을 추가할 수 있습니다.
    window.location.href = "/signup"; // 예: 회원가입 페이지로 리다이렉트
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
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
      <button type="submit" disabled={loading} className="submit-btn">
        Login
      </button>
      {error && <p>{error}</p>}
      {/* 회원가입 버튼 */}
      <button type="button" onClick={handleSignup} className="signup-btn">
        Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
