import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HEIDI_Logo from "../Resource/HEIDI_Logo.png";

const PasswordForgot = () => {
  useEffect(() => {
    document.title = "Heidi - Update Password";
  }, []);

  let navigate = useNavigate();
  const routeChangeToLogin = () => {
    let path = `/`;
    navigate(path);
  };

  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  })

  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter new Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();

    console.log(input)
    routeChangeToLogin()
  }

  return (
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img
            class="mx-auto h-20 w-auto"
            src={HEIDI_Logo}
            alt="Your Company"
          />
          <h3 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create new password
          </h3>
        </div>
        <form onSubmit={handleSubmit} class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="space-y-2 rounded-md shadow-sm">
            <div>
              <label for="password" class="sr-only">
                New Password
              </label>
              <input
                name="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
                type="password"
                autoComplete="current-password"
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="New Password"
              ></input>
              {error.password && <span className='err'>{error.password}</span>}
            </div>
            <div>
              <label for="password" class="sr-only">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm New Password"
              ></input>
              {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              id="finalbutton"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-slate-400 focus:outline-none focus:ring-2 focus:text-gray-400 focus:ring-offset-2"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-gray-50 group-hover:text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Update Password
            </button>
          </div>
          <div class="text-sm">
            Already have an account? Please Login
            <span
              onClick={routeChangeToLogin}
              class="font-medium cursor-pointer text-black hover:text-gray-500"
            >
              {" "}
              here{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PasswordForgot;
