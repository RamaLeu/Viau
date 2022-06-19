import React, {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';

const Register = (props) => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPass, setRepeatPass] = useState("");

    function registerUser(e){
        e.preventDefault();
        let isValid = true;
        if (password !== repeatPass){
            isValid = false;
        }

        if(isValid){
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(password, salt);
            const passHash2 = bcrypt.hashSync(passHash, salt);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: username,
                    password: passHash2,
                    type: "admin",
                    salt: salt })
            };
            fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/user', requestOptions)
                .then(response => response.json())
                .then(data => props.setCurrentUser(data.data.user));
        }
    }
    

  return (
    <div className='authPage'>
        <form onSubmit={(e)=>{registerUser(e)}} className="authForm">
            <input type="text" placeholder='Vartotojo vardas' onChange={(e)=>{setUsername(e.target.value)}} value={username} required></input>
            <input type="password" placeholder='Slaptažodis' onChange={(e)=>{setPassword(e.target.value)}} value={password} required></input>
            <input type="password" placeholder='Pakartoti slaptažodį' onChange={(e)=>{setRepeatPass(e.target.value)}} value={repeatPass} required></input>
            <input type="submit" className='roundedBtn' value="Registruotis"></input>
        </form>
    </div>
  )
}

export default Register