package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import constants.Constants;
import models.Events_Models.Event;

public class DatabaseHandler {
	Connection con;
	java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public boolean MakeConnection()
	{

		try
		{  
			Class.forName("com.mysql.jdbc.Driver");  
			con=DriverManager.getConnection("jdbc:mysql://localhost:3306/events_db","root","root");  
			if(con!=null)
			{
				return true;
			}
			else
			{
				return false;
			}


		}
		catch(Exception e)
		{ 
			e.printStackTrace();
			return false;

		}  
	}

	public void CloseConnection()
	{
		try {
			con.close();
		}
		catch(Exception e)
		{

		}
	}

	public boolean InsertEventToDB(Event obj)
	{
		boolean ret=true;
		try	
		{
			
			try
			{

				Statement st = con.createStatement();
				st.execute("INSERT INTO "+obj.getType()+" (id,aggregate_id,timestamp) VALUES('"+obj.getId()+"','"+obj.getAggregate_id()+"','"+sdf.format(obj.getTimestamp())+"')");
				st.close();
			}
			catch(Exception e1)
			{e1.printStackTrace();
			ret=false;
			}
			if(obj.getType().trim().equals(Constants.EVENT_CUSTOMER_REGISTERED.trim()))
			{
				try
				{
					Statement	st1 = con.createStatement();
					st1.execute("INSERT INTO customer_data (id,name,birthday) VALUES('"+obj.getId()+"','"+obj.getData().getName().replace("'", "")+"','"+sdf.format(obj.getData().getBirthdate())+"')");		    
					st1.close();
				}
				catch(Exception e1)
				{e1.printStackTrace();
				ret=false;
				}
			}

			if(obj.getType().trim().equals(Constants.EVENT_PRODUCT_ORDERED.trim()))
			{
				//System.out.println("inside here "+obj.getType());
				try {

					Statement	st2 = con.createStatement();
				String query=	"INSERT INTO product_data (id,name,customer_id) VALUES('"+obj.getId()+"','"+obj.getData().getName().replace("'", "")+"','"+obj.getData().getCustomer_id()+"')";
				//System.out.println(query);	
				st2.execute(query);		    
					st2.close();
				}
				catch(Exception e1)
				{e1.printStackTrace();
				ret=false;
				//e1.printStackTrace();
				}



			}
			
			return ret;
		}
		catch(Exception ex)
		{
			
			ex.printStackTrace();
			return false;
		}
	}



}
