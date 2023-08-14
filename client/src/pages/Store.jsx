import React, { useState, useContext, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const storeGrid = [
    {
        field: 'store_id',
        headerText: 'ID',
        textAlign: 'Center'
    },
    {
        field: 'name',
        headerText: 'Name',
        textAlign: 'Center'
    },
    {
        field: 'category',
        headerText: 'Category',
        textAlign: 'Center',
    },
    {
        field: 'description',
        headerText: 'Description',
        textAlign: 'Center',
    },
    {
        field: 'menu_item',
        headerText: 'Menu Item',
        textAlign: 'Center',
    },
    {
        field: 'unit_price',
        headerText: 'Unit Price',
        textAlign: 'Center'
    },
];


const Store = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/store`).then(res => {
                    if (isMounted) setStoreData(res.data);
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
        navigate("/store/add");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate("/store/update");
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`/store/${localStorage.getItem('selectedID')}`);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRowSelected = (args) => {
        const selectedID = args.data.store_id;
        // console.log(selectedID);
        localStorage.setItem('selectedID', selectedID);
    };

    const toolbarOptions = ['Search'];

    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Store" />
            <GridComponent
                dataSource={storeData}
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
                    {storeGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
            {message && <div className="p-4 font-bold">{message}</div>}

            {(currentUser.role === "Employee") ? <div className="pt-4 flex flex-row justify-center">
                <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleAdd}>Add</button>
                <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleUpdate}>Update</button>
                {/* <button className="m-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 p-4 rounded-md focus:outline-none focus:shadow-outline" onClick={handleDelete}>Delete</button> */}
            </div> : <div />
            }

        </div>
    );
};
export default Store;
