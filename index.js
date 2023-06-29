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

//list all content of employees table with salaries, department and managers column included
function viewEmployees() {
  db.viewAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => loadMainMenu());
}

//adds new department in department table
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Enter new department name: "
    }
  ])
  .then (res => {
    let name = res;
    db.addNewDepartment(name)
    .then(() => console.log(`New department name: ${name.name},  successfully added.`))
    .then(()=> loadMainMenu())
  })
}

//add a new role in role table
function addRole() {
  db.viewAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoice = departments.map(({ id, name}) => ({ name: name, value: id}));
    
    prompt([
      {
        name: "title",
        message: "Enter New Role Title: "
      },
      {
        name: "salary",
        message: "Enter Salary: "
      },
      {
       type: "list",
       name: "department_id",
       message: "Select department: ",
       choices: departmentChoice
      }
    ]).then(role => {
      db.addRole(role)
      .then(() => console.log(`New Role: ${role.title}, successfully added.`))
      .then(() => loadMainMenu())
    })
  })
}

//add a new employee in employee table
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "First Name: "
    },
    {
      name: "last_name",
      message: "Last Name:"
    }
  ])
  .then (res => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.viewAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoice = roles.map(({ id, title }) => ({
          name: title, value: id
        }));

        prompt({
          type: "list",
          name: "roleID",
          message: "Role Title: ",
          choices: roleChoice
        })
          .then(res => {
            let roleID = res.roleID;

            db.viewAllEmployees()
            .then(([rows]) => {
              let employees = rows;
              const managerChoice = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`, value: id
              }));
              
              managerChoice.unshift({name: "None", value: null});

              prompt({
                type: "list",
                name: "managerID",
                message: "Manager name:",
                choices: managerChoice
              })
                .then(res => {
                  let employee = {
                    manager_id: res.managerID,
                    roleID: roleID,
                    first_name: firstName,
                    last_name: lastName
                  }

                  db.createEmployee(employee);
                })
                  .then(() => console.log(
                    `New Employee: ${firstName} ${lastName}, successfully added.`
                  ))
                  .then(()=>loadMainMenu)
            })

         })

      })
  })
}


//updates the role of existing employee
function updateEmployeeRole() {
  db.viewAllEmployees()
  .then (([rows])=>{
    let employees = rows;
    const employeeChoice = employees.map(({ id, first_name,last_name}) => ({ name: `${first_name} ${last_name}`, value: id }));


    prompt([
      {
        type: "list",
        name: "employeeID",
        message: "Select employee to update: ",
        choices: employeeChoice
      }
    ])
        .then(res => {
          let employeeID = res.employeeID;
          db.viewAllRoles()
            .then(([rows])=> {
              let roles = rows;
              const roleChoice = roles.map(({id, title}) => ({
                name: title, value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "roleID",
                  message: "Select new role title: ",
                  choices: roleChoice
                }
              ])
                .then(res => db.updateEmployeeRole(employeeID, res.roleID))
                .then(() => console.log (`Role successfully updated.`))
            });
        });
  })
}


function removeEmployee() {}


function exit() {}

