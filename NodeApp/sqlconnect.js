var mysql = require('mysql');

// create a connection variable with the required details
var connection = mysql.createConnection({
    host: "127.0.0.1", // ip address of server running mysql
    user: "root", // user name to your mysql database
    password: "root", // corresponding password
    database: "events_db" // use the specified database
  });


  connection.connect((err) => {
    if (err) throw err;
    console.log('Connection Connected!');
  });


  PendingOrders = function(){
    let sql = "SELECT distinct O.aggregate_id,P.NAME AS PRODUCTORDERED,CD.NAME AS CUSTOMER,O.timestamp FROM product_ordered O,product_data P,customer_registered C,customer_data CD WHERE O.id=P.id AND P.customer_id=C.aggregate_id AND C.id=CD.id AND O.aggregate_id NOT IN (SELECT aggregate_id FROM order_cancelled UNION  SELECT aggregate_id FROM order_declined )  ORDER BY timestamp";
    return new Promise(function(resolve, reject){
      connection.query(sql, 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                resolve(JSON.stringify(rows));
              }
          }
      )}
  )}

  totalCustomers = function(){
    let sql = "select count(*) as customers from customer_registered";
    return new Promise(function(resolve, reject){
      connection.query(sql, 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                resolve(JSON.stringify(rows));
              }
          }
      )}
  )}
  
  ageWiseCustomers = function(){
    let sql = "select distinct id, (TIMESTAMPDIFF(YEAR,birthday,CURDATE())) as age from customer_data;";
    return new Promise(function(resolve, reject){
      connection.query(sql, 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                resolve(JSON.stringify(rows));
              }
          }
      )}
  )}

  avgOrderCompletion = function(){
    let sql = "select avg(a.duration) as average from (select p.aggregate_id, ((TIMESTAMPDIFF(SECOND,p.timestamp,f.timestamp))/60.0) as Duration from product_ordered p,order_fulfilled f    where p.aggregate_id=f.aggregate_id) a;";
    return new Promise(function(resolve, reject){
      connection.query(sql, 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                resolve(JSON.stringify(rows));
              }
          }
      )}
  )}


module.exports = {
   totalCustomers,
   PendingOrders,
   ageWiseCustomers,
   avgOrderCompletion
  };