import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../static/Employees.css";
import Navbar from "./Navbar";

function Employees(props) {
  const { getEmp } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    Axios.post(
      "http://localhost:3001/api/verify",
      {},
      { headers: headers }
    ).then((response) => {
      if (response.data.status === "ok") {
        console.log("success");
      } else {
        console.log("fail");
        localStorage.removeItem("token");
        window.location = "/";
      }
    });

    const temp = localStorage.getItem("user");
    const userTemp = JSON.parse(temp);
    Axios.get(`http://localhost:3001/api/users/${userTemp.email}`).then(
      (response) => {
        // console.log(response.data.result[0]);
        setUser(response.data.result[0]);
        props.sendUser(response.data.result[0]);
      }
    );

  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const id = event.target.value;

    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((result) => {
      console.log(result.status);
      window.location.reload();
    });
  };

  return (
    <>
      <Navbar isStaff={user.isStaff} />
      {user.isStaff === 0 ? (
        <div>
          <h1 style={{ margin: "10px" }}>My information</h1>
          <div className="employees">
            <div className="employee">
              <p>Name: {user.name} {user.surname}</p>
              <p>Position: {user.position}</p>
              <p>Salary: {user.salary}</p>
              <div
                style={{
                  justifyContent: "flex-end",
                  marginTop: "5px",
                  display: "flex",
                }}
              >
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 style={{ margin: "10px" }}>Employees</h1>
          <div className="employees">
            {getEmp.map((employee, index) => {
              const link = `/update/${employee.id}`;
              return (
                <div className="employee" key={index}>
                  <p>Name: {employee.name} {employee.surname}</p>
                  <p>Position: {employee.position}</p>
                  <p>Salary: {employee.salary}</p>
                  <div
                    style={{
                      justifyContent: "flex-end",
                      marginTop: "5px",
                      display: "flex",
                    }}
                  >
                    <Link to={link}>
                      <button style={{ margin: "5px" }}>Update</button>
                    </Link>
                    <button
                      style={{ margin: "5px" }}
                      onClick={handleDelete}
                      value={employee.id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Employees;
