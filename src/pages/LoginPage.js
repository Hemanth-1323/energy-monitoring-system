import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (isSignUp) {
      // Sign up logic
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed Up Successfully");
        setIsSignUp(false); // Automatically switch to login mode after sign-up
        navigate("/login"); // Redirect to login page after successful sign-up
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Login logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged In Successfully");
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <p
          className={styles.loginSwitch}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
