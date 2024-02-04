import React from 'react'
import Axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';

function UpdateEmp(props) {
    const { id } = useParams();

    useEffect(() => {
    console.log(id);
    console.log('hello');
    }, []);

    const { getEmp } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.id.value);
        const name = event.target.name.value;
        const surname = event.target.surname.value;
        const position = event.target.position.value;
        const salary = event.target.salary.value;

        Axios.put(`http://localhost:3001/api/update/${id}`, {
            id: id,
            name: name,
            surname: surname,
            position: position,
            salary: salary
        }).then(() => {
            alert("success");
            window.location.href = '/home';
        })
    };

  return (
    <>
    <Navbar />
    <div>
        <h1>Update information of employee</h1>
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
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

export default UpdateEmp