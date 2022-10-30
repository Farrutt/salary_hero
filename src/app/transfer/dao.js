import DataBaseUtils from "../../utils/database-utils";
const format = require("pg-format");

class EmployeeDao {
    static async selectTransfer(employee_id, year, month) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();

            let textSql = `SELECT employee_id, "month", "year", sum(amount) as sum_data
            FROM public.transfer_log
            WHERE (employee_id = '${employee_id}' and year = '${year}' and month = '${month}' and status = 'SUCCESS')
            group by employee_id, "month", "year";`

            let resSelect = await DataBaseUtils.execute(client,textSql)
            return resSelect.rows;
        } catch (error) {
            return error;

        }
    }
    static async insertTransfer(employee_id, amount, year, month, status, message) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();

            let textSql = `INSERT INTO public.transfer_log
            (employee_id, amount, "year", "month", datetime, status, message)
            VALUES('${employee_id}', '${amount}', '${year}', '${month}', 'now()', '${status}', '${message}');`

            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;

        }
    }
}

export default EmployeeDao
