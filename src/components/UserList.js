import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function UserList({ data }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [, forceRender] = useState(undefined);
  const navigateToEditUser = (event) => {
    navigate('/edit-user/'+event.target.value);
  };
  const deleteUser = async (event) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('Are you sure you want to delete this record?');
    if (result === true) {
      try {
        await fetch('http://localhost:3000/auth/users/'+event.target.value, {
          method: 'DELETE',
          credentials: 'include',
          }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            window.location.reload();
          })
        } catch (error) {
          alert("Something went wrong")
        }
    } else {
    }
      
  };
  
  const columns = [
    {
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: 'roles',
      text: 'Role Name',
      formatter: (cell, row) => {
        return row.roles[0].name;
      }
    },
    {
      dataField: 'edit',
      text: 'Action',
      formatter: (cell, row) => {
        return <><button onClick={navigateToEditUser} data-role={row.roles[0]._id} value={row._id} className="btn btn-primary">Edit</button>&nbsp;<button value={row._id} className="btn btn-primary" onClick={deleteUser}>Delete</button></>;
      }
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

export default UserList;
