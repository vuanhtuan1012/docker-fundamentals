import type { User, UserDataRequest } from "../types/user";

type UserCardProps = UserDataRequest;
type UserCardGridProps = {
  users: User[];
};

function UserCard({ name, email, age, isActive }: UserCardProps) {
  return (
    <article className="user-card">
      <h3>{name}</h3>

      <p className="user-email">{email}</p>
      {age !== undefined && (
        <p><span className="field-label">Age:</span> {age}</p>
      )}

      <p>
        <span className="field-label">Status:</span>
        <span className={isActive ? 'status-active' : 'status-inactive'}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
    </article>
  );
};

export function UserCardGrid({ users }: UserCardGridProps) {
  return (
    <div className="user-card-grid">
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          age={user.age}
          isActive={user.isActive}
        />
      ))}
    </div>
  )
};