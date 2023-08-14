import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useStateContext } from '../contexts/ContextProvider';

import { Header, Button } from '../components';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      // const res = await axios.post("/auth/login", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <Header category="" title="Login" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label className="block font-medium text-gray-700 mb-2"
          htmlFor="email">Email</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Login</button>
        {err && <p className="mx-auto w-1/2 text-red-500 font-bold">{err}</p>}
        <div className="flex items-center justify-between">
          <span>
            Don't have an account? <Link className="text-blue-500 underline font-bold hover:no-underline" to="/register">Register</Link>
          </span>
        </div>

      </form>
    </div>
  );
};

export default Login;
