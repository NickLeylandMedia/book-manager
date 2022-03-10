const BookAdder = ({ setID, getBooks }) => {
  return (
    <div className="BookAdder">
      <p>Add a book by open library ID number.</p>
      <form action="" className="bookForm my-3">
        <input
          className="border border-black text-center py-1"
          type="text"
          placeholder="OLID"
          onChange={(e) => setID(e.target.value)}
        />
        <button
          onClick={getBooks}
          className="addBook px-2 py-1 mx-3 rounded-md bg-green-500 text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default BookAdder;
