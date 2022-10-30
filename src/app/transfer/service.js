import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import transferDao from "./dao";
import httpStatus from "../../master/http-status";
import AdminDao from "../admin/dao"
import EmployeeDao from "../employee/dao"
import e from "connect-timeout";

class TranferService {
    static async tranferService(body) {
        let headerData;
        let responseStatus = {};
        let responseRecord = [];
        try {
            if (!ValidateRequest.ValidateRequest(body)) {
                responseStatus = {
                    statusCode: "E",
                    errorCode: "900",
                    errorMessage: "กรุณาระบุตามเงื่อนไข",
                };
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            headerData = JsonUtils.getHeaderData(body.headerData);
            let param = body.requestRecord;
            let { employee_id, amount, year, month } = param;
            let resValid = await validate.validateReqTransfer(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelectEmp = await EmployeeDao.selectEmployee('ID', employee_id);
            if(resSelectEmp){
                if(resSelectEmp.length > 0){
                    const salary = resSelectEmp[0].salary
                    let resSelectTransfer = await transferDao.selectTransfer(employee_id, year, month);
                    if(resSelectTransfer.length >= 0){
                        let sum_data = Number(resSelectTransfer[0].sum_data)
                        let halfSalary = salary/2;
                        if((sum_data + Number(amount)) <= halfSalary){
                            let message = ''
                            let resInsert = await transferDao.insertTransfer(employee_id, amount, year, month, 'SUCCESS', message);
                            if(resInsert){
                                responseStatus = {
                                    statusCode: "S",
                                    errorCode: "200",
                                    errorMessage: "Success",
                                };
                                }
                                else{
                                    responseStatus = {
                                        statusCode: "E",
                                        errorCode: "500",
                                        errorMessage: "Contact admin",
                                    };
                                }
                        }
                        else{
                            let message = 'Amount for this month is over 50% of salary'
                            let resInsert = await transferDao.insertTransfer(employee_id, amount, year, month, 'FAIL', message);
                            if(resInsert){
                                responseStatus = {
                                    statusCode: "S",
                                    errorCode: "200",
                                    errorMessage: "Amount for this month is over 50% of salary",
                                };
                                }
                                else{
                                    responseStatus = {
                                        statusCode: "E",
                                        errorCode: "500",
                                        errorMessage: "Contact admin",
                                    };
                                }
                        }
                    }
                    else{
                        responseStatus = {
                            statusCode: "E",
                            errorCode: "500",
                            errorMessage: "Contact admin",
                        };
                    }
                }
                else{
                    responseStatus = {
                        statusCode: "E",
                        errorCode: "404",
                        errorMessage: "Not Found employee",
                    };
                }
            }
            else{
                responseStatus = {
                    statusCode: "E",
                    errorCode: "500",
                    errorMessage: "Contact admin",
                };
            }
        } catch (error) {
            responseStatus = {
                statusCode: "E",
                errorCode: "500",
                errorMessage: error.message,
            };
        } finally {
            return JsonUtils.setJsonOutput(
                headerData,
                responseRecord,
                responseStatus
            );
        }
    } 
    
}

export default TranferService