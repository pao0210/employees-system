import Axios from 'axios';
import React from 'react'

function Login() {
    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        Axios.post("http://localhost:3001/api/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data.status);
            if (response.data.status === "ok") {
                console.log(response.data.token);
                Axios.get(`http://localhost:3001/api/users/${email}`).then((response) => {
                    console.log(response.data);
                    localStorage.setItem(
                        "user",
                        JSON.stringify({id: response.data.result[0].id, email: response.data.result[0].email})
                      );
                })
            }
            localStorage.setItem("token", response.data.token);
            window.location.href = '/home';
        }).catch((error) => {
            console.log(error);
            allert("error");
        })
        };

  return (
    <div>
        <form onSubmit={handleLogin}>
            <div style={{padding: "20px"}}>
                <label>Email</label>
                <input type="text" placeholder='enter your email' name="email" />
                <label>Password</label>
                <input type="password" placeholder='enter your password' name="password" />
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login