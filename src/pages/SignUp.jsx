import { Eye, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showEye, setShowEye] = useState(false);
  const [error, setError] = useState("");
  const { setUser, createUser, updateProfileUser, googleSignInUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(
      formData.entries()
    );

    const passwordRules = [
      {
        regex: /(?=.*[A-Z])/,
        message: "Password must have at least one uppercase letter.",
      },
      {
        regex: /(?=.*[a-z])/,
        message: "Password must have at least one lowercase letter.",
      },
      {
        regex: /.{6,}/,
        message: "Password must be at least 6 characters long.",
      },
    ];

    for (let rules of passwordRules) {
      if (!rules.regex.test(password)) {
        setError(rules.message);
        return;
      }
    }

    const getSignUpErrorMessage = (errorCode, fallback) => {
      switch (errorCode) {
        case "auth/email-already-in-use":
          return "This email is already registered. Try logging in.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/weak-password":
          return "Password must be at least 6 characters.";
        case "auth/missing-password":
          return "Please enter a password.";
        default:
          return fallback || "Signup failed. Please try again.";
      }
    };

    createUser(email, password)
      .then(() => {
        const userProfile = { email, name, photo };

        fetch("https://cooksy-server-nine.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              // Update User Profile
              updateProfileUser({ displayName: name, photoURL: photo })
                .then(() => {
                  setUser({
                    displayName: name,
                    photoURL: photo,
                  });
                  setError("");
                  navigate(`${location?.state ? location?.state : "/"}`);
                  Swal.fire({
                    icon: "success",
                    title: "Account Created Successfully",
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
            } else {
              Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Could not save user to database.",
              });
            }
          });
      })
      .catch((error) => {
        const friendlyMessage = getSignUpErrorMessage(error.code);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: friendlyMessage,
        });
      });
  };

  const handleGoogleSignUp = () => {
    googleSignInUser()
      .then((result) => {
        const user = result.user;

        const savedUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        // Save Google user to DB
        fetch("https://cooksy-server-nine.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId || data.existingUser) {
              setUser(user);
              navigate(location?.state || "/");
              Swal.fire({
                icon: "success",
                title: "Account Created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Could not save Google user to database.",
              });
            }
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
          Create Your CookSy Account
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Join a community of food lovers. Save recipes, get personalized
          suggestions, and cook like a pro.
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              User Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              className="input input-bordered input-primary w-full bg-base-200"
              required
            />
          </div>

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
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn bg-pink-600 hover:bg-pink-700 border-0 w-full text-white font-semibold"
          >
            SignUp
          </button>
        </form>

        <div className="text-center mt-4 text-base-content/80">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-pink-600 font-semibold hover:text-pink-700"
          >
            SignIn
          </Link>
        </div>

        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignUp}
          className="btn btn-outline border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="mr-2" /> Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
