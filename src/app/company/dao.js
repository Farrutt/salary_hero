import DataBaseUtils from "../../utils/database-utils";

class CompanyDao {
    static async insertCompany(company_name) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            // console.log('client',client)
            let textSql = `INSERT INTO company
            (company_name, create_date, update_date, status)
            VALUES('${company_name}', 'now()', 'now()','ACTIVE');`
            let resInsert = await DataBaseUtils.execute(client,textSql)
            return resInsert;
        } catch (error) {
            return error;

        }
    }
    static async selectCompany(keyType, keyValue) {
        try {            
            let client = await DataBaseUtils.getConnectionsInformation();
            var textSql = ''
            if(keyType == 'ALL'){
                textSql = `SELECT * FROM company `
            }
            else if(keyType == 'ID'){
                let convertKeyValue = Number(keyValue)
                textSql = `SELECT * FROM company
                WHERE company_id = '${convertKeyValue}';`
            }
            else if(keyType == 'NAME'){
                textSql = `SELECT * FROM company
                WHERE company_name LIKE '%${keyValue}%';`
            }
            else if(keyType == 'STATUS'){
                textSql = `SELECT * FROM company
                WHERE status = '${keyValue}';`
            }

            let resSelect = await DataBaseUtils.execute(client,textSql)
            return resSelect.rows;
        } catch (error) {
            return error;

        }
    }
    static async updateCompany(id, company_name, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            var textSql = ''
            var convertId = Number(id)
            if(company_name && status){
                textSql = `UPDATE company
                SET company_name='${company_name}', update_date='now()', status='${status}'
                WHERE company_id='${convertId}';`
            }
            else if(company_name && !(status)){
                textSql = `UPDATE company
                SET company_name='${company_name}', update_date='now()'
                WHERE company_id='${convertId}';`
            }
            else if(!(company_name) && status){
                textSql = `UPDATE company
                SET update_date='now()', status='${status}'
                WHERE company_id='${convertId}';`
            }

            let resUpdate = await DataBaseUtils.execute(client,textSql)
            return resUpdate;
        } catch (error) {
            return error;

        }
    }
    static async deleteCompany(id) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let convertId = Number(id)
            // console.log('client',client)
            let textSql = `DELETE FROM company
            WHERE company_id='${convertId}'; `
            let resDelete = await DataBaseUtils.execute(client,textSql)
            return resDelete;
        } catch (error) {
            return error;

        }
    }
    
}

export default CompanyDao
