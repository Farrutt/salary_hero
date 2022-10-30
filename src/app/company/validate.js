import httpStatus from "../../master/http-status";
class validate {
    static async validateReqCreateCompany(param) {
        let { company_name } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('company_name'))) {
            return msgError;
        } else {
            if (!(company_name)) {
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }

    static async validateReqReadCompany(param) {
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
    static async validateReqUpdateCompany(param) {
        let { id, company_name, status } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        const arrStatus = ['ACTIVE', 'INACTIVE']
        if (!(param.hasOwnProperty('id') 
        && param.hasOwnProperty('company_name') 
        && param.hasOwnProperty('status'))) {
            return msgError;
        } else {
            if (!(id)) {
                return msgError;
            }
            if (isNaN(id)) {
                return msgError;
            }
            if((!company_name && !status)){
                return msgError;
            }
            if (status){
                if (!(arrStatus.includes(status))) { // เช็คว่าค่าเป็น ACTIVE หรือ INACTIVE ไหม
                    return msgError;
                }
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validateReqDeleteCompany(param) {
        let { id } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('id'))) {
            return msgError;
        } else {
            if (!(id)) {
                return msgError;
            }
            if (isNaN(id)) {
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
}

export default validate