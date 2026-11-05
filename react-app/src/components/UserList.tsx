import type { User } from "../types/user";

type UserItemProps = {
  user: User;
  onDelete: (id: number) => void;
};
type UserListProps = {
  users: User[];
  onDelete: (id: number) => void;
}

function UserItem({ user, onDelete }: UserItemProps) {
  return (
    <li className="user-row">
      <span className="user-name">{user.name}</span>
      <span className="user-email">{user.email}</span>
      <span className="user-age">
        {user.age !== undefined
          ? <span className="user-age">Age: {user.age}</span>
          : <span />
        }
      </span>
      <span
        className={user.isActive ? 'status-active' : 'status-inactive'}
      >
        {user.isActive ? 'Active' : 'Inactive'}
      </span>
      <button
        type="button"
        className="btn-delete"
        onClick={() => onDelete(user.id)}
        aria-label={`Delete ${user.name}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="m19 6-1 14H6L5 6" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      </button>
    </li>
  )
};

export function UserList({ users, onDelete }: UserListProps) {
  return (
    <ul className="users-list">
      {users.map(
        user => <UserItem key={user.id} user={user} onDelete={onDelete} />
      )}
    </ul>
  )
};