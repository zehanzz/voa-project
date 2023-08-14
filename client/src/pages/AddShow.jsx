import React, { useState, useContext } from 'react';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddShow = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        type: "",
        s_time: "",
        e_time: "",
        wchair_access: "",
        price: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/shows', inputs);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/shows");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Add Show" />

            <form id="addForm" className="space-y-6" onSubmit={handleSubmit}>
                <div >
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="name">Name</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="description"
                        name="description"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="name">Type</label>
                    <select
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="type"
                        value={inputs.type}
                        onChange={handleChange}
                    >
                        <option name="type" value="">please select type</option>
                        <option name="type" value="Drama">Drama</option>
                        <option name="type" value="Musical">Musical</option>
                        <option name="type" value="Comedy">Comedy</option>
                        <option name="type" value="Horror">Horror</option>
                        <option name="type" value="Adventure">Adventure</option>
                    </select>
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="s_time">Start Time</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="date"
                        name="s_time"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="e_time">End Time</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="date"
                        name="e_time"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="name">Wheelchair Accessibility</label>
                    <select
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="wchair_access"
                        value={inputs.wchair_access}
                        onChange={handleChange}
                    >
                        <option name="wchair_access" value="">please select type</option>
                        <option name="wchair_access" value="1">Yes</option>
                        <option name="wchair_access" value="0">No</option>
                    </select>

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="price">Price</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="price"
                        name="price"
                        onChange={handleChange}
                    />

                    <div className="p-4" />
                    {message && <div className="p-4 font-bold">{message}</div>}
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>Add Show</button>
                </div>
            </form>


            <div className="pt-4 flex flex-row justify-between">
                <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleBack}>Back</button>
            </div>


        </div>
    );
};
export default AddShow;
