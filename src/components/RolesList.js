import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function RolesList({ data }) {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      dataField: 'name',
      text: 'Role Name'
    },
    {
      dataField: 'createdDate',
      text: 'Created Date'
    }
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = searchText === '' ? data : data.filter(item =>
    item.id.toString().includes(searchText) ||
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
    item.role.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <BootstrapTable
        keyField="id"
        data={filteredData}
        columns={columns}
        pagination={paginationFactory()}
      />
    </div>
  );
}

export default RolesList;
