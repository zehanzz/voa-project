import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';


const ticketsGrid = [
    {
        field: 'tickets_id',
        headerText: 'ID',
        textAlign: 'Center'
    },
    {
        field: 'method',
        headerText: 'Puchase Method',
        textAlign: 'Center',
    },
    {
        field: 'prch_date',
        headerText: 'Purchase Date',
        textAlign: 'Center',
    },
    {
        field: 'vist_date',
        headerText: 'Visit Date',
        textAlign: 'Center',
    },
    {
        field: 'type',
        headerText: 'Type',
        textAlign: 'Center'
    },
    {
        field: 'price',
        headerText: 'Price',
        textAlign: 'Center'
    },
    {
        field: 'visitor_id',
        headerText: 'Visitor ID',
        textAlign: 'Center'
    },
];


const Tickets = () => {

    const [ticketsData, setTicketsData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/tickets`).then(res => {
                    if (isMounted) setTicketsData(res.data);
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

    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Tickets" />
            <GridComponent
                dataSource={ticketsData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {ticketsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Tickets;
