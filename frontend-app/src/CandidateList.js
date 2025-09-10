import React, { useState } from 'react';
import axios from 'axios';

function CandidateList({ candidates, onEdit, refreshList }) {
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/candidates/${id}`)
      .then(() => {
        alert('Candidate deleted!');
        refreshList();
      })
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/candidates/search?name=${searchName}&status=${searchStatus}`)
      .then(res => refreshList(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <input
          placeholder="Filter by status"
          value={searchStatus}
          onChange={e => setSearchStatus(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={refreshList}>Reset</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Resume</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => {
            const [id, name, email, phone, status, resume] = c;
            return (
              <tr key={i}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{status}</td>
                <td><a href={resume} target="_blank" rel="noopener noreferrer">View</a></td>
                <td>
                  <button onClick={() => onEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
 );
}

export default CandidateList;