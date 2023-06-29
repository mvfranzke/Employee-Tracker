//import connection.js file
const connection = require("./connection");

//define class name DB
class DB {
  // set function constructor to take connection parameter and assign it to this.connection property
  constructor(connection) {
    this.connection = connection;
  }

  //viewAllDepartments without having the index to appear on the table
  viewAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  //viewAllRoles to display all roletable content with department_id
  viewAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  //viewAllEmployees, table to reflect roles, salaries, dept and manager_id

  viewAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  //addDepartment, passing department parameter to create a new line of department in department table
  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  //addRole insert a new line of role in role table, passing role parameter
  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // Create a new line of exployee, with first name, last name, manager and role id and adds it on the employeee table
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // update an existing employees role, passing employee id and role id parameter to update in employee table
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  // deletes an employee based from employee id entered in employee table
  removeEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }
}

//exports DB passing connecion parameter to be used in index.js file
module.exports = new DB(connection);
