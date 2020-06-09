import { ibm } from './axios';
import Password from 'antd/lib/input/Password';

export const compareSchema = async ( db1id,db2id ) => {
      console.log("parameters to axios: ",db1id,db2id)
      const response = await ibm.get('compareSchema/', {
            params: {  
                  db1id:db1id,
                  db2id:db2id
            }
      })
      return response.data
}

export const compareData = async ( db1id,db1TableName,db2id,db2TableName ) => {
      console.log("params to axios: ", db1id,db1TableName,db2id,db2TableName  )
      const response = await ibm.get('compareTwoData', {
            params:{
                  db1id:db1id,
                  db2id:db2id,
                  db1TableName:db1TableName,
                  db2TableName,db2TableName
            }
      })
      
      console.log(response.data)
      return response.data
}


export const getTableName = async ( dbid) => {
      const response = await ibm.get('getTableNames',{
            params:{
                  dbid:dbid
            }
      })
      return response.data
}


// export const getTableData = async ( dbName,domain,username,password,db_type,tableName) => {
//       const response = await ibm.get('getTableData',{
//             params:{
//                   dbName:dbName,
//                   domain:domain,
//                   username:username,
//                   password:password,
//                   db_type:db_type,
//                   tableName:tableName,
//             }
//       })
//       return response.data
// }

export const getDatabaseForUser = async (uname, dbType) => {
      console.log(uname, dbType)
      const response = await ibm.get('GetDatabaseNameForUser',{
            params:{
                  username: uname,
                  dbType: dbType
            }
      })
      return response.data
}

export const addNewDatabaseConfiguration = async (emailId,dbName,dbType,description, dbUname,dbPassword,dbDomain) =>{
      console.log("adding new database configuration");
      console.log(emailId,dbName,dbType,description, dbUname,dbPassword,dbDomain);
      const response = await ibm.post('CreateDatabaseConfig/', {
                  emailId:emailId,
                  dbName:dbName,
                  dbType:dbType,
                  description:description,
                  dbUname:dbUname,
                  dbPassword:dbPassword,
                  dbDomain:dbDomain
            }
      )
      return response.data
}

export const addNewUser = async(username, password) => {
      console.log("adding new User ", username,password)
      const response = await ibm.post('createUser/', {
            username:username,
            password:password
      })

      return response.data
}


