import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates')
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Resume</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c, i) => {
          const [id, name, email, phone, status, resume] = c;
          return (
            <tr key={i}>
              <td>{id}</td><td>{name}</td><td>{email}</td><td>{phone}</td><td>{status}</td><td><a href={resume}>View</a></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CandidateList;
