import React, { useState } from "react";

const Library = ({ editTarg, myLib }) => {
  const [viewMode, setView] = useState("added");

  /* Book Rendering Logic */
  let renderedBooks;

  let ascLib;
  let descLib;

  if (myLib.length) {
    ascLib = [...myLib].sort((a, b) => {
      let fa = a.Title.toLowerCase(),
        fb = b.Title.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  if (myLib.length) {
    descLib = [...ascLib].reverse();
  }

  if (myLib.length && viewMode === "added") {
    renderedBooks = myLib.map((book) => {
      return (
        <div
          key={`book${book.Title}${book.Description}`}
          className="book text-left shadow-2xl px-5 py-2 rounded-md border border-black cursor-pointer"
          onClick={() => editTarg(book.Title)}
        >
          <div className="flex flex-row justify-between">
            <div className="titleYear flex flex-row">
              <h3 className="text-xl">{book.Title}</h3>
              <p className="ml-4 text-xl">({book.Published})</p>
            </div>
            <h3 className="text-xl">{book.Author}</h3>
          </div>
          <p className="my-2">{book.Description}</p>
        </div>
      );
    });
  } else if (myLib.length && viewMode === "titleasc") {
    renderedBooks = ascLib.map((book) => {
      return (
        <div
          key={`book${book.Title}${book.Description}`}
          className="book text-left shadow-2xl px-5 py-2 rounded-md border border-black cursor-pointer"
          onClick={() => editTarg(book.Title)}
        >
          <div className="flex flex-row justify-between">
            <div className="titleYear flex flex-row">
              <h3 className="text-xl">{book.Title}</h3>
              <p className="ml-4 text-xl">({book.Published})</p>
            </div>
            <h3 className="text-xl">{book.Author}</h3>
          </div>
          <p className="my-2">{book.Description}</p>
        </div>
      );
    });
  } else if (myLib.length && viewMode === "titledes") {
    renderedBooks = descLib.map((book) => {
      return (
        <div
          key={`book${book.Title}${book.Description}`}
          className="book text-left shadow-2xl px-5 py-2 rounded-md border border-black cursor-pointer"
          onClick={() => editTarg(book.Title)}
        >
          <div className="flex flex-row justify-between">
            <div className="titleYear flex flex-row">
              <h3 className="text-xl">{book.Title}</h3>
              <p className="ml-4 text-xl">({book.Published})</p>
            </div>
            <h3 className="text-xl">{book.Author}</h3>
          </div>
          <p className="my-2">{book.Description}</p>
        </div>
      );
    });
  } else {
    return (renderedBooks = <p>Please add a book to your library!</p>);
  }

  return (
    <div className="Library w-[80%] lg:w-[40%] mx-auto">
      <div className="librarySorter text-right">
        <p>Sort Order</p>
        <select
          name="sort"
          id="sort"
          className="py-1 px-3 border border-black"
          onChange={(e) => setView(e.target.value)}
        >
          <option value="added">Order Added</option>
          <option value="titleasc">Title- Ascending</option>
          <option value="titledes">Title- Descending</option>
        </select>
      </div>
      <div className="libraryDisp my-5">{renderedBooks}</div>
    </div>
  );
};

export default Library;
