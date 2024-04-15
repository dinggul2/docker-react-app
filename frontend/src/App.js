import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post(`/api/value`, { value: value })
      .then((response) => {
        if (response.data.success) {
          console.log('response:\n', response)
          setLists([...lists, response.data])
          setValue("")
        }
        else {
          alert('실패!!!')
        }
      })
  }

  useEffect(() => {
    axios.get('/api/values')
      .then((response) => {
        console.log('response:\n', response.data)
        setLists(response.data)
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {lists && lists.map((list, index) => {
          <li key={index}>{list.value}</li>
        })}
        <br />

        <div className="container">
          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="입력해 주세요..." onChange={changeHandler} value={value}>
            </input>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
