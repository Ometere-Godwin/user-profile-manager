"use client";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import axios from "axios";
import UserList from "./components/UserList";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleAddUser = (user: User) => {
    setUsers([...users, user]);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <main className="container border mt-20 mx-auto p-2 flex flex-col gap-7">
      <span className="font-bold text-2xl">User Profile Manager</span>
      <UserForm
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        editingUser={editingUser}
      />

      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUSer={handleDeleteUser}
      />
    </main>
  );
}
