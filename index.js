//imports inquirer package and queries.js from db folder
const { prompt } = require("inquirer");
const db = require("./db/queries");

init();

//init function to display main menu
function init() {
  loadMainMenu();
}

//prompts main menu fuction, displays menu for users to choose from
function loadMainMenu() {
  prompt([
    {
      type: "list",
      name: "menu",
      message: "MENU: ",
      choices: [
        {
          name: "VIEW ALL DEPARTMENTS: ",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "VIEW ALL ROLES:",
          value: "VIEW_ROLES",
        },
        {
          name: "VIEW ALL EMPLOYEES",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "ADD DEPARTMENT",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "ADD ROLE",
          value: "ADD_ROLE",
        },
        {
          name: "ADD EMPLOYEE",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "UPDATE EMPLOYEE ROLE",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "REMOVE EMPLOYEE",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "QUIT",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let menu = res.menu;
    // switch case to call out function based from the users selection from main menu
    switch (menu) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      default:
        quit();
    }
  });
}

// displays all content from the department table, invoking viewAllDepartments function from class DB in queries.js
function viewDepartments() {
  db.viewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainMenu());
}

// displays all roles with department id, invoking viewAllRoles function from class DB in queries.js
function viewRoles() {
  db.viewAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainMenu());
}
// displays all employees reflecting roles, salaries dept and manager, invoking viewAllEmployees function from class DB in queries.js
function viewEmployees() {
  db.viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainMenu());
}

// create a new line of department in department table, invoking addDepartment function from class DB in queries.js
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "DEPARTMENT NAME: ",
    },
  ]).then((res) => {
    let name = res;
    db.addDepartment(name)
      .then(() => console.log(`Successfully added : ${name.name} , in department table`))
      .then(() => loadMainMenu());
  });
}

// insert a new line of role in role table invoking addRole function inside queries.js db folder, uses viewAllDepartments to map department selection in prompt
function addRole() {
  db.viewAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "NEW ROLE: ",
      },
      {
        name: "salary",
        message: "SALARY: ",
      },
      {
        type: "list",
        name: "department_id",
        message: "ASSIGNED DEPARTMENT: ",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.addRole(role)
        .then(() => console.log(`New role:  ${role.title} , successfully added in the role table`))
        .then(() => loadMainMenu());
    });
  });
}

 // Create a new line of exployee and adds it on the employeee table
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "FIRST NAME: ",
    },
    {
      name: "last_name",
      message: "LAST NAME: ",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.viewAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "EMPLOYEE ROLE: ",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.viewAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "EMPLOYEE MANAGER: ",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`New employee:  ${firstName} ${lastName} successfully added in the roster.`)
            )
            .then(() => loadMainMenu());
        });
      });
    });
  });
}

  // update an existing employees role, passing employee id and role id parameter to update in employee table
function updateEmployeeRole() {
  db.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "EMPLOYEE :",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.viewAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "NEW ROLE: ",
            choices: roleChoices,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("EMPLOYEE UPDATED IN ROSTER"))
          .then(() => loadMainMenu());
      });
    });
  });
}

  // deletes an employee based from employee id entered in employee table
function removeEmployee() {
  db.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "EMPLOYEE: ",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("EMPLOYEE REMOVED IN ROSTER"))
      .then(() => loadMainMenu());
  });
}

// Exit the application
function quit() {
  console.log("Logging Off Application.");
  process.exit();
}
