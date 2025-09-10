import React, { useState } from 'react';
import axios from 'axios';

function CandidateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    current_status: '',
    resume_link: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/candidates', formData)
      .then(() => alert('Candidate added!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
      <input name="current_status" placeholder="Status" onChange={handleChange} required />
      <input name="resume_link" placeholder="Resume Link" onChange={handleChange} required />
      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default CandidateForm;
