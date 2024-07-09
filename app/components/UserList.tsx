interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUSer: (id: number) => void;
}

export default function UserList({
  users,
  onDeleteUSer,
  onEditUser,
}: UserListProps) {
  return (
    <>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id} className="flex items-center mb-2">
            <span className="flex-grow">{user.name}</span>
            <button
              onClick={() => onEditUser(user)}
              className="ml-2 p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteUSer(user.id)}
              className="ml-2 p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
