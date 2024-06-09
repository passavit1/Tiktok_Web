import React, { useState } from 'react';
import './CreateUserModal.css';

const CreateUserModal = ({ uid, onClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateUserModal;
