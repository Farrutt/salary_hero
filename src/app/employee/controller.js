import EmployeeService from "./service";

class EmployeeController {
    static createEmployee(req, res) {
        EmployeeService.createEmployee(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static updateEmployee(req, res) {
        EmployeeService.updateEmployee(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static readEmployee(req, res) {
        EmployeeService.readEmployee(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static importEmployee(req, res) {
        EmployeeService.importEmployee(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    
}

export default EmployeeController;
