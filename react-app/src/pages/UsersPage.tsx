import { useState } from 'react'

import { UserCardGrid } from '../components/UserCard';
import { UserList } from '../components/UserList';
import { AddUserForm } from '../components/AddUserForm';

import type { User, UserDataRequest } from '../types/user';


function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30, isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25, isActive: false },
    { id: 3, name: 'Alex Martin', email: 'alex.martin@example.com', age: 35, isActive: true },
  ]);
  const [nextId, setNextId] = useState(users.length + 1);

  function handleDeleteUser(id: number) {
    setUsers(users.filter(user => user.id !== id));
  }

  function handleAddUser(userData: UserDataRequest) {
    const newUser = { id: nextId, ...userData };
    setUsers(users => [...users, newUser]);
    setNextId(nextId => nextId + 1);
  }

  return (
    <>
      <h1 className="app-title">In-Memory Users Management</h1>

      <section className="cards-section">
        <h2 className="section-title">User Cards</h2>
        <UserCardGrid users={users} />
      </section>

      <section className="users-section">
        <h2 className="section-title">User List</h2>
        <p className="users-total">
          Total users: <span>{users.length}</span>
        </p>
        <UserList users={users} onDelete={handleDeleteUser} />
      </section>

      <section className="add-user-section">
        <h2 className="section-title">Add User</h2>
        <AddUserForm onAdd={handleAddUser} />
      </section>
    </>
  )
}

export default UsersPage;