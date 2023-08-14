import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';

const getAdress = (props) => (
  <div className="flex items-center justify-center gap-2">
    <span>{props.street + " " + props.city + ", " + props.state + ", " + props.country}</span>
  </div>
);

const getFullname = (props) => (
  <div className="flex items-center justify-center gap-2">
    <span>{props.fname + " " + props.lname}</span>
  </div>
);

const visitorsGrid = [
  {
    field: 'visitor_id',
    headerText: 'ID',
    width: '30',
    textAlign: 'Center'
  },
  {
    template: getFullname,
    headerText: 'Name',
    width: '80',
    textAlign: 'Center',
  },
  {
    template: getAdress,
    headerText: 'Address',
    width: '170',
    textAlign: 'Center',
  },
  {
    field: 'zipcode',
    headerText: 'Zipcode',
    width: '90',
    textAlign: 'Center',
  },
  {
    field: 'email',
    headerText: 'Email',
    width: '150',
    textAlign: 'Center'
  },
  {
    field: 'dob',
    headerText: 'Birth Date',
    width: '80',
    format: 'yMd',
    textAlign: 'Center'
  },
  {
    field: 'cell_num',
    headerText: 'Cell',
    width: '100',
    textAlign: 'Center'
  },
  {
    field: 'type',
    headerText: 'Type',
    width: '100',
    textAlign: 'Center'
  },
  {
    field: 'visit_date',
    headerText: 'Last Visit',
    width: '125',
    textAlign: 'Center'
  },
];


const Visitors = () => {

  const [visitorsData, setVisitorsData] = useState([]);

  useEffect(() => {
    // avoid mem leak
    let isMounted = true;
    const fetchData = async () => {
      try {
        await axios.get(`/visitors`).then(res => {
          if (isMounted) setVisitorsData(res.data);
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
      <Header category="Page" title="Visitors" />
      <GridComponent
        dataSource={visitorsData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {visitorsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Visitors;
