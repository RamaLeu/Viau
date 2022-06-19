import React, {useState} from 'react';
import bcrypt from 'bcryptjs';

const Login = (props) => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [rememberMe, setRememberMe] = useState(false);

    function loginUser(e){
        e.preventDefault();
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username})
        };
        fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/user/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                const passHash = bcrypt.hashSync(password, data.user.salt);
                const passHash2 = bcrypt.hashSync(passHash, data.user.salt);
                if(data.user.password === passHash2){
                    if(rememberMe){
                        localStorage.setItem("user", data.user._id);
                    }
                    props.setCurrentUser(data.user);
                }
            });
    }
  return (
    <div className='authPage'>
        <form onSubmit={(e)=>{loginUser(e)}} className="authForm">
            <input type="text" placeholder='Vartotojo vardas' onChange={(e)=>{setUsername(e.target.value)}} value={username} required></input>
            <input type="password" placeholder='Slaptažodis' onChange={(e)=>{setPassword(e.target.value)}} value={password} required></input>
            <div className='rememberLine'>
            <label for="rememberMe">Atsiminti mane</label>
            <input type="checkbox" onChange={()=>{setRememberMe(!rememberMe)}} id="rememberMe" name="rememberMe"></input>
            </div>
            
            <input type="submit" className='roundedBtn' value="Prisijungti"></input>
        </form>
    </div>
  )
}

export default Login