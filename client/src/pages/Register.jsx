import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Button } from '../components';

const Register = () => {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    cell_num: "",
    dob: "",
    type: "",
    visit_date: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {

    // setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    let errors = {};

    if (!inputs.fname.trim()) {
      setError('First name is required');
      return null;
    }

    if (!inputs.lname.trim()) {
      setError('Last name is required');
      return null;
    }

    if (!inputs.gender.trim()) {
      setError('Gender is required');
      return null;
    }

    if (!inputs.email.trim()) {
      setError('Email is required');
      return null;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      setError('Email address is invalid');
      return null;
    }

    if (!inputs.password.trim()) {
      setError('Password is required');
      return null;
    } else if (inputs.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return null;
    }

    if (!inputs.street.trim()) {
      setError('Street address is required');
      return null;
    }

    if (!inputs.city.trim()) {
      setError('City is required');
      return null;
    }

    if (!inputs.state.trim()) {
      setError('State is required');
      return null;
    }

    if (!inputs.zipcode.trim()) {
      setError('Zip code is required');
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(inputs.zipcode)) {
      setError('Zip code is invalid');
      return null;
    }

    if (!inputs.country.trim()) {
      setError('Country is required');
      return null;
    }

    if (!inputs.cell_num.trim()) {
      setError('Cell phone number is required');
      return null;
    } else if (!/^\d{10}$/.test(inputs.cell_num)) {
      setError('Cell phone number is invalid');
      return null;
    }

    if (!inputs.dob.trim()) {
      setError('Date of birth is required');
      return null;
    }

    if (!inputs.type.trim()) {
      setError('Type is required');
      return null;
    }

    if (!inputs.visit_date.trim()) {
      setError('Visit date is required');
      return null;
    }

    try {
      const res = await axios.post("/auth/register", inputs);
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <Header category="" title="Register" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label className="block font-medium text-gray-700 mb-2" htmlFor="fname">First Name</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="fname"
          name="fname"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="lname">Last Name</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="lname"
          name="lname"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="gender">Gender</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="gender"
          name="gender"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="email"
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
        <label className="block font-medium text-gray-700 mb-2" htmlFor="street">Street</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="street"
          name="street"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="city">City</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="city"
          name="city"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="state">State</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="state"
          name="state"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="zipcode">Zipcode</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="zipcode"
          name="zipcode"
          pattern="[0-9]*"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="country">Country</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="text"
          placeholder="country"
          name="country"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="cell_num">Cell Number</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="tel"
          placeholder="cell_num"
          name="cell_num"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="dob">Date of Birth</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="date"
          placeholder="date of birth"
          name="dob"
          onChange={handleChange}
        />
        <label className="block font-medium text-gray-700 mb-2" htmlFor="type">Type</label>
        <select
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          name="type"
          value={inputs.type}
          onChange={handleChange}
        >
          <option name="type" value="">please select a type</option>
          <option name="type" value="Individual">individual</option>
          <option name="type" value="Group">group</option>
          <option name="type" value="Member">member</option>
          <option name="type" value="School">student</option>
        </select>
        <label className="block font-medium text-gray-700 mb-2" htmlFor="visit_date">Visit Date</label>
        <input
          className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          required
          type="date"
          placeholder="visit date"
          name="visit_date"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Register</button>
        {err && <p className="mx-auto w-1/2 text-red-500 font-bold">{err}</p>}
        <div className="flex items-center justify-between">
          <span>
            Already have an account? <Link className="text-blue-500 underline font-bold hover:no-underline" to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
