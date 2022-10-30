import TranferService from "./service";

class TranferController {
    static tranferService(req, res) {
        TranferService.tranferService(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    
}

export default TranferController;
