import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

import BookAdder from "./components/BookAdder";
import BookEditor from "./components/BookEditor";
import Library from "./components/Library";

function App() {
  //State for storing first-run state
  const isFirstRun = useRef(true);

  //State(s) to store variables
  const [appMode, setMode] = useState("library");

  const [myLib, updateLib] = useState([]);

  const [bookID, setID] = useState("");

  const [newBook, setNew] = useState({});

  const [editMode, setEdit] = useState("");

  const [targIndex, setInd] = useState();

  //Logic for saving to local storage, and loading
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (localStorage.getItem("localLib")) {
        const data = JSON.parse(localStorage.getItem("localLib"));
        updateLib(data);
      }
    }

    if (myLib.length || myLib.length === 0) {
      const payload = JSON.stringify(myLib);
      localStorage.setItem("localLib", payload);
    }
  }, [myLib]);

  //Logic for fetching book data from api/handling errors
  const getBooks = async (e) => {
    const isEmpty = (obj) => {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    };

    const checkIfTrue = () => {
      if (myLib.length) {
        const proxArr = [...myLib];
        const checkArr = [];
        proxArr.forEach((item) => {
          if (item.ID === bookID) {
            checkArr.push(true);
          }
        });
        if (checkArr.includes(true)) {
          alert("Book already in library!");
          return true;
        }
      } else {
        return false;
      }
    };
    const trueCheck = checkIfTrue();

    e.preventDefault();
    let book;

    book = await axios.get(
      `https://openlibrary.org/api/books?bibkeys=OLID:${bookID}&format=json&jscmd=data`
    );

    let check = isEmpty(book.data);

    if (trueCheck) {
      return;
    }

    if (check) {
      const target = document.querySelector(".error");
      target.classList.remove("hidden");
      return;
    } else {
      setNew(book.data[`OLID:${bookID}`]);
      setEdit("new");
      setMode("editor");
    }
  };

  //Logic for setting target state - target is used for editing and deleting books
  const editTarg = (term) => {
    let index = myLib.findIndex((book) => {
      return book.Title === term;
    });
    setEdit("old");
    setInd(index);
    setMode("editor");
  };

  //Logic for toggling viewport render
  if (appMode === "library") {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl my-3">Book Manager</h1>
        </header>
        <BookAdder setID={setID} getBooks={getBooks} />
        <p className="error hidden my-3 text-red-600">
          Please enter a valid ID!
        </p>
        <Library editTarg={editTarg} myLib={myLib} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl my-3">Book Editor</h1>
        </header>
        <BookEditor
          newBook={newBook}
          setMode={setMode}
          editMode={editMode}
          targIndex={targIndex}
          myLib={myLib}
          updateLib={updateLib}
        />
      </div>
    );
  }
}

export default App;
