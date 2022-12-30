import { testConfig } from "@testConfig/*";
const sql = require("mssql/msnodesqlv8");
const config = testConfig.db;


class SqlHandler {

    async executeQuery(query: string): Promise<any> {
        let result;
        return sql.connect(config).then(pool => {  
            return pool.request()
                .query(query)
        }).then(recordset => {
            result = recordset;
            return result;
        }).catch(err => {  
        })
      }

}

export default new SqlHandler();
