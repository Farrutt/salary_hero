import httpStatus from "../../master/http-status";
class validate {
    static async validateReqTransfer(param) {
        let { employee_id, amount, year, month } = param;
        const errorCode = httpStatus.BAD_REQUEST.CODE;
        const errorMsg = httpStatus.BAD_REQUEST.TEXT_EN;
        const resStatusError = { status: 'E', errorCode: errorCode, errorMessage: errorMsg }
        const msgError = { status: 'E', responseStatus: resStatusError }
        if (!(param.hasOwnProperty('employee_id')
        && param.hasOwnProperty('amount')
        && param.hasOwnProperty('year')
        && param.hasOwnProperty('month'))) {
            return msgError;
        } else {
            if (!(employee_id && amount && year && month)) {
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
}

export default validate