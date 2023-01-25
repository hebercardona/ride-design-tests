import { testConfig } from "@testConfig";
const sql = require("mssql/msnodesqlv8");


class SqlClient {

    async executeQuery(query: string): Promise<any> {
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

}

export default new SqlClient();
