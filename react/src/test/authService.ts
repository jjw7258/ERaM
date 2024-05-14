import axios from "./axios";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  id: string;
  name?: string;
  mobile?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  mobile?: string;
}

interface ProfileData {
  id: string;
  name: string;
  newPassword: string;
  mobile: string;
}

const login = async (data: LoginData) => {
  try {
    const response = await axios.post("/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const signup = async (data: SignupData) => {
  try {
    const response = await axios.post("/auth/join", data);
    return response.data;
  } catch (error) {
    throw new Error("Signup failed");
  }
};

const fetchLoginForm = async () => {
  try {
    const response = await axios.get("/auth/login2");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch login form:", error);
    throw new Error("Failed to fetch login form");
  }
};

const fetchRegisterForm = async () => {
  try {
    const response = await axios.get("/auth/join2");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch register form:", error);
    throw new Error("Failed to fetch register form");
  }
};

const authenticatedRequest = async (url: string, data: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error("Authenticated request failed");
  }
};

const fetchData = async () => {
  try {
    const data = await authenticatedRequest("/api/data", {});
    console.log("Data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const fetchUserData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await axios.get("/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

const updateProfile = async (data: ProfileData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await axios.put("/members/update", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Profile update failed");
  }
};

export default {
  login,
  signup,
  fetchLoginForm,
  fetchRegisterForm,
  fetchData,
  fetchUserData,
  updateProfile,
};
