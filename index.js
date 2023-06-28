//import inquirer and contents from db folder
const {prompt} = require ("inquirer");
const db = require("./db");

//invoke init function to load main menu option
init();

function init() {
  loadMainMenu();
}

//list of main menu options available to user
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

//used switch case to call function based on users selection from main menu
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

//functions to be called from switch case based from users selection

//list all content of table department
function viewDepartments() {
  db.viewAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  })
  .then(() => loadMainMenu());
}

//list all content of table roles with department name
function viewRoles() {
  db.viewAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.log("\n");
    console.table(roles);
  })
  .then(()=> loadMainMenu());
}


function viewEmployees() {}


function addDepartment() {}


function addRole() {}


function addEmployee() {}


function updateEmployeeRole() {}


function removeEmployee() {}


function exit() {}

