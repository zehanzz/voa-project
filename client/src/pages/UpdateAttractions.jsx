import React, { useState, useContext } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const attractGrid = [
    {
        field: 'attract_id',
        headerText: 'ID',
        width: '30',
        textAlign: 'Center'
    },
    {
        field: 'name',
        headerText: 'Name',
        width: '80',
        textAlign: 'Center',
    },
    {
        field: 'description',
        headerText: 'Desctiption',
        width: '200',
        textAlign: 'Center',
    },
    {
        field: 'type',
        headerText: 'Type',
        width: '90',
        textAlign: 'Center',
    },
    {
        field: 'status',
        headerText: 'Status',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'cpacity',
        headerText: 'Capacity',
        width: '80',
        textAlign: 'Center'
    },
    {
        field: 'min_height',
        headerText: 'Min Height',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'duration',
        headerText: 'Duration',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'section',
        headerText: 'Section',
        width: '50',
        textAlign: 'Center'
    },
];



// const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//         await login(inputs)
//         // const res = await axios.post("/auth/login", inputs);
//         navigate("/");
//     } catch (err) {
//         setError(err.response.data);
//     }
// };

const UpdateAttraction = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const targetID = localStorage.getItem('selectedID');
    const [inputs, setInputs] = useState({
        attract_id: targetID,
        name: "",
        description: "",
        type: "",
        status: "",
        cpacity: "",
        min_height: "",
        duration: "",
        section: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/attractions/${targetID}`, inputs);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/attractions");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Update Attraction" />

            <form id="addForm" className="space-y-6" onSubmit={handleSubmit}>
                <div >
                    <label className="block font-medium text-gray-700 mb-2" >Attraction ID : {targetID}</label>
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

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="type">Type</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="type"
                        name="type"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="name">Status</label>
                    <select
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                    >
                        <option name="status" value="">please select status</option>
                        <option name="status" value="Open">Open</option>
                        <option name="status" value="Closed">Closed</option>
                        <option name="status" value="Under Maintenance">Under Maintenance</option>
                    </select>

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="cpacity">Capacity</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="capacity"
                        name="cpacity"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="min_height">Min Height</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="Min Height"
                        name="min_height"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="duration">Duration</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="duration"
                        name="duration"
                        onChange={handleChange}
                    />

                    <label className="block font-medium text-gray-700 mb-2" htmlFor="section">Section</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        placeholder="section"
                        name="section"
                        onChange={handleChange}
                    />
                    {message && <div className="p-4 font-bold">{message}</div>}
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>Update Attraction</button>
                </div>
            </form>


            <div className="pt-4 flex flex-row justify-between">
                <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleBack}>Back</button>
            </div>


        </div>
    );
};
export default UpdateAttraction;
