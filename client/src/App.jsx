import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Employees from "./components/Employees";
import InsertEmp from "./components/InsertEmp";
import UpdateEmp from "./components/UpdateEmp";
import Login from "./components/Login";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getemployees").then((response) => {
      // console.log(response.data.employees);
      setEmployees(response.data.employees);
    });
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Employees getEmp={employees} />} />
        <Route path="/create" element={<InsertEmp />} />
        <Route path="/update/:id" element={<UpdateEmp getEmp={employees} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
