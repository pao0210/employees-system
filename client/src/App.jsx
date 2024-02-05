import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./components/Employees";
import InsertEmp from "./components/InsertEmp";
import UpdateEmp from "./components/UpdateEmp";
import Login from "./components/Login";
import Tasks from "./components/Tasks";

function App() {
  const [employees, setEmployees] = useState([]);
  const [user, setcurrectUser] = useState({});

  const currentUser = (receiveUser) => {
    // console.log("currentUser");
    // console.log(receiveUser);
    setcurrectUser(receiveUser);
  }
  // console.log(user);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getemployees").then((response) => {
      // console.log(response.data.employees);
      setEmployees(response.data.employees);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Employees getEmp={employees} sendUser={currentUser} />} />
        <Route path="/create" element={<InsertEmp />} />
        <Route path="/update/:id" element={<UpdateEmp />} />
        <Route path="/tasks" element={<Tasks currentUser={user} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
