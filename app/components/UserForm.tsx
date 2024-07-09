"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserFormProps {
  onAddUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  editingUser: User | null;
}

export default function UserForm({
  onAddUser,
  onUpdateUser,
  editingUser,
}: UserFormProps) {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onUpdateUser(user);
    } else {
      onAddUser({ ...user, id: Date.now() });
      setUser({ id: 0, name: "", username: "", email: "" });
    }
  };

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        required
        type="text"
        placeholder="Enter name"
        onChange={handleChange}
        value={user.name}
        className="p-2 border rounded mb-2 w-full outline-none"
      />

      <input
        name="username"
        required
        type="text"
        placeholder="Enter username"
        onChange={handleChange}
        value={user.username}
        className="p-2 border rounded mb-2 w-full outline-none"
      />

      <input
        name="email"
        required
        type="text"
        placeholder="Enter valid email"
        onChange={handleChange}
        value={user.email}
        className="p-2 border rounded mb-2 w-full outline-none"
      />

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {editingUser ? "Update" : "Add"}
      </button>
    </form>
  );
}
