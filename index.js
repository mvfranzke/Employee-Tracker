//import inquirer and contents from db folder
const {prompt} = require ("inquirer");
const db = require("./db");

//invoke init function to load main menu option
init();

function init() {
  loadMainMenu();
}

function loadMainMenu() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Menu:",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View ALL Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employess",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Exit",
          value: "EXIT"
        }
      ]
    }
  ]).then (res => {
    let menu = res.menu;

    switch (menu) {
      case "VIEW_DEPARTMENTS":viewDepartments();
      break;
      case "VIEW_ROLES":viewRoles();
      break;
      case "VIEW_EMPLOYEES":viewEmployees();
      break;
      case "ADD_DEPARTMENT":addDepartment();
      break;
      case "ADD_ROLE":addRole();
      break;
      case "ADD_EMPLOYEE":addEmployee();
      break;
      case "UPDATE_EMPLOYEE_ROLE":updateEmployeeRole();
      break;
      case "REMOVE_EMPLOYEE":removeEmployee();
      break;
      default: exit();
    }
  }) 
}
