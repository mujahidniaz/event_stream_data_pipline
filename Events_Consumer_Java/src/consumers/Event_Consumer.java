package consumers;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Properties;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import database.DatabaseHandler;
import kafka.utils.ShutdownableThread;
import models.Events_Models.Event;
import constants.Constants;
/**
 * Kafka Consumer with Example Java Application
 */
public class Event_Consumer extends ShutdownableThread {
	private final KafkaConsumer<Integer, String> consumer;

	public String KAFKA_SERVER_URL = "localhost";
	public static final int KAFKA_SERVER_PORT = 9092;
	public String CLIENT_ID = "Java Events Client";
	GsonBuilder builder = new GsonBuilder(); 
	SimpleDateFormat DF;
	DatabaseHandler DB;

	Gson gson;

	public Event_Consumer() {
		super("Customer_Registered_Consumer_Super", false);
		this.CLIENT_ID=this.CLIENT_ID;
		Properties props = new Properties();
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_SERVER_URL + ":" + KAFKA_SERVER_PORT);
		props.put(ConsumerConfig.GROUP_ID_CONFIG, CLIENT_ID);
		props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true");
		props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000");
		props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, "30000");
		props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,"latest");
		props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.IntegerDeserializer");
		props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");

		consumer = new KafkaConsumer<>(props);
		builder.setPrettyPrinting(); 
		gson = builder.create();
		String pattern = "yyyy-MM-dd HH:mm:ss";
		DB=new DatabaseHandler();
		if(!DB.MakeConnection())
		{
			System.out.println("DB Connection Failed");
		}
		
		DF = new SimpleDateFormat(pattern);
		System.out.println("Consumer started..");

	}

	@Override
	public void doWork() {
		try
		{
			ArrayList<String> list=new ArrayList<String>();
			list.add(Constants.EVENT_CUSTOMER_REGISTERED);
			list.add(Constants.EVENT_ORDER_ACCEPTED);
			list.add(Constants.EVENT_ORDER_CANCELLED);
			list.add(Constants.EVENT_ORDER_DECLINED);
			list.add(Constants.EVENT_ORDER_FULFILLED);
			list.add(Constants.EVENT_PRODUCT_ORDERED);
		
			
			
			
			
			
			consumer.subscribe(list);
			ConsumerRecords<Integer, String> records = consumer.poll(1000);
			for (ConsumerRecord<Integer, String> record : records) {

				Event event = gson.fromJson(record.value(), Event.class);
				boolean dup=DB.InsertEventToDB(event);

				System.out.println(event.getType()+" Event Consumed - Timestamp:"+DF.format(event.getTimestamp())+" Duplicate = "+ (!dup) +" \n");    
				//System.out.println("Received message: (" +record.value().toString() + ")\n");

			}

		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}

	@Override
	public String name() {
		return null;
	}

	@Override
	public boolean isInterruptible() {
		return false;
	}
}
