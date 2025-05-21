import { Eye, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showEye, setShowEye] = useState(false);
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const getSignInErrorMessage = (errorCode) => {
      switch (errorCode) {
        case "auth/user-not-found":
          return "No account found with this email. Please sign up first.";
        case "auth/invalid-password":
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/invalid-login-credentials":
          return "Incorrect email or password. Please try again.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/missing-password":
          return "Password is required.";
        case "auth/network-request-failed":
          return "Network error. Please check your internet connection.";
        case "auth/too-many-requests":
          return "Too many failed attempts. Please try again later.";
        default:
          return "Login failed. Please try again.";
      }
    };

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        const friendlyMessage = getSignInErrorMessage(error.code);
        Swal.fire({
          icon: "error",
          title: friendlyMessage,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10 px-4">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-secondary mb-2">
          Welcome Back to CookSy
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Log in to explore your saved recipes, track cooking goals, and enjoy
          your culinary journey.
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showEye ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <div
                className="absolute top-2 right-5 z-50 cursor-pointer"
                onClick={() => setShowEye(!showEye)}
              >
                {showEye ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-accent w-full">
            SignIn
          </button>
        </form>

        <div className="text-right mt-2 text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:text-accent">
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-4">
          New user?{" "}
          <Link to="/auth/signup" className="text-accent font-semibold">
            SignUp
          </Link>
        </div>

        <div className="divider">OR</div>
        <button className="btn btn-outline w-full flex items-center justify-center">
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
