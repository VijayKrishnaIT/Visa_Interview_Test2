import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { setupAPI } from "./service";
import { createStore } from "./configureStore";
const testMode = true;
// The API is an async function.
const callAPI = setupAPI();
/*
 * Allow the user to enter a search string of a user name,
 * and render a list of results from the GitHubAPI.
 * Show user's avatar and user name in a formatted list.
 */

function App() {
  const [key, setKey] = useState("");
  const [data, setData] = useState({});
  const onKeyUp = (e) => setKey(e.target.value);
  const retriveData = async () => {
    try {
      const data = await callAPI({ q: key });
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <label>Search: </label>
      <input type="text" name="search" onKeyUp={onKeyUp} />
      <button type="button" onClick={retriveData}>
        Search
      </button>
      {data?.items?.map(({ avatar_url, login }) => (
        <div className="avatar" key={avatar_url}>
          <img className="avatar__img" src={avatar_url} alt={login} />
          <span className="avatart__name">{login}</span>
        </div>
      ))}
      <h1>Show me some users</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
