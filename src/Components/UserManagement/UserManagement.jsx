import { useState } from "react";
import { Search, Edit, Trash, Plus } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  const sampleUsers = [
    { id: 1, name: "Sheikh Sadi", email: "sheikhshaadi137@gmail.com", username: "sadi", role: "Admin", status: "Active" },
    { id: 2, name: "Tamjid Bond", email: "bondtamid@gmail.com", username: "tamjid", role: "User", status: "Inactive" },
  ];

  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 11;
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // New User State
  const [newUser, setNewUser] = useState({ name: "", email: "", username: "" });

  // Handle input change for new user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.username) {
      toast.error('Please fill all fields!');
      return;
    }

    const newUserData = {
      id: users.length + 1,
      ...newUser,
      role: "User",
      status: "Active",
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: "", email: "", username: "" });
    toast.success('User added successfully! 🎉', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.id.toString().includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Pagination calculation
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handling editing
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const saveUserChanges = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null); // Close modal
  };

  // Handling deleting
  const handleDelete = (userId) => {
    setConfirmDelete(userId);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(user => user.id !== confirmDelete));
    setConfirmDelete(null); // Close confirmation
    toast.error('User deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center text-white py-20">
      <div className="mb-6 text-center">
        <h2 className="ms:text-4xl font-extrabold drop-shadow-lg text-lg sm:text-3xl md:text-4xl">User Management</h2>
        <p className="text-lg opacity-80">Manage your users efficiently with this dashboard!</p>
      </div>

      {/* Add New User Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-7xl flex flex-col sm:flex-row items-center gap-6">
        <h3 className="text-xl font-semibold mb-4 sm:mb-0 text-center">Add New User</h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-lg w-full sm:w-1/3 bg-white/40 text-gray-900 placeholder-gray-700"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg w-full sm:w-1/3 bg-white/40 text-gray-900 placeholder-gray-700"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-lg w-full sm:w-1/3 bg-white/40 text-gray-900 placeholder-gray-700"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4  flex items-center py-2 rounded-lg mt-4 sm:mt-0 sm:ml-4"
            onClick={handleAddUser}
          >
            <Plus /> Added
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by name, email, username"
              className="border p-2 rounded-lg w-full md:w-[300px] bg-white/40 text-gray-900 placeholder-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
           
          </div>
        </div>

      </div>

      {/* User Table */}
      <div className="bg-white/20 backdrop-blur-md p-6 mt-6 rounded-2xl shadow-lg w-full max-w-7xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/30 text-left">
                {["ID", "Name", "Email", "Username", "Role", "Status", "Actions"].map((header, index) => (
                  <th key={index} className="p-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-300 hover:bg-white/40 transition">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.status}</td>
                  <td className="p-3 flex space-x-3">
                    <button className="text-blue-300 hover:text-blue-500 transition" onClick={() => handleEdit(user)}>
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-300 hover:text-red-500 transition" onClick={() => handleDelete(user.id)}>
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded-lg transition ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-white text-lg">{`Page ${currentPage}`}</span>
        <button
          className={`px-4 py-2 rounded-lg transition ${currentUsers.length < usersPerPage ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"}`}
          disabled={currentUsers.length < usersPerPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>


      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              className="border p-2 mb-4 rounded-lg w-full"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
            <input
              type="email"
              className="border p-2 mb-4 rounded-lg w-full"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 mb-4 rounded-lg w-full"
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => saveUserChanges(editingUser)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={confirmDeleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
};

export default UserManagement;
