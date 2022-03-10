const BookEditor = ({
  newBook,
  setMode,
  editMode,
  targIndex,
  myLib,
  updateLib,
}) => {
  //Logic for adding books to library
  const addBook = (e) => {
    e.preventDefault();
    const book = {
      ID: newBook.identifiers.openlibrary[0],
      Title: e.target.form[0].value,
      Author: e.target.form[1].value,
      Published: e.target.form[2].value,
      Description: e.target.form[3].value,
    };
    const proxArr = [...myLib];
    proxArr.unshift(book);
    updateLib(proxArr);

    setMode("library");
  };
  //Logic for pushing edits of a library book
  const editBook = (e) => {
    const book = {
      ID: myLib[targIndex].ID,
      Title: e.target.form[0].value,
      Author: e.target.form[1].value,
      Published: e.target.form[2].value,
      Description: e.target.form[3].value,
    };
    const proxArr = [...myLib];
    proxArr[targIndex] = book;
    updateLib(proxArr);
    setMode("library");
  };
  //Logic for deleting a book
  const delBook = (e) => {
    const proxArr = [...myLib];
    proxArr.splice(targIndex, 1);
    updateLib(proxArr);
    setMode("library");
  };
  //Logic for determining which library function is used
  const addLogic = (e) => {
    e.preventDefault();
    if (editMode === "new") {
      addBook(e);
    } else {
      editBook(e);
    }
  };

  /*Form Data Logic */
  //Form Data
  let formData;

  //Form Description
  let descrip;

  //Delete Button
  let delBut;

  //Logic to determine if excerpt is used
  if (newBook.excerpts) {
    descrip = newBook.excerpts[0].text;
  } else {
    descrip = "";
  }
  //Logic to determine form population based on viewport mode
  if (editMode === "new") {
    formData = {
      ID: newBook.identifiers.openlibrary[0],
      Title: newBook.title,
      Author: newBook.authors[0].name,
      Published: newBook.publish_date,
      Description: descrip,
    };
  } else {
    formData = {
      ID: myLib[targIndex].ID,
      Title: myLib[targIndex].Title,
      Author: myLib[targIndex].Author,
      Published: myLib[targIndex].Published,
      Description: myLib[targIndex].Description,
    };
    delBut = (
      <button
        onClick={delBook}
        className="bg-red-500 text-white py-1 px-16 rounded-md w-44 mx-auto"
      >
        DELETE
      </button>
    );
  }

  return (
    <div className="BookEditor flex flex-col w-[90%] lg:w-[40%] mx-auto shadow-2xl border border-black px-14 py-4 rounded-lg">
      <div className="flex flex-row justify-center my-5">
        <p className="mx-6">ID</p>
        <p className="mx-6">{formData.ID}</p>
      </div>
      <form onSubmit={addLogic} className="w-full text-left">
        <div className="flex flex-row justify-between my-2">
          <label htmlFor="title" className="w-[40%]">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="border border-black w-[60%]"
            defaultValue={formData.Title}
          />
        </div>
        <div className="flex flex-row justify-between my-2">
          <label htmlFor="author" className="w-[40%]">
            Author:
          </label>
          <input
            type="text"
            id="author"
            className="border border-black w-[60%]"
            defaultValue={formData.Author}
          />
        </div>
        <div className="flex flex-row justify-between my-2">
          <label htmlFor="pub" className="w-[40%]">
            Published:
          </label>
          <input
            type="text"
            id="pub"
            className="border border-black w-[60%]"
            defaultValue={formData.Published}
          />
        </div>
        <div className="flex flex-col my-2 text-left">
          <label htmlFor="pub">Description:</label>
          <textarea
            id="pub"
            name="pub"
            rows="10"
            cols="50"
            className="border border-black h-[250px] mt-3"
            defaultValue={formData.Description}
          ></textarea>
        </div>
        <div className="actions flex flex-row justify-evenly py-3">
          <button
            className="py-1 px-5 lg:px-16 rounded-md bg-green-500 text-white"
            onClick={addLogic}
          >
            Save
          </button>
          <button
            onClick={() => setMode("library")}
            className="bg-orange-500 text-white py-1 px-5 lg:px-16 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      {delBut}
    </div>
  );
};

export default BookEditor;
