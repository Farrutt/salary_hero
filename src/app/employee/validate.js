import httpStatus from "../../master/http-status";
class validate {
    static async validateReqCreateEmployee(param) {
        let { first_name, last_name, company_id, salary, update_by } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('first_name')
        && param.hasOwnProperty('last_name')
        && param.hasOwnProperty('company_id')
        && param.hasOwnProperty('salary')
        && param.hasOwnProperty('update_by'))) {
            return msgError;
        } else {
            if (!(first_name && last_name && company_id && salary && update_by)) {
                return msgError;
            }
            if (isNaN(company_id && salary && update_by)){ // เช็คว่าเป็นตัวเลขไหม
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }

    static async validateReqUpdateEmployee(param) {
        let { employee_id, first_name, last_name, company_id, salary, status, update_by } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('employee_id')
        && param.hasOwnProperty('first_name')
        && param.hasOwnProperty('last_name')
        && param.hasOwnProperty('company_id')
        && param.hasOwnProperty('salary')
        && param.hasOwnProperty('status')
        && param.hasOwnProperty('update_by'))) {
            return msgError;
        } else {
            if (!(employee_id && first_name && last_name && company_id && salary && status && update_by)) {
                return msgError;
            }
            if (isNaN(employee_id && company_id && salary && update_by)){ // เช็คว่าเป็นตัวเลขไหม
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validateReqReadEmployee(param) {
        let { keyType, keyValue } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        const arrStatus = ['ACTIVE', 'INACTIVE']
        const arrkeyType = ['ALL','STATUS','ID','NAME']
        if (!(param.hasOwnProperty('keyType') && param.hasOwnProperty('keyValue'))) {
            return msgError;
        } else {
            if (!(arrkeyType.includes(keyType))) { // เช็คว่าค่าเป็น ACTIVE หรือ INACTIVE ไหม
                return msgError;
            }
            if(keyType == 'ALL'){
                if (!(keyType)) {
                    return msgError;
                }
            }
            else{
                if(!keyValue){
                    return msgError;
                }
                if(keyType == 'STATUS'){
                    if (!(arrStatus.includes(keyValue))) { // เช็คว่าค่าเป็น ACTIVE หรือ INACTIVE ไหม
                        return msgError;
                    }
                }
                else if(keyType == 'ID'){
                    if (isNaN(keyValue)) {
                        return msgError;
                    }
                }            
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validateReqImportEmployee(param) {
        let { employee_id, first_name, last_name, company_id, salary, status, update_by } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('employee_id')
        && param.hasOwnProperty('first_name')
        && param.hasOwnProperty('last_name')
        && param.hasOwnProperty('company_id')
        && param.hasOwnProperty('salary')
        && param.hasOwnProperty('status')
        && param.hasOwnProperty('update_by'))) {
            return msgError;
        } else {
            if (!(employee_id && first_name && last_name && company_id && salary && status && update_by)) {
                return msgError;
            }
            if (isNaN(employee_id && company_id && salary && update_by)){ // เช็คว่าเป็นตัวเลขไหม
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }

    
}

export default validate