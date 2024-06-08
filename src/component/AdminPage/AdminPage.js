import React from 'react';

const AdminPage = ({ user }) => {
  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default AdminPage;
