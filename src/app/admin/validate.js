import httpStatus from "../../master/http-status";
class validateAdmin {
    static async validateReqAddAdmin(param) {
        let { first_name, last_name } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('first_name') && param.hasOwnProperty('last_name'))) {
            return msgError;
        } else {
            if (!(first_name && last_name)) {
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validateReqSelectAdmin(param) {
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
                    if (isNaN(keyValue)) { // เช็คว่าเป็นตัวเลขไหม
                        return msgError;
                    }
                }            
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validateReqAddAdminCompany(param) {
        let { company_id, admin_id, status } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        const arrStatus = ['','ACTIVE', 'INACTIVE']
        if (!(param.hasOwnProperty('company_id') && param.hasOwnProperty('admin_id') && param.hasOwnProperty('status'))) {
            return msgError;
        } else {
            if (!(company_id && (admin_id.length > 0))) {
                return msgError;
            }
            if (!(arrStatus.includes(status))) { // เช็คว่าค่าเป็น ACTIVE หรือ INACTIVE หรือ ค่าว่าง ไหม
                return msgError;
            }

        }
        return { status: 'S', responseStatus: {} }
    }
}

export default validateAdmin