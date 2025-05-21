import API from "../configs/API";

export const clientLoginService = async (data) => {
  try {
    const response = await API.post("auth/login", data);
    if (response.status === 200) {
      localStorage.setItem("TOKEN", response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error || "Login failed";
  }
};

export const adminLoginService = async (data) => {
  try {
    const response = await API.post("auth/admin-login", data);
    if (response.status === 200) {
      localStorage.setItem("TOKEN", response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error || "Login failed";
  }
};

export const registerService = async (data) => {
  try {
    const response = await API.post("auth/register", data);
    if (response.status === 200) {
      console.log("Registration successful:", response.data);
      
      return response.data;

    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error|| "Registration failed";
  }
};

export const getProfileService = async () => {
  try {
    const response = await API.get("auth/profile");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error || "Profile fetch failed";
  }
};
