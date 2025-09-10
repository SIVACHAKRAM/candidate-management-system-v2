import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CandidateForm({ selectedCandidate, refreshList, clearSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    current_status: '',
    resume_link: ''
  });

  useEffect(() => {
    if (selectedCandidate) {
      const [id, name, email, phone, status, resume] = selectedCandidate;
      setFormData({ name, email, phone_number: phone, current_status: status, resume_link: resume });
    } else {
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        current_status: '',
        resume_link: ''
      });
    }
  }, [selectedCandidate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (selectedCandidate) {
      const id = selectedCandidate[0];
      axios.put(`http://localhost:5000/api/candidates/${id}`, formData)
        .then(() => {
          alert('Candidate updated!');
          refreshList();
          clearSelection();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5000/api/candidates', formData)
        .then(() => {
          alert('Candidate added!');
          refreshList();
        })
        .catch(err => console.error(err));
    }

    setFormData({
      name: '',
      email: '',
      phone_number: '',
      current_status: '',
      resume_link: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
      <input name="current_status" placeholder="Status" value={formData.current_status} onChange={handleChange} required />
      <input name="resume_link" placeholder="Resume Link" value={formData.resume_link} onChange={handleChange} required />
      <button type="submit">{selectedCandidate ? 'Update Candidate' : 'Add Candidate'}</button>
      {selectedCandidate && <button type="button" onClick={clearSelection}>Cancel Edit</button>}
    </form>
  );
}

export default CandidateForm;
