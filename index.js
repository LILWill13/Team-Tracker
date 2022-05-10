// requires inquirer libary
const  { prompt } = require("inquirer");
// imports all exports from db folder
const db = require("./db");
// require console.table libary
require("console.table");


function questions(){
    prompt([
        {
            type: 'list',
            name: 'options',
            message: "What will you be handing today",
            choices:[
                {
                    name: 'View departments',
                   value: "vd",
                },
                {
                    name: 'View roles',
                   value: "vr",
                },
                {
                    name: 'View employees',
                   value: "ve",
                },
                {
                    name: 'Add deparment',
                   value: "ad",
                },
                {
                    name: 'Add role',
                   value: "ar",
                },
                {
                    name: 'Add employee',
                   value: "ae",
                },
                {
                  name: 'Update role',
                  value: "u"
                },
            ],
        }
    ])
    .then(res =>{
        let results = res.options;
        
        switch(results){
            case 'vd':
                viewDepartments();
                break;
            case 'vr':
                viewRoles();
                break;
            case 've':
                viewEmployees();
                break;
            case 'ad':
                addDepartment();
                break;
            case 'ar':
                addRoles();
                break;
            case 'ae':
                addEmployee();
                break;
            case 'u':
                updateRole();
                break; 
        };
    });
};
function viewDepartments() {
  db.viewDepartments()
  .then(([data]) => { console.table(data) })
  .then(() => questions());
};

function viewEmployees() {
  db.viewEmployees()
  .then(([data]) => { console.table(data) })
  .then(() => questions());
};

function viewRoles() {
  db.viewRoles()
  .then(([data]) => { console.table(data) })
  .then(() => questions());
};

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the department?"
    }
  ])
  .then(res => {
    db.addDepartment(res).then(() => questions());
  });
};

function addRoles() {
  db.viewDepartments()
  .then(([data]) => {
    const departments = data.map(({ id, name }) => ({ name: name, value: id}));
    prompt([
      {
        name: "title",
        message: "What is the role?"
      },
      {
        name: "salary",
        message: "What is this role's salary?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department is the role?",
        choices: departments
      }
    ])
    .then(role => {
      db.addRole(role).then(() => questions());
    });
  });
};

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Employee first name?"
    },
    {
      name: "last_name",
      message: "Employee last name?"
    }
  ])
  .then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    db.viewRoles()
  .then(([data]) => {
    const roles = data.map(({ id, title }) => ({ name: title, value: id}));
      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roles
      })
      .then(res => {
        let roleId = res.roleId;
        db.viewEmployees()
        .then(([data]) => {
          const managers = data.map(({ first_name, last_name }) => ({name: `${first_name} ${last_name}`,value: id}));
          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the manger",
            choices: managers
          })
          .then(res => {
            let employee = {
              manager_id: res.managerId,
              role_id: roleId,
              first_name: firstName,
              last_name: lastName
            }
            db.addEmployee(employee);
          })
          .then(() => questions())
        });
      });
    });
  });
};

function updateRole() {
  db.viewEmployees()
  .then(([data]) => {
    const employees = data.map(({ id, first_name, last_name }) => (
      {name: `${first_name} ${last_name}`,value: id }
    ));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Who's role do you want to change",
        choices: employees
      }
      ])
    .then(res => {
      let employeeId = res.employeeId;
      db.viewRoles()
      .then(([data]) => {
        const roles = data.map(({ id, title }) => ({
          name: title,
          value: id
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role will the employee have?",
            choices: roles
          }
        ])
        .then(res => db.updateRole(employeeId, res.roleId))
        .then(() => questions())
      });
    });
  })
}

questions()
