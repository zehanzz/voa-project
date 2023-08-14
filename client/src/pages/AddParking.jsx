import React, { useState, useContext } from 'react';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddParking = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState({
        lot: "",
        spot_number: "",
        time_in: "",
        time_out: "",
        fee: "",
        visitor_id: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/parking', inputs);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/parking");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Add Parking" />

            <form id="addForm" className="space-y-6" onSubmit={handleSubmit}>
                <div >
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="lot">Lot</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="lot"
                        name="lot"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="spot_number">Spot Number</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="spot number"
                        name="spot_number"
                        onChange={handleChange}
                    />
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="time_in">Time In</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="date"
                        name="time_in"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="time_out">Time Out</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="date"
                        name="time_out"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="fee">Fee</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="fee"
                        name="fee"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="visitor_id">Visitor ID</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="visitor id"
                        name="visitor_id"
                        onChange={handleChange}
                    />

                    <div className="p-4" />
                    {message && <div className="p-4 font-bold">{message}</div>}
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>Add Parking</button>
                </div>
            </form>


            <div className="pt-4 flex flex-row justify-between">
                <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleBack}>Back</button>
            </div>


        </div>
    );
};
export default AddParking;
