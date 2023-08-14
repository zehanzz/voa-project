import React, { useState, useContext } from 'react';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddStore = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        category: "",
        description: "",
        menu_item: "",
        unit_price: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/store', inputs);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/store");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Add Store" />

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

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="category">Category</label>
                    <select
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="category"
                        value={inputs.category}
                        onChange={handleChange}
                    >
                        <option name="category" value="">please select type</option>
                        <option name="category" value="Food Stall">Food Stall</option>
                        <option name="category" value="Ice Cream Parlor">Ice Cream Parlor</option>
                        <option name="category" value="Restaurant">Restaurant</option>
                        <option name="category" value="Gift Shop">Gift Shop</option>
                        <option name="category" value="Apparels">Apparels</option>
                    </select>

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="description"
                        name="description"
                        onChange={handleChange}
                    />
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="menu_item">Menu Item</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="menu item"
                        name="menu_item"
                        onChange={handleChange}
                    />
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="unit_price">Unit Price</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="unit price"
                        name="unit_price"
                        onChange={handleChange}
                    />

                    <div className="p-4" />
                    {message && <div className="p-4 font-bold">{message}</div>}
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>Add Store</button>
                </div>
            </form>


            <div className="pt-4 flex flex-row justify-between">
                <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleBack}>Back</button>
            </div>


        </div>
    );
};
export default AddStore;
