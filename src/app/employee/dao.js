import DataBaseUtils from "../../utils/database-utils";
const format = require("pg-format");

class EmployeeDao {
    static async insertEmployee(first_name, last_name, company_id, salary, update_by) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let textSql = `INSERT INTO public.employee
            (first_name, last_name, company_id, create_date, update_date, salary, status, update_by)
            VALUES('${first_name}', '${last_name}', '${company_id}', 'now()', 'now()', 
            '${salary}', 'ACTIVE', '${update_by}');`
            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;
        }
    }
    static async updateEmployee(employee_id, first_name, last_name, company_id, salary, status, update_by) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let textSql = `UPDATE public.employee
            SET first_name='${first_name}', last_name='${last_name}', company_id='${company_id}', create_date='now()',
            update_date='now()', salary='${salary}', status='${status}', update_by='${update_by}'
            WHERE employee_id='${employee_id}';`
            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;

        }
    }
    static async selectEmployee(keyType, keyValue) {
        try {            
            let client = await DataBaseUtils.getConnectionsInformation();
            var textSql = ''
            if(keyType == 'ALL'){
                textSql = `SELECT * FROM employee
                INNER JOIN company ON employee.company_id = company.company_id `
            }
            else if(keyType == 'ID'){
                let convertKeyValue = Number(keyValue)
                textSql = `SELECT * FROM employee
                INNER JOIN company ON employee.company_id = company.company_id 
                and employee.employee_id = '${convertKeyValue}';`
            }
            else if(keyType == 'NAME'){
                let regSpace = /\s/g.test(keyValue);
                if (regSpace){
                    let first_name = keyValue.slice(0, keyValue.indexOf(' '));
                    let last_name = keyValue.slice(keyValue.indexOf(' ')+1);
                    textSql = `SELECT * FROM employee
                    INNER JOIN company ON employee.company_id = company.company_id 
                    and (employee.first_name LIKE '%${first_name}%' AND employee.last_name LIKE '%${last_name}%');`
                }
                else{
                    textSql = `SELECT * FROM employee
                    INNER JOIN company ON employee.company_id = company.company_id 
                    and (employee.first_name LIKE '%${keyValue}%' OR employee.last_name LIKE '%${keyValue}%');`
                }                
            }
            else if(keyType == 'STATUS'){
                textSql = `SELECT * FROM employee
                INNER JOIN company ON employee.company_id = company.company_id 
                and employee.status = '${keyValue}';`
            }

            let resSelect = await DataBaseUtils.execute(client,textSql)
            return resSelect.rows;
        } catch (error) {
            return error;

        }
    }
    static async upsertEmployee(dataArray) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryFormat;
            queryFormat = format(
                `INSERT INTO employee
                (employee_id, company_id, first_name, last_name, salary, create_date, update_date, status, update_by)
                VALUES
                %L ON CONFLICT (employee_id,company_id) do update 
                set first_name = EXCLUDED.first_name ,last_name = EXCLUDED.last_name, salary = EXCLUDED.salary, 
                create_date = EXCLUDED.create_date, update_date = EXCLUDED.update_date, status = EXCLUDED.status, 
                update_by = EXCLUDED.update_by;`,
                dataArray
            );
            
            let queryString = {
                text: `${queryFormat}`,
            };
            let resUpsert = await DataBaseUtils.execute(client, queryString);
            return resUpsert;
        } catch (error) {
            console.log(error.message);
        }
    }
    
}

export default EmployeeDao
