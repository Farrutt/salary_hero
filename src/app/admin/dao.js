import DataBaseUtils from "../../utils/database-utils";

class AdminDao {
    static async insertAdmin(first_name, last_name) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            // console.log('client',client)
            let textSql = `INSERT INTO admin
            (first_name, last_name, create_date, update_date, status)
            VALUES('${first_name}','${last_name}', 'now()', 'now()','ACTIVE');`
            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;

        }
    }
    static async selectAdmin(keyType, keyValue) {
        try {            
            let client = await DataBaseUtils.getConnectionsInformation();
            var textSql = ''
            if(keyType == 'ALL'){
                textSql = `SELECT * FROM admin `
            }
            else if(keyType == 'ID'){
                let convertKeyValue = Array.isArray(keyValue) ? keyValue : Number(keyValue) // ถ้าส่งค่ามาเป็น array ไม่ต้องแปลงเป็น Number
                textSql = `SELECT * FROM admin
                WHERE admin_id in (${convertKeyValue});`
            }
            else if(keyType == 'NAME'){
                let regSpace = /\s/g.test(keyValue);
                if (regSpace){
                    let first_name = keyValue.slice(0, keyValue.indexOf(' '));
                    let last_name = keyValue.slice(keyValue.indexOf(' ')+1);
                    textSql = `SELECT * FROM admin
                    WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
                }
                else{
                    textSql = `SELECT * FROM admin
                    WHERE first_name LIKE '%${keyValue}%' OR last_name LIKE '%${keyValue}%';`
                }                
            }
            else if(keyType == 'STATUS'){
                textSql = `SELECT * FROM admin
                WHERE status = '${keyValue}';`
            }

            let resSelect = await DataBaseUtils.execute(client,textSql)
            return resSelect.rows;
        } catch (error) {
            return error;

        }
    }
    static async insertAdminCompany(company_id, admin_id, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            // console.log('client',client)
            let statusValue = status == '' ? 'ACTIVE' : status;
            let textSql = `INSERT INTO company_admin
            (company_id, admin_id, create_date, update_date, status)
            VALUES('${company_id}','${admin_id}', 'now()', 'now()','ACTIVE')
            ON CONFLICT (company_id, admin_id) do update set status = '${statusValue}';`
            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;

        }
    }
    
}

export default AdminDao
