import { ibm } from './axios';

export const compareSchema = async (  dbName_left,domain_left,username_left,password_left,db_type_left,  dbName_right,domain_right,username_right,password_right,db_type_right) => {
      console.log("parameters to axios: ",dbName_left,domain_left,username_left,password_left,db_type_left,  dbName_right,domain_right,username_right,password_right,db_type_right)
      const response = await ibm.get('compareSchema/', {
            params: {  
                dbName_left:dbName_left,
                domain_left:domain_left,
                username_left:username_left,
                password_left:password_left,
                db_type_left:db_type_left,

                dbName_right:dbName_right,
                domain_right:domain_right,
                username_right:username_right,
                password_right:password_right,
                db_type_right:db_type_right
            }
      })
      return response.data
}

export const compareData = async (  dbName_left,domain_left,username_left,password_left,db_type_left,sqlQuery_left,  dbName_right,domain_right,username_right,password_right,db_type_right,sqlQuery_right) => {
      console.log("parameters to axios: ",dbName_left,domain_left,username_left,password_left,db_type_left,sqlQuery_left,  dbName_right,domain_right,username_right,password_right,db_type_right,sqlQuery_right)
      const response = await ibm.get('compareTwoData', {
            params: {  
                dbName_left:dbName_left,
                domain_left:domain_left,
                username_left:username_left,
                password_left:password_left,
                db_type_left:db_type_left,
                sqlQuery_left:sqlQuery_left,

                dbName_right:dbName_right,
                domain_right:domain_right,
                username_right:username_right,
                password_right:password_right,
                db_type_right:db_type_right,
                sqlQuery_right:sqlQuery_right,
            }
      })
      console.log(response.data)
      return response.data
}


export const getTableName = async ( dbName,domain,username,password,db_type) => {
      const response = await ibm.get('getTableNames',{
            params:{
                  dbName:dbName,
                  domain:domain,
                  username:username,
                  password:password,
                  db_type:db_type,
            }
      })
      return response.data
}


export const getTableData = async ( dbName,domain,username,password,db_type,tableName) => {
      const response = await ibm.get('getTableData',{
            params:{
                  dbName:dbName,
                  domain:domain,
                  username:username,
                  password:password,
                  db_type:db_type,
                  tableName:tableName,
            }
      })
      return response.data
}

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





