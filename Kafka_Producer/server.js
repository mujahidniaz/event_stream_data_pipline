const express = require('express');
var kafka = require('kafka-node')
const server = express();
let data = require('./data');
const body_parser = require('body-parser');
const port = 4000;
var count=100;
var Sub_Topic = "CustomerRegistered";
// parse JSON (application/json content-type)
server.use(body_parser.json());

server.get("/", (req, res) => {
   res.sendFile(__dirname + '/index.html');
});


server.post("/items", (req, res) => {
   const item = req.body;
   console.log(item.type+"\n");
   if(item.type=="customer_registered")
   {
      try
      {
   produceMessage(JSON.stringify(item),item.type);
   }
   catch(exr)
   {
      console.log(exr);
   }
}
   // add new item to array
   

   let response = {
      status: "success"
    }
    res.send(response);
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
    console.log("Producer for countries is ready");
    ProducerReady = true;
});
  
producer.on('error', function (err) {
  console.error("Problem with producing Kafka message "+err);
})
 

 
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


server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});