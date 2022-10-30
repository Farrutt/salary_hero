import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import companyDao from "./dao";
import httpStatus from "../../master/http-status";

class CompanyService {
    static async createCompany(body) {
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
            let { company_name } = param;
            let resValid = await validate.validateReqCreateCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resInsert = await companyDao.insertCompany(company_name);
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
    static async readCompany(body) {
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
            let resValid = await validate.validateReqReadCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resSelect = await companyDao.selectCompany(keyType, keyValue);
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
    static async updateCompany(body) {
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
            let { id, company_name, status } = param;
            let resValid = await validate.validateReqUpdateCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resUpdate = await companyDao.updateCompany(id, company_name, status);
            if(resUpdate){
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
    static async deleteCompany(body) {
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
            let { id } = param;
            let resValid = await validate.validateReqDeleteCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resDelete = await companyDao.deleteCompany(id);
            if(resDelete){
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

export default CompanyService