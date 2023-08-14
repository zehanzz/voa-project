import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';


const ordersGrid = [
  {
    field: 'ord_id',
    headerText: 'ID',

    textAlign: 'Center'
  },
  {
    field: 'visitor_id',
    headerText: 'Visitor ID',

    textAlign: 'Center'
  },
  {
    field: 'ord_date',
    headerText: 'Date',

    textAlign: 'Center',
  },
  {
    field: 'ord_quantity',
    headerText: 'Quantiry',
    width: '170',
    textAlign: 'Center',
  },
  {
    field: 'ord_amount',
    headerText: 'Amount',

    textAlign: 'Center',
  },
  {
    field: 'show_id',
    headerText: 'Show ID',

    textAlign: 'Center'
  },
  {
    field: 'store_id',
    headerText: 'Store ID',

    format: 'yMd',
    textAlign: 'Center'
  },

  {
    field: 'park_id',
    headerText: 'Park ID',

    textAlign: 'Center'
  },
  {
    field: 'tickets_id',
    headerText: 'Tickets ID',

    textAlign: 'Center'
  },
  {
    field: 'pay_id',
    headerText: 'Payment ID',

    textAlign: 'Center'
  },
];


const Orders = () => {

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        await axios.get(`/orders`).then(res => {
          if (isMounted) setOrdersData(res.data);
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
      <Header category="Page" title="Orders" />
      <GridComponent
        dataSource={ordersData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Orders;
