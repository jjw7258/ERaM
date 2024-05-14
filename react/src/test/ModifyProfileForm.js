import React, { useState, useEffect } from "react";
import authService from "./authService";

const ModifyProfileForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 회원 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // 서버로부터 로그인된 사용자 정보 불러오기
        const userData = await authService.fetchUserData();
        setId(userData.id);
        setName(userData.name);
        setEmail(userData.email);
        setMobile(userData.mobile);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // useEffect의 의존성 배열은 비어 있습니다.

  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지

    try {
      setLoading(true);
      // 사용자 정보 업데이트 요청
      await authService.updateProfile({
        id,
        name,
        newPassword,
        mobile,
      });
      // 업데이트 성공 시 사용자 정보 다시 불러오기
      await fetchUserData();
      // 업데이트 성공 시 처리할 작업 추가
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container modify-profile-container">
      <form onSubmit={handleProfileUpdate}>
        <h1>회원 정보 수정</h1>
        <input type="text" placeholder="Id" value={id} readOnly />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="email" placeholder="Email" value={email} readOnly />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Update Profile
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ModifyProfileForm;
