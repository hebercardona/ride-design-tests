import { testConfig } from "@testConfig";
import sql from 'mssql'


class SqlHelper {

    async executeQueryAlternate(query: string): Promise<any> {
        let result;
        return sql.connect(testConfig.db).then(pool => {  
            return pool.request()
                .query(query)
        }).then(recordset => {
            result = recordset;
            return result;
        }).catch(err => {  
        })
      }

    async executeQuery(query: string): Promise<any> {
        try {
            const pool = await sql.connect(testConfig.db);
            const result = pool.request().query(query);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new SqlHelper();
