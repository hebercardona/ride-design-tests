import { testConfig } from "@testConfig/*";

const sql = require("mssql/msnodesqlv8");

const config = testConfig.db;

const query = `select LoadUrl from ConfiguredWholegoods where BuildID = '06606C13-8C92-47FB-8D50-EB7A5B67B28E'`;


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
