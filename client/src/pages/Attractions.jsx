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



const Attractions = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        type: "",
        status: "",
        cpacity: "",
        min_height: "",
        duration: "",
        section: "",
    });

    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/attractions/add");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate("/attractions/update");
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`/attractions/${localStorage.getItem('selectedID')}`);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRowSelected = (args) => {
        const selectedID = args.data.attract_id;
        // console.log(selectedID);
        localStorage.setItem('selectedID', selectedID);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/attractions', inputs);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    // Get all attractions data
    const [attractData, setAttractData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/attractions`).then(res => {
                    if (isMounted) setAttractData(res.data);
                });
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        return () => { isMounted = false };
    }, []);

    const toolbarOptions = ['Search'];


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Attractions" />
            <GridComponent
                id='table'
                dataSource={attractData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                toolbar={toolbarOptions}
                selectionSettings={{ type: 'Single', mode: 'Row', checkboxOnly: false }}
                rowSelected={handleRowSelected}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {attractGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>

            {message && <div className="p-4 font-bold">{message}</div>}


            {(currentUser.role === "Employee") ? <div className="pt-4 flex flex-row justify-center">
                <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleAdd}>Add</button>
                <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleUpdate}>Update</button>
                <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleDelete}>Delete</button>
            </div> : <div />
            }


        </div>
    );
};
export default Attractions;
