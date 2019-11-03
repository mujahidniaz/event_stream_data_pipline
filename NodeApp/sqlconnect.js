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

  GetAgeWiseOrderCount = function(){
    let sql = "select x.status,x.ageText as ageGroup,count(*) count from (SELECT a.ageText,c.aggregate_id,'Cancelled' as status from (SELECT c.aggregate_id , CASE WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) > 40 THEN 'Elders' WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) < 25 THEN 'Teens' ELSE 'Adults' END AS ageText FROM customer_data d,customer_registered c where c.id=d.id) a,product_ordered p,product_data pd,order_cancelled c where c.aggregate_id=p.aggregate_id and p.id=pd.id and pd.customer_id=a.aggregate_id) x group by x.ageText union all select y.status,y.ageText as ageGroup,count(*) count from (SELECT a.ageText,c.aggregate_id,'Fulfilled' as status from (SELECT c.aggregate_id , CASE WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) > 40 THEN 'Elders' WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) < 25 THEN 'Teens' ELSE 'Adults' END AS ageText FROM customer_data d,customer_registered c where c.id=d.id) a,product_ordered p,product_data pd,order_fulfilled c where c.aggregate_id=p.aggregate_id and p.id=pd.id and pd.customer_id=a.aggregate_id) y group by y.ageText union all select y.status,y.ageText as ageGroup,count(*) count from (SELECT a.ageText,c.aggregate_id,'Declined' as status from (SELECT c.aggregate_id , CASE WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) > 40 THEN 'Elders' WHEN TIMESTAMPDIFF(YEAR,d.birthday,CURDATE()) < 25 THEN 'Teens' ELSE 'Adults' END AS ageText FROM customer_data d,customer_registered c where c.id=d.id) a,product_ordered p,product_data pd,order_declined c where c.aggregate_id=p.aggregate_id and p.id=pd.id and pd.customer_id=a.aggregate_id) y group by y.ageText";
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
   avgOrderCompletion,
   GetAgeWiseOrderCount
  };