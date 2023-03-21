// Defining Variables and Importing Dependencies
const inquirer = require('inquirer');
const db = require('./db/connection');

// Connect to the database and start the employee tracker
db.connect(err => {
    if (err) throw err;
	console.log("Successfully connected to the database.");
    runEmployeeTracker();
});

// Function to run the employee tracker
function runEmployeeTracker() {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees', 
            'Add a Department', 
            'Add a Role', 
            'Add an Employee', 
            'Update an Employee Role', 
            'Log Out'
        ]
    }]).then((answers) => {

        if (answers.prompt === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Departments: ");
                console.table(result);
                runEmployeeTracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Roles: ");
                console.table(result);
                runEmployeeTracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Displaying All Employees: ");
                console.table(result);
                runEmployeeTracker();
            });
        } else if (answers.prompt === 'Add a Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'Enter the name of the department you want to add:',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name.");
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Successfully added ${answers.department} to the database.`)
                    runEmployeeTracker();
                });
            })
        } else if (answers.prompt === 'Add a Role') {
            
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                // Get the list of departments for the user to choose from
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter the name of the role you want to add:',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please provide a role name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the role:',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please provide a salary!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Select the department the role belongs to:',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Get the selected department from the result
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Successfully added ${answers.role} to the database.`)
                        runEmployeeTracker();
                    });
                })
            });
        } else if (answers.prompt === 'Add an Employee') {
            // Get the list of employees and roles from the database
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employee\'s first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please enter the employee\'s first name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employee\'s last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please enter the employee\'s last name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message:                         'What is the employee\'s role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var roleArray = [...new Set(array)];
                            return roleArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employee\'s manager?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].manager_id === null) {
                                    array.push(result[i].first_name + ' ' + result[i].last_name);
                                }
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Get the selected manager and role from the result
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].first_name + ' ' + result[i].last_name === answers.manager) {
                            var manager = result[i];
                        }
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Successfully added ${answers.firstName} ${answers.lastName} to the database.`)
                        runEmployeeTracker();
                    });
                });
            });
        } else if (answers.prompt === 'Update an Employee Role') {
            // Get the list of employees and roles from the database
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([                    {                        type: 'list',                        name: 'employee',                        message: 'Which employee\'s role do you want to update?',                        choices: () => {                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var roleArray = [...new Set(array)];
                            return roleArray;
                        }
                    }
                ]).then((answers) => {
                    // Get the selected employee and role from the result
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var employee = result[i];
                        }
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role.id, employee.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Successfully updated ${employee.first_name} ${employee.last_name}'s role in the database.`)
                        runEmployeeTracker();
                    });
                });
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Goodbye!");
        }
    });
};

runEmployeeTracker();







                        