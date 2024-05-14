import React, { useState } from "react";
import authService from "./authService"; // authService를 import합니다.
import "./AuthForm.css"; // CSS 파일을 import합니다.

function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 폼 표시 여부 상태

  // 회원가입이 성공하면 로그인 폼으로 전환하는 함수
  const handleSignUpSuccess = () => {
    setIsSignUp(false); // 회원가입 폼 숨기기
    setError(""); // 에러 초기화
    setIsRightPanelActive(false); // 오른쪽 패널 비활성화
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 동작 방지
    setLoading(true); // 로딩 상태 설정
    try {
      await authService.signup({ id, email, password, name, mobile });
      setError(""); // 에러 초기화
      setLoading(false); // 로딩 상태 해제
      handleSignUpSuccess(); // 회원가입 성공 후 로그인 폼으로 전환
    } catch (err) {
      setError("Signup failed");
      setLoading(false); // 로딩 상태 해제
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); // 기본 동작 방지
    setLoading(true); // 로딩 상태 설정
    try {
      await authService.login({ email, password });
      setError(""); // 에러 초기화
      setLoading(false); // 로딩 상태 해제
      // 로그인 성공 후 입력 상태 초기화
      setEmail("");
      setPassword("");
      setId("");
      setName("");
      setMobile("");
    } catch (err) {
      setError("Login failed");
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 폼 전환 함수
  const toggleForm = (isSignUp) => {
    setIsSignUp(isSignUp);
    setError(""); // 에러 초기화
    setIsRightPanelActive(isSignUp); // 오른쪽 패널 활성화 여부 업데이트
  };

  return (
    <div className="App">
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {isSignUp ? ( // 회원가입 폼 표시 여부에 따라 폼을 전환합니다.
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>회원가입</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                Sign Up
              </button>
              {error && <p>{error}</p>}
            </form>
          </div>
        ) : (
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>로그인</h1>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={loading}>
                Sign In
              </button>
              {error && <p>{error}</p>}
            </form>
          </div>
        )}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => toggleForm(false)}
                type="button" // 기본 동작 방지
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => toggleForm(true)}
                type="button" // 기본 동작 방지
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
