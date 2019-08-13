import oracledb from 'oracledb'

export default class OracleDB {

    private static _instance: OracleDB;
    cnnAttrs:oracledb.PoolAttributes;
    pool:oracledb.Pool;
    conected: Boolean = false;

    constructor() {
        
        console.log( "Class initialized" )

        this.cnnAttrs = {
            connectString:  process.env.DB_HOST     || "LOCALHOST",
            user:           process.env.DB_USER     || "root",
            password:       process.env.DB_PASSWORD || "",
            events:         false,
            externalAuth:   false,
            poolAlias:      'ONL_DB',
            poolTimeout: 30,
            poolMax: 10,
            poolMin: 1,
            stmtCacheSize:  30
        };

        this.createPool();
    }

    static async execQuery( query: string, parameters:oracledb.DBObject, autoCommit:Boolean = false ){
        
        const connection:any = await this.instance.pool.getConnection();

        let result = await connection.execute(query, parameters, {
            autoCommit: autoCommit
        });

        connection.close();

        return result;
    }

    public async closeConnection()
    {   
        try{
            if(this.conected == true)
            {
                await this.pool.close();
                this.conected = false;
                console.log( "Disconnected" );
            }
        }
        catch( err ){
            throw err
        }
    }


    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private async createPool() {
        
        this.pool = await oracledb.createPool( this.cnnAttrs );
        this.conected = true;
        console.log("Pool created");
    }
}
