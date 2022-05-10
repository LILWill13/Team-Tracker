// imports the exports of the addDB file
const dbs = require("./conection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(dbs) {
      this.connection = dbs;
    }
  
    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    viewEmployees() {
      return this.connection.promise().query(
        "SELECT * FROM employee",
      );
    }
    viewDepartments() {
      return this.connection.promise().query(
        "SELECT * FROM department",
      );
    }
    viewRoles() {
      return this.connection.promise().query(
        "SELECT * FROM role",
      );
    }
    addDepartment(department) {
      return this.connection.promise().query(
        "INSERT INTO department SET ?", department
      );
    }
    addRole(role) {
      return this.connection.promise().query(
        "INSERT INTO role SET ?", role
      );
    }
    addEmployee(employee) {
      return this.connection.promise().query(
        "INSERT INTO employee SET ?", employee
      );
    }
    updateRole(employeesId, roleId) {
      return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeesId]
      );
    }
}

module.exports = new DB(dbs);
  