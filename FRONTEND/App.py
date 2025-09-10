import React from 'react';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Candidate Management System</h1>
      <CandidateForm />
      <CandidateList />
    </div>
  );
}

export default App;
