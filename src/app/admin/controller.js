import AdminService from "./service";

class AdminController {
    static addAdmin(req, res) {
        AdminService.addAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static selectAdmin(req, res) {
        AdminService.selectAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static addAdminCompany(req, res) {
        AdminService.addAdminCompany(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    
}

export default AdminController;
