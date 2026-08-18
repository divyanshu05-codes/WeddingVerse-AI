import {
  useEffect,
  useState,
} from "react";

import AuthContext from "./AuthContext";

import {
  getProfile,
} from "../features/auth/services/auth.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // FETCH CURRENT USER
  // ======================================================

  const fetchUser = async () => {
    try {
      const response = await getProfile();

      setUser(response.data?.data || null);

    } catch (error) {
      // No logged-in user is a normal state.
      setUser(null);

      if (error.response?.status !== 401) {
        console.error(
          "Failed to fetch user:",
          error
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // INITIAL AUTH CHECK
  // ======================================================

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthProvider;