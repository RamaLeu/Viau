import React, {useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';


function App() {
  let [currentUser, setCurrentUser] = useState("");

  

  useEffect(() => {
		const saved = localStorage.getItem('user');
		if (saved) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
          _id: saved
				})
			};
			fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/user/savedUser', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.status === 'Success') {
						setCurrentUser(data.user);
					}
				});
		}
	}, []);

  function logout(){
    setCurrentUser("");
    localStorage.setItem('user', '');
  }
  return (
    <div className="App">
      <Router>
      <div>
        {!currentUser &&
        <nav>
          <Link to="/Register">Registruotis</Link>
          <Link to="/Login">Prisijungti</Link>
        </nav>}
        <Routes>
          <Route path="/" element={currentUser ? <Home setCurrentUser={setCurrentUser} logout={logout}/>: <Navigate to="/Login"/>}></Route>
          <Route path="/Home" element={currentUser ? <Home setCurrentUser={setCurrentUser} logout={logout}/>: <Navigate to="/Login"/>}>
          </Route>
          <Route path="/Register" element={ !currentUser ? <Register setCurrentUser={setCurrentUser} currentUser={currentUser}/>: <Navigate to="/Home"/>}>
          </Route>
          <Route path="/Login" element={ !currentUser ? <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>: <Navigate to="/Home"/>}>
          </Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
