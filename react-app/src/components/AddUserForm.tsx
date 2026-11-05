import { useState } from "react";
import type { UserDataRequest } from "../types/user";

type AddUserFormProps = {
  onAdd: (userData: UserDataRequest) => void;
}

export function AddUserForm({ onAdd }: AddUserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [isActive, setIsActive] = useState(true);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // retrieves user details
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const parsedAge = age.trim() === '' ? undefined : Number(age);

    // validates user data
    if (!trimmedName) {
      alert('Error: Name cannot be empty!');
      setName('');
      return;
    }
    if (!trimmedEmail) {
      alert('Error: Email cannot be empty!');
      setEmail('');
      return;
    }
    if (
      parsedAge !== undefined &&
      (!Number.isInteger(parsedAge) || parsedAge < 0)
    ) {
      alert('Error: Age must be a non-negative number!')
      setAge('');
      return;
    }

    // constructs a payload and forwards it
    const userData = {
      name: trimmedName,
      email: trimmedEmail,
      ...(parsedAge !== undefined && { age: parsedAge }),
      isActive
    }
    onAdd(userData);

    // resets form state
    setName('');
    setEmail('');
    setAge('');
    setIsActive(true);
  }

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          // required
        />
      </div>

      <div className="form-field">
        <label htmlFor="user-age">Age (optional)</label>
        <input
          id="user-age"
          type="number"
          min="0"
          step="1"
          placeholder="Enter age (optional)"
          value={age}
          onChange={event => setAge(event.target.value)}
        />
      </div>

      <div className="form-field status-field">
        <label htmlFor="user-status">Status</label>
        <div className="status-options">
          <label className="status-option">
            <input
              id="user-status"
              type="radio"
              name="user-status"
              value="active"
              checked={isActive}
              onChange={() => setIsActive(true)}
            />
            Active
          </label>

          <label className="status-option">
            <input
              type="radio"
              name="user-status"
              value="inactive"
              checked={!isActive}
              onChange={() => setIsActive(false)}
            />
            Inactive
          </label>
        </div>
      </div>

      <button type="submit" className="btn-add">
        + Add User
      </button>
    </form>
  )
}