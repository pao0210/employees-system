const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = "mysecretkey";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  localhost: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employeesdb",
});

app.get("/api/getemployees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err, status: "error", message: "Fail getted employees" });
    } else {
      res.send({
        employees: result,
        status: "ok",
        message: "Employees fetched successfully",
      });
    }
  });
});

app.get("/api/users/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT * FROM employees WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err, status: "error" });
      } else {
        res.send({ result: result, status: "ok" });
      }
    }
  );
});

app.post("/api/insert", (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  const name = req.body.name;
  const surname = req.body.surname;
  const position = req.body.position;
  const salary = req.body.salary;
  const isStaff = req.body.isStaff;
  db.query(
    "INSERT INTO employees (email, password, name, surname, position, salary, isStaff) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [email, password, name, surname, position, salary, isStaff],
    (err, result) => {
      if (err) {
        res.send({
          err: err,
          status: "error",
          message: "This employee already exists",
        });
      } else {
        res.send({
          result: result,
          status: "ok",
          message: "Employee added successfully",
        });
      }
    }
  );
});

app.put("/api/update/:id", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const position = req.body.position;
  const salary = req.body.salary;
  db.query(
    "UPDATE employees SET name = ?, surname = ?, position = ?, salary = ? WHERE id = ?",
    [name, surname, position, salary, id],
    (err, result) => {
      if (err) {
        res.send({
          err: err,
          status: "error",
          message: "Fail updated employee",
        });
      } else {
        res.send({
          result: result,
          status: "ok",
          message: "Employee updated successfully",
        });
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send({ err: err, status: "error", message: "Fail deleted employee" });
    } else {
      res.send({
        result: result,
        status: "ok",
        message: "Employee deleted successfully",
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM employees WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err, status: "error", message: "Fail login" });
      }
      console.log(result);
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id: id }, secret, { expiresIn: "1h" });
            res.send({
              result: result,
              token: token,
              status: "ok",
              message: "Login successfully",
            });
          } else {
            res.send({ err: err, status: "error", message: "Invalid login" });
          }
        });
      } else {
        res.send({ err: err, status: "error", message: "User doesn't exist" });
      }
    }
  );
});

app.post("/api/verify", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decode = jwt.verify(token, secret);
    res.json({ message: "Token valid", status: "ok" });
  } catch (err) {
    res.json({ err: err, status: "error", message: "Invalid token" });
  }
});

app.get("/api/gettasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err, status: "error", message: "Fail getted tasks" });
    } else {
      res.send({
        tasks: result,
        status: "ok",
        message: "Tasks fetched successfully",
      });
    }
  });
});

app.put("/api/accepttask/:id", (req, res) => {
    const taskid = req.params.id
    const userid = req.body.userid
    db.query("UPDATE tasks SET userid = ? WHERE taskid = ?", [userid, taskid], (err, result) => {
        if (err) { res.send({ err: err, status: "error", message: "Fail accepted task" }) }
        else { res.send({ result: result, status: "ok", message: "Task accepted successfully" }) }
    })
})

app.listen(3001, () => {
  console.log("server is running...");
});
