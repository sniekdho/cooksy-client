import { Eye, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showEye, setShowEye] = useState(false);
  const { signInUser, googleSignInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
        navigate(`${location?.state ? location?.state : "/"}`);
        Swal.fire({
          icon: "success",
          title: "Welcome",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const friendlyMessage = getSignInErrorMessage(error.code);
        Swal.fire({
          icon: "error",
          title: friendlyMessage,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignInUser()
      .then(() => {
        navigate(location?.state || "/");
        Swal.fire({
          icon: "success",
          title: "Welcome",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-pink-600 text-center mb-2">
          Welcome Back to CookSy
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Log in to explore your saved recipes, track cooking goals, and enjoy
          your culinary journey.
        </p>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full bg-base-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showEye ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered input-primary w-full bg-base-200"
                required
              />
              <div
                className="absolute top-2 right-5 z-50 cursor-pointer text-pink-600"
                onClick={() => setShowEye(!showEye)}
              >
                {showEye ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-pink-600 hover:bg-pink-700 border-0 w-full text-white font-semibold"
          >
            SignIn
          </button>
        </form>

        <div className="text-right mt-3 text-sm text-pink-600">
          <Link
            to="/forgot-password"
            className="hover:underline hover:text-pink-700"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-6 text-base-content/80">
          New user?{" "}
          <Link
            to="/auth/signup"
            className="text-pink-600 font-semibold hover:text-pink-700"
          >
            SignUp
          </Link>
        </div>

        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
