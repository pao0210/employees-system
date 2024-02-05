import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../static/Employees.css";
import Navbar from "./Navbar";

function Tasks(props) {
  const { currentUser } = props;
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});

  const handleTask = async (event) => {
    const taskid = event.target.value;
    const userid = 2;

    await Axios.put(`http://localhost:3001/api/accepttask/${taskid}`, {
      userid: userid
    }).then((response) => {
      if (response.data.status === "ok") {
        alert("Accepted task!");
        console.log("success");
      } else {
        console.log("fail");
      }
    })
    window.location.reload();
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/gettasks").then((response) => {
      setTasks(response.data.tasks);
    });

    const temp = localStorage.getItem("user");
    const userTemp = JSON.parse(temp);
    Axios.get(`http://localhost:3001/api/users/${userTemp.email}`).then(
      (response) => {
        console.log(response.data.result[0]);
        setUser(response.data.result[0]);
      }
    );
  }, []);

  return (
    <>
      <Navbar isStaff={user.isStaff} />
      { user.isStaff === 0 ? (
      <div>
        <h1 style={{ margin: "10px" }}>Tasks</h1>
        {tasks.map((task, index) => {
          if (task.userid !== null) { return null; } else {
            return (
              <div key={index}>
                <div className="employees">
                  <div className="employee">
                    <p>
                      Name: {task.taskname}
                    </p>
                    <p>Description: {task.description}</p>
                    <div
                      style={{
                        justifyContent: "flex-end",
                        marginTop: "5px",
                        display: "flex",
                      }}
                    ></div>
                    <button style={{ margin: "5px" }} value={task.taskid} onClick={handleTask}>Accept</button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      ) : ( null
    //   <div>
    //     <h1 style={{ margin: "10px" }}>Employees</h1>
    //     <div className="employees">
    //       {getEmp.map((employee, index) => {
    //         const link = `/update/${employee.id}`;
    //         return (
    //           <div className="employee" key={index}>
    //             <p>
    //               Name: {employee.name} {employee.surname}
    //             </p>
    //             <p>Position: {employee.position}</p>
    //             <p>Salary: {employee.salary}</p>
    //             <div
    //               style={{
    //                 justifyContent: "flex-end",
    //                 marginTop: "5px",
    //                 display: "flex",
    //               }}
    //             >
    //               <Link to={link}>
    //                 <button style={{ margin: "5px" }}>Update</button>
    //               </Link>
    //               <button
    //                 style={{ margin: "5px" }}
    //                 onClick={handleDelete}
    //                 value={employee.id}
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
      )}
    </>
  );
}

export default Tasks;
