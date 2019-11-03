import constants.Constants;
import consumers.Event_Consumer;

public class MainClass {

	public static void main(String[] args) {

		try
		{
			/*Event_Consumer customerThread = new Event_Consumer(Constants.EVENT_CUSTOMER_REGISTERED);
			customerThread.start(); /// Starting consumer for Customer Registered Event;
			Event_Consumer order_acceptedThread = new Event_Consumer(Constants.EVENT_ORDER_ACCEPTED);
			order_acceptedThread.start(); /// Starting consumer for order_accepted Event;
			Event_Consumer order_cancelledThread = new Event_Consumer(Constants.EVENT_ORDER_CANCELLED);
			order_cancelledThread.start(); /// Starting consumer for order_cancelled Event;
			Event_Consumer order_declinedThread = new Event_Consumer(Constants.EVENT_ORDER_DECLINED);
			order_declinedThread.start(); /// Starting consumer for order_declined Event;
			Event_Consumer order_fulfilledThread = new Event_Consumer(Constants.EVENT_ORDER_FULFILLED);
			order_fulfilledThread.start(); /// Starting consumer for order_fullfilled Event;
			*/
			Event_Consumer product_orderedThread = new Event_Consumer();
			product_orderedThread.start(); /// Starting consumer for product_ordered Event;
		}
		catch(Exception e)
		{
			System.out.println();
		}
	}
}
