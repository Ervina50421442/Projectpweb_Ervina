import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesBg from "particles-bg";
import Slide from "react-awesome-reveal"
import './App.css';

const App = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addUser = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => setUsers([...users, data]))
      .catch(error => console.error('Error adding user:', error));

    setNewUser({
      name: '',
      username: '',
      email: '',
    });
  };

  const deleteUser = id => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const editUserClick = user => {
    setEditUser(user);
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
    });
  };

  const updateUser = () => {
    fetch(`${apiUrl}/${editUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        const updatedUsers = users.map(user =>
          user.id === data.id ? data : user
        );
        setUsers(updatedUsers);
        setEditUser(null);
        setNewUser({
          name: '',
          username: '',
          email: '',
        });
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
<ParticlesBg type="cobweb" bg={true} zIndex="-1" top="0" left="0" width="100vw" height="100vh" />

    <div className="container mt-5">
    <Slide left duration={1200}>
      <h1 className="text-center mb-4">Project Crud With API-Ervina</h1>
      </Slide>
  
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Kelas"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            {editUser ? (
              <button className="btn btn-warning" onClick={updateUser}>
                Update Student
              </button>
            ) : (
              <button className="btn btn-primary" onClick={addUser}>
                Add Student
              </button>
            )}
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            {editUser && (
              <button className="btn btn-secondary" onClick={() => setEditUser(null)}>
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </div>
  
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
              <Slide left duration={1500}>
                <h5>{user.name}</h5>
                <p className="mb-0">{user.username} - {user.email}</p>
                </Slide>
              </div>
              <div>
                <button className="btn btn-info mr-2" onClick={() => editUserClick(user)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default App;
