const connection = require("./connection");
require(console.table)

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, "
        );
    }
    
    findAllPossibleManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );

    }

    createEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", 
            employee
        );
    }

    removeEmployee(employeeID) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeID
        );
    }

    updateEmployeeRole(employeeID, roleID) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleID, employeeID]
        );
    }

    updateEmployeeManager(employeeID, managerID) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerID, employeeID]
        );
    }
    
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",

        );
    }

    createRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?",
            role
        );    
    }

    removeRole(roleID) {
        return this.connection.query(
            "DELETE FROM role WHERE id = ?",
            roleID
        );    
    }
    
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name",
        );
    }

    createDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?"
        )
    }

    removeDepartment(departmentID) {
        return this.connection.query(
            "DELETE FROM department WHERE id = ?"
        )
    }

    findAllEmployeesByDepartment(departmentID) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id"
        )
    }

    findAllEmployeesByManager(managerID) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN  "
        )
    }
  }