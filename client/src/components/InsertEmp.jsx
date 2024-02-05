import React from 'react'
import Axios from 'axios'
import '../static/InsertEmp.css'
import Navbar from './Navbar'

function InsertEmp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const surname = event.target.surname.value;
        const position = event.target.position.value;
        const salary = event.target.salary.value;
        console.log(name);
        Axios.post("http://localhost:3001/api/insert", {
            email: email,
            password: password,
            name: name,
            surname: surname,
            position: position,
            salary: salary
        }).then((response) => {
            console.log(response.data.status);
            alert("success");
            window.location.reload();
        })
    }

  return (
    <>
    <Navbar />
    <div>
        <h1>Insert information of new employee</h1>
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" placeholder='Email' name="email" />
                <label>Password</label>
                <input type="password" placeholder='Password' name="password" />
            <div>
                <label>Name</label>
                <input type="text" placeholder='Name' name="name" />
                <label>Surname</label>
                <input type="text" placeholder='Surname' name="surname" />
            </div>
                <label>Position</label>
                <input type="text" placeholder='Position' name="position" />
                <label>Salary</label>
                <input type="text" placeholder='Salary' name="salary" />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default InsertEmp