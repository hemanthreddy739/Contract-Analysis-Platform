import React from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DocumentUpload from './components/Upload/DocumentUpload';

function App() {
  return (
    <div>
      <Login />
      <Register />
      <DocumentUpload />
    </div>
  );
}

export default App;
