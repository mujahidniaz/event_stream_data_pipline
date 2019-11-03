var kafka = require('kafka-node');
var Producer = kafka.Producer
// instantiate client with as connectstring host:port for  the ZooKeeper for the Kafka cluster
const client = new kafka.KafkaClient({kafkaHost: "localhost:9092"});
 
    producer = new Producer(client);
   
 
var topicsToCreate = [
{
  topic: 'customer_registered',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'order_accepted',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'order_cancelled',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'order_declined',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'order_fulfilled',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'product_ordered',
  partitions: 1,
  replicationFactor: 1
},
{
  topic: 'Unknown_events',
  partitions: 1,
  replicationFactor: 1
}


];
 
client.createTopics(topicsToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  console.log(result);
  console.log(error);
  client.close();
  
});

