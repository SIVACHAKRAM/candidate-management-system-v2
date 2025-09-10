import React, { useState, useEffect } from 'react';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import axios from 'axios';

function App() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = () => {
    axios.get('http://localhost:5000/api/candidates')
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Candidate Management System</h1>
      <CandidateForm
        selectedCandidate={selectedCandidate}
        refreshList={fetchCandidates}
        clearSelection={() => setSelectedCandidate(null)}
      />
      <CandidateList
        candidates={candidates}
        onEdit={setSelectedCandidate}
        refreshList={fetchCandidates}
      />
    </div>
  );
}

export default App;
