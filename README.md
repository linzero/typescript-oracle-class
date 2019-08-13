# typescript-oracle-class
This is a class to manage oracledb with typescript. This class uses singleton pattern and object pool pattern of oracle to manage the connections.

This class is optimized and tested with 8,000 concurrent request and worked perfectly, response time no more than 1 second.

## Instantiate class
First you have to import the class and then instantiate it to create an initial pool:

```typescript
import OracleDB from "./db/oracledb";

OracleDB.instance
```

## Query example
Here there is a query example:
```typescript
import OracleDB from "../db/oracledb"

let result  = await OracleDB.execQuery( sql, parameters, true );
```
You can use a try catch to get errors in the query or the connection.

## Autor ✒️

Class made and tested by:

* **David Parra** - *Trabajo Inicial* - [villanuevand](https://github.com/linzero)
