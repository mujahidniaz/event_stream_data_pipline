const express = require('express');
var kafka = require('kafka-node')
const server = express();
var path = require("path");
const mysql = require('./sqlconnect');
const helper = require('./helper');
const body_parser = require('body-parser');
const port = 4000;
var count=100;
var TOPICS=["customer_registered","order_accepted","order_cancelled","order_declined","order_fulfilled","product_ordered"];
// parse JSON (application/json content-type)
server.use(body_parser.json());

server.get("/", (req, res) => {
   res.sendFile(__dirname + '/index.html');
});


/// Total Pending orders in table Get Method

server.get("/api/v1/pendingorderstable", async (req, res) => {

   let response = [];
   await mysql.PendingOrders().then(function (results) {
       //console.log(JSON.parse(results));
       
       results =JSON.parse(results);
       
       results.forEach(function (item) {
         
         let row = {
            id: item.aggregate_id,
            productordered: item.PRODUCTORDERED,
            Customer:item.CUSTOMER,
            timestamp: item.timestamp
          }
          //response.push(row);
         response.push(row);
 
      });
     })
     .catch(function (err) {
       console.log("Promise rejection error: " + err);
     })
 
 
 
 
  // console.log(response);
   res.json(response);
 });



 server.get("/api/v1/customers", async (req, res) => {

   let response = [];
   await mysql.totalCustomers().then(function (results) {
       console.log(JSON.parse(results));
       
       results =JSON.parse(results);
       
       results.forEach(function (item) {
         
         let row = {
         customers: item.customers,
          }
          //response.push(row);
         response.push(row);
 
      });
     })
     .catch(function (err) {
       console.log("Promise rejection error: " + err);
     })
 
 
 
 
   console.log(response);
   res.json(response);
 });


 server.get("/api/v1/agegroup", async (req, res) => {

   let response = [];
   await mysql.ageWiseCustomers().then(function (results) {
       
       
       results =JSON.parse(results);
     response=  helper.getAgeGroupCount(results);
     })
     .catch(function (err) {
       console.log("Promise rejection error: " + err);
     })
 
  // console.log(response);
   res.json(response);
 });

 
 server.get("/api/v1/avgordertime", async (req, res) => {


   let Results=[];
   await mysql.avgOrderCompletion().then(function (results) {
       
      //results.average=resultsaverage.toFixed(2);
      
       results =JSON.parse(results);
       var num=parseFloat(results[0].average);
       
       
       console.log(num.toFixed(2));
       results[0].average=num.toFixed(2);
      Results=results;
     })
     .catch(function (err) {
       console.log("Promise rejection error: " + err);
     })
 
  // console.log(response);
   res.json(Results);
 });




server.post("/api/v1//newevent", (req, res) => {
   const item = req.body;
   console.log(item.type+"\n");
   try
   {
      var item2=FormatDate(item);
      if(TOPICS.includes(item2.type))
      {
        
                 
       produceMessage(JSON.stringify(item2),item2.type);
      }
      else
      {
         produceMessage(JSON.stringify(item2),"Unknown_events");
      }
   }
   catch(exr)
   {
      console.log(exr);
   }

   // add new item to array
   

   let response = {
      status: "success"
    }
    res.json(response);
});



var Producer = kafka.Producer
// instantiate client with as connectstring host:port for  the ZooKeeper for the Kafka cluster
const client = new kafka.KafkaClient({kafkaHost: "localhost:9092"});
 
// name of the topic to produce to

 
    KeyedMessage = kafka.KeyedMessage,
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    ProducerReady = false ;
 
producer.on('ready', function () {
    console.log("Producer for Events is ready");
    ProducerReady = true;
});
  
producer.on('error', function (err) {
  console.error("Problem with producing Kafka message "+err);
})
 

function FormatDate(item)
{
   try
   {
   item.timestamp=item.timestamp.replace(' +','+');
   item.timestamp=item.timestamp.replace(' ','T')
   if(item.type==TOPICS[0])
   {
      item.data.birthdate=item.data.birthdate.replace(' +','+');
      item.data.birthdate=item.data.birthdate.replace(' ','');
     
   }
}
catch(ex)
{

}
   return item;
}
 
function produceMessage(msg,c_topic) {
    KeyedMessage = kafka.KeyedMessage,
    payloads = [
        { topic: c_topic, messages:msg, partition: 0 }
    ];
    
      
    if (ProducerReady) {
      producer.send(payloads, function (err, data) {
      console.log(data);
      });
    } else {
        // the exception handling can be improved, for example schedule this message to be tried again later on
        console.error("sorry, Producer is not ready yet, failed to produce message to Kafka.");
    }
    count++;
 
}//produceMessage

server.use("/public", express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});