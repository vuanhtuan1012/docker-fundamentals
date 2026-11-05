import { useEffect, useState } from 'react';
import type { ApiUser } from '../types/user';

type ApiUserUpdateData = Omit<ApiUser, 'id'>;
type ApiUserCardProps = {
  user: ApiUser,
  onDelete: (id: number) => void;
  onUpdate: (id: number, userData: ApiUserUpdateData) => void;
};

type UserApiResponse = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
};

type CardActionsProp = {
  id: number;
  name: string;
  toggleForm: () => void;
  onDelete: (id: number) => void;
};

type UserEditFormProps = {
  user: ApiUserUpdateData,
  onCancel: () => void,
  onSave: (userData: ApiUserUpdateData) => void
}


function delay(second: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
}

async function fetchUsers(endpoint: string, signal?: AbortSignal): Promise<ApiUser[]> {
  const network_latency = Math.round(Math.random() * 20) / 10; // second
  await delay(network_latency); // simulate network latency
  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}, API URL: ${response.url}`);
  }

  const responseUsers: UserApiResponse[] = await response.json();
  return responseUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email.toLowerCase(),
    city: user.address.city,
    company: user.company.name,
  }));
}


function CardActions({ id, name, toggleForm, onDelete }: CardActionsProp) {
  return (
    <div className="card-actions">
      <button
        type="button"
        className="edit-button"
        aria-label={`Edit ${name}`}
        title={`Edit user ${name}`}
        onClick={toggleForm}
      >
        <span aria-hidden="true">✎</span>
      </button>
      <button
        type="button"
        className="delete-button"
        aria-label={`Delete ${name}`}
        title={`Delete user ${name}`}
        onClick={() => onDelete(id)}
      >
        &times;
      </button>
    </div>
  )
}

function UserEditForm({ user, onCancel, onSave }: UserEditFormProps) {
  const [formData, setFormData] = useState<ApiUserUpdateData>({
    name: user.name,
    email: user.email,
    city: user.city,
    company: user.company,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // retrieves user details
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      company: formData.company.trim()
    }

    // validate user data
    const emptyFields = Object.entries(userData)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    if (emptyFields.length > 0) {
      alert(`The following fields cannot be empty: ${emptyFields.join(", ")}`);
      setFormData(userData);
      return;
    }

    onSave(userData);
  }

  return (
    <form className="user-edit-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      <div className="form-field">
        <label>City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) =>
            setFormData({ ...formData, city: e.target.value })
          }
          required
        />
      </div>

      <div className="form-field">
        <label>Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-button"
        >
          Save
        </button>
      </div>
    </form>
  )
}

function UserInfo({ user }: { user: ApiUserUpdateData }) {
  return (
    <>
      <div className="card-title">
        <h3>{user.name}</h3>
      </div>
      <p className="user-email">{user.email}</p>
      <p>
        <span className="field-label">City:</span> {user.city}
      </p>
      <p>
        <span className="field-label">Company:</span> {user.company}
      </p>
    </>
  )
}

function ApiUserCard({ user, onDelete, onUpdate }: ApiUserCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, ...userData } = user;

  function handleSave(userData: ApiUserUpdateData) {
    onUpdate(id, userData);
    setIsEditing(false);
  }

  return (
    <article className="user-card">
      <CardActions
        id={id}
        name={user.name}
        toggleForm={() => setIsEditing(!isEditing)}
        onDelete={() => onDelete(id)}
      />

      {
        isEditing
          ? <UserEditForm
            user={userData}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
          : <UserInfo user={userData} />
      }
    </article>
  );
}

export function ApiUserCardGrid({ endpoint }: { endpoint: string }) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function effectCallback() {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        setUsers(await fetchUsers(endpoint, controller.signal));
      } catch (err) {
        if (controller.signal.aborted) { return; }
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!controller.signal.aborted) { setLoading(false); }
      }
    }

    loadUsers();

    // return cleanup function
    return () => {
      controller.abort();
    };
  }

  useEffect(effectCallback, [endpoint]);

  function handleDeleteUser(id: number) {
    setUsers((users) => users.filter(user => user.id !== id));
  }

  function handleUpdateUser(id: number, userData: ApiUserUpdateData) {
    setUsers(
      (users) => users.map(
        (user) => user.id === id ? { ...user, ...userData } : user
      )
    );
  }

  if (loading) {
    return (
      <div className="user-card-grid">
        <div className="loading-message">
          <span className="spinner" aria-hidden="true"></span>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="user-card-grid">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="user-card-grid">
      {users.map((user) => (
        <ApiUserCard
          key={user.id}
          user={user}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      ))}
    </div>
  );
}