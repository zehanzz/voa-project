import React, { useState, useContext } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getWchairAccess = (props) => (
    <div className="flex items-center justify-center gap-2">
        <span>{props.wchair_access === "1" ? 'Yes' : 'No'}</span>
    </div>
);

const showsGrid = [
    {
        field: 'show_id',
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
        headerText: 'Address',
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
        field: 's_time',
        headerText: 'Start Time',
        width: '100',
        textAlign: 'Center'
    },
    {
        field: 'e_time',
        headerText: 'End Time',
        width: '100',
        textAlign: 'Center'
    },
    {
        template: getWchairAccess,
        headerText: 'Wheelchair Access?',
        width: '100',
        textAlign: 'Center'
    },
    {
        field: 'price',
        headerText: 'Price',
        width: '100',
        textAlign: 'Center'
    }
];


const Shows = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [showsData, setShowsData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/shows`).then(res => {
                    if (isMounted) setShowsData(res.data);
                });
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        return () => { isMounted = false };
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/shows/add");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate("/shows/update");
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`/shows/${localStorage.getItem('selectedID')}`);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRowSelected = (args) => {
        const selectedID = args.data.show_id;
        // console.log(selectedID);
        localStorage.setItem('selectedID', selectedID);
    };

    const toolbarOptions = ['Search'];

    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Shows" />
            <GridComponent
                dataSource={showsData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
                rowSelected={handleRowSelected}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {showsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
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
export default Shows;
