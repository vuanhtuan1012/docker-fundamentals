import { useState, type SetStateAction, type Dispatch } from "react";
import type { ApiUser } from "../types/user";

export function EditUserForm({user, setIsEditing} : {user: ApiUser, setIsEditing: Dispatch<SetStateAction<boolean>>}){
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    city: user.city,
    company: user.name,
  });

  return (
    <form className="user-edit-form">
      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
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
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>

        <button type="submit" className="save-button">
          Save
        </button>
      </div>
    </form>
  )
}