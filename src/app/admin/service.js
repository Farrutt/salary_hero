import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validateAdmin from "./validate";
import AdminDao from "./dao";
import httpStatus from "../../master/http-status";
import CompanyDao from "../company/dao"

class AdminService {
    static async addAdmin(body) {
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
            let { first_name, last_name } = param;
            let resValid = await validateAdmin.validateReqAddAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resInsert = await AdminDao.insertAdmin(first_name, last_name);
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
    static async selectAdmin(body) {
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
            let resValid = await validateAdmin.validateReqSelectAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelect = await AdminDao.selectAdmin(keyType, keyValue);
            if(resSelect){
                responseStatus = {
                    statusCode: "S",
                    errorCode: "200",
                    errorMessage: "Success",
                };
                responseRecord = resSelect
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
    static async addAdminCompany(body) {
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
            let { company_id, admin_id, status } = param;
            let resValid = await validateAdmin.validateReqAddAdminCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelect = await CompanyDao.selectCompany('ID', company_id);
            if(resSelect){
                if(resSelect.length > 0){
                    let resSelectAdmin = await AdminDao.selectAdmin('ID', admin_id);
                    if(resSelectAdmin.length > 0){
                        let resAddAdminCompany = await AdminDao.insertAdminCompany(company_id, admin_id,status);
                        if(resAddAdminCompany){
                            responseStatus = {
                                statusCode: "S",
                                errorCode: "200",
                                errorMessage: "Success",
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

export default AdminService