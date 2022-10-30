import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import employeeDao from "./dao";
import httpStatus from "../../master/http-status";
import AdminDao from "../admin/dao"
import CompanyDao from "../company/dao"
import e from "connect-timeout";

class EmployeeService {
    static async createEmployee(body) {
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
            let { first_name, last_name, company_id, salary, update_by } = param;
            let resValid = await validate.validateReqCreateEmployee(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelectAdmin = await AdminDao.selectAdmin('ID', update_by);
            if(resSelectAdmin.length > 0){
                let resSelectCompany = await CompanyDao.selectCompany('ID', company_id);
                if(resSelectCompany.length > 0){
                    let resInsert = await employeeDao.insertEmployee(first_name, last_name, company_id, salary, update_by);
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
                    responseStatus = {
                        statusCode: "E",
                        errorCode: "404",
                        errorMessage: "Not Found company_id",
                    };
                }
            }
            else{
                responseStatus = {
                    statusCode: "E",
                    errorCode: "404",
                    errorMessage: "Not Found admin_id",
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
    static async updateEmployee(body) {
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
            let { employee_id, first_name, last_name, company_id, salary, status, update_by } = param;
            let resValid = await validate.validateReqUpdateEmployee(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelectAdmin = await AdminDao.selectAdmin('ID', update_by);
            if(resSelectAdmin.length > 0){
                let resSelectCompany = await CompanyDao.selectCompany('ID', company_id);
                if(resSelectCompany.length > 0){            
                    let resInsert = await employeeDao.updateEmployee(employee_id, first_name, last_name, company_id, salary, status, update_by);
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
                    responseStatus = {
                        statusCode: "E",
                        errorCode: "404",
                        errorMessage: "Not Found company_id",
                    };
                }
            }
            else{
                responseStatus = {
                    statusCode: "E",
                    errorCode: "404",
                    errorMessage: "Not Found admin_id",
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
    static async readEmployee(body) {
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
            let { keyType, keyValue } = param;
            let resValid = await validate.validateReqReadEmployee(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelect = await employeeDao.selectEmployee(keyType, keyValue);
            if(resSelect){
                if(resSelect.length > 0){
                    responseStatus = {
                        statusCode: "S",
                        errorCode: "200",
                        errorMessage: "Success",
                    }
                    responseRecord = resSelect
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
    static async importEmployee(body) {
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
            let { data } = param;
            var listData = []
            for(let i=0 ; i<data.length ; i++){
                let dataParam = data[i]
                console.log('darzt_dataParam:',dataParam)
                let resValid = await validate.validateReqImportEmployee(dataParam);
                if (resValid.status == 'E') {
                    responseStatus = resValid.responseStatus;
                    return JsonUtils.setJsonOutput(
                        headerData,
                        responseRecord,
                        responseStatus
                    );
                }
                else{
                    console.log('darzt_data[i]:',data[i])
                    let resList = [
                        data[i]['employee_id'], 
                        data[i]['company_id'], 
                        data[i]['first_name'], 
                        data[i]['last_name'], 
                        data[i]['salary'], 
                        'now()', 
                        'now()', 
                        data[i]['status'], 
                        data[i]['update_by']
                    ];
                    listData.push(resList)
                }
            }            
            let resUpsert = await employeeDao.upsertEmployee(listData);
            if(resUpsert){
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

export default EmployeeService