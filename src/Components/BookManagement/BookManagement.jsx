import { Search, Plus, Edit, Trash, BookOpen } from "lucide-react";
import { useState } from "react";

const BookManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookList, setBookList] = useState([
    { id: 1, name: "Hibernate Core - 11th", type: "Educational", language: "English", availability: "Available" },
    { id: 2, name: "Spring Boot - 2nd Edition", type: "Programming", language: "English", availability: "Borrowed" },
    { id: 3, name: "JavaScript Basics", type: "Educational", language: "Spanish", availability: "Available" },
    { id: 4, name: "Data Structures in Java", type: "Technical", language: "French", availability: "Borrowed" },
    { id: 5, name: "React Handbook", type: "Programming", language: "German", availability: "Available" },
    { id: 6, name: "Python for Beginners", type: "Educational", language: "Chinese", availability: "Borrowed" },
    { id: 7, name: "Machine Learning with Python", type: "Technical", language: "English", availability: "Available" },
    { id: 8, name: "Effective Java", type: "Programming", language: "Italian", availability: "Borrowed" },
    { id: 9, name: "C++ in Depth", type: "Technical", language: "Russian", availability: "Available" },
    { id: 10, name: "Clean Code", type: "Educational", language: "Spanish", availability: "Available" },
    { id: 11, name: "The Pragmatic Programmer", type: "Programming", language: "French", availability: "Available" },
    { id: 12, name: "Design Patterns: Elements of Reusable Object-Oriented Software", type: "Technical", language: "English", availability: "Borrowed" },
    { id: 13, name: "Artificial Intelligence: A Modern Approach", type: "Technical", language: "Japanese", availability: "Available" },
    { id: 14, name: "The Clean Coder", type: "Programming", language: "English", availability: "Available" },
    { id: 15, name: "Introduction to Algorithms", type: "Educational", language: "German", availability: "Borrowed" },
    { id: 16, name: "Operating System Concepts", type: "Technical", language: "Italian", availability: "Available" },
    { id: 17, name: "The Mythical Man-Month", type: "Management", language: "Spanish", availability: "Borrowed" },
    { id: 18, name: "The Art of Computer Programming", type: "Educational", language: "French", availability: "Available" },
    { id: 19, name: "Data Science for Business", type: "Technical", language: "Russian", availability: "Available" },
    { id: 20, name: "Building Microservices", type: "Programming", language: "English", availability: "Borrowed" },
    // Adding new books:
    { id: 21, name: "Angular from Scratch", type: "Programming", language: "English", availability: "Available" },
    { id: 22, name: "Docker in Action", type: "Technical", language: "Spanish", availability: "Available" },
    { id: 23, name: "Cloud Native Development", type: "Educational", language: "German", availability: "Borrowed" },
    { id: 24, name: "Deep Learning with Python", type: "Technical", language: "French", availability: "Available" },
    { id: 25, name: "Kubernetes Handbook", type: "Programming", language: "English", availability: "Available" },
    { id: 26, name: "Swift Programming for iOS", type: "Programming", language: "Italian", availability: "Borrowed" },
    { id: 27, name: "Introduction to Machine Learning", type: "Educational", language: "Chinese", availability: "Available" },
    { id: 28, name: "Building Data-Driven Apps", type: "Technical", language: "Russian", availability: "Available" },
    { id: 29, name: "Agile Software Development", type: "Management", language: "English", availability: "Available" },
    { id: 30, name: "Clean Architecture", type: "Programming", language: "Spanish", availability: "Borrowed" },
  ]);
  
  
  const [editingBook, setEditingBook] = useState(null);
  const [newBookDetails, setNewBookDetails] = useState({
    name: "",
    type: "",
    language: "",
    availability: "Available",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Book Modal
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Filter Books based on Search Term
  const filteredBooks = bookList.filter((book) =>
    book.id.toString().includes(searchTerm) ||
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Handle Edit Book
  const handleEditClick = (book) => {
    setEditingBook(book);
    setNewBookDetails({ ...book }); // Copy the selected book details
  };

  const handleSaveEdit = () => {
    setBookList(bookList.map((book) =>
      book.id === editingBook.id ? { ...book, ...newBookDetails } : book
    ));
    setEditingBook(null);
    setNewBookDetails({ name: "", type: "", language: "", availability: "Available" });
  };

  // Handle Delete Book
  const handleDeleteClick = (id) => {
    setBookList(bookList.filter((book) => book.id !== id));
  };

  // Handle Add New Book
  const handleAddNewBook = () => {
    const newBook = {
      id: bookList.length + 1, // Simple ID generation, you can improve it
      ...newBookDetails,
    };
    setBookList([...bookList, newBook]);
    setIsAddModalOpen(false); // Close Add Book Modal
    setNewBookDetails({ name: "", type: "", language: "", availability: "Available" }); // Reset form
  };

  // Handle Page Change
  const handleNextPage = () => {
    if (currentPage * booksPerPage < filteredBooks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 min-h-screen py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
  {/* Header */}
  <div className="flex flex-wrap justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold text-gray-100 w-full md:w-auto">Book Management</h2>
    <div className="flex flex-wrap space-x-4 mt-4 md:mt-0">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Book
      </button>
      <div className="relative">
        <input
          type="text"
          placeholder=" Search by Name or Type"
          className="border border-gray-300 p-2 rounded-md outline-none pl-10 focus:ring-2 focus:ring-indigo-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute left-3 top-2 text-gray-500" />
      </div>
    </div>
  </div>

  {/* Table */}
  <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md">
    <div className="overflow-x-auto">
      <table className="w-full ">
        <thead>
          <tr className="bg-gray-200 text-left">
            {["ID", "Name", "Type", "Language", "Availability", "Action"].map((header, index) => (
              <th key={index} className=" p-2 text-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentBooks.length > 0 ? (
            currentBooks.map((book, index) => (
              <tr key={index} className="border-b hover:bg-gray-800 transition duration-200">
                <td className=" p-2">{book.id}</td>
                <td className=" p-2">{book.name}</td>
                <td className=" p-2">{book.type}</td>
                <td className=" p-2">{book.language}</td>
                <td className={` p-2 ${book.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                  {book.availability}
                </td>
                <td className=" p-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 transition duration-200" onClick={() => handleEditClick(book)}>
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 transition duration-200" onClick={() => handleDeleteClick(book.id)}>
                    <Trash className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 transition duration-200">
                    <BookOpen className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-100 p-4">No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Pagination Controls */}
  <div className="flex justify-between mt-4">
    <button onClick={handlePrevPage} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Previous</button>
    <button onClick={handleNextPage} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Next</button>
  </div>

  {/* Add Book Modal */}
  {isAddModalOpen && (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md w-96 max-w-full">
        <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
        <div>
          <label className="block text-gray-100">Name</label>
          <input
            type="text"
            placeholder="enter your name"
            value={newBookDetails.name}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, name: e.target.value })}
            className="border p-2 rounded-md w-full mt-2 placeholder:text-gray-200"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Type</label>
          <input
            type="text"
            value={newBookDetails.type}
            placeholder="enter your book type"
            onChange={(e) => setNewBookDetails({ ...newBookDetails, type: e.target.value })}
            className="border p-2 rounded-md w-full mt-2 placeholder:text-gray-200"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Language</label>
          <input
            type="text"
            value={newBookDetails.language}
            placeholder="enter your language"
            onChange={(e) => setNewBookDetails({ ...newBookDetails, language: e.target.value })}
            className="border p-2 rounded-md w-full mt-2 placeholder:text-gray-200"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Availability</label>
          <select
            value={newBookDetails.availability}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, availability: e.target.value })}
            className="border p-2 rounded-md w-full mt-2 hover:bg-gray-800 text-gray-200"
          >
            <option className="" value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={handleAddNewBook} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Add Book</button>
          <button onClick={() => setIsAddModalOpen(false)} className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  )}

  {/* Edit Book Modal */}
  {editingBook && (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md w-96 max-w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Book</h3>
        <div>
          <label className="block text-gray-100">Name</label>
          <input
            type="text"
            value={newBookDetails.name}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, name: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Type</label>
          <input
            type="text"
            value={newBookDetails.type}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, type: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Language</label>
          <input
            type="text"
            value={newBookDetails.language}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, language: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-100">Availability</label>
          <select
            value={newBookDetails.availability}
            onChange={(e) => setNewBookDetails({ ...newBookDetails, availability: e.target.value })}
            className="border p-2 rounded-md w-full mt-2 hover:bg-gray-800"
          >
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={handleSaveEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Save Changes</button>
          <button onClick={() => setEditingBook(null)} className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  )}

</div>

  );
};

export default BookManagement;
