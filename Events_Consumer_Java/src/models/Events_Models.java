package models;

import java.util.Date;

public class Events_Models {
	public class Event {
		private String id;
		private String aggregate_id;
		private String type;
		private Date timestamp;

		Data data;


		// Getter Methods 

		public String getId() {
			return id;
		}

		public String getAggregate_id() {
			return aggregate_id;
		}

		public String getType() {
			return type;
		}

		public Date getTimestamp() {
			return timestamp;
		}

		public Data getData() {
			return data;
		}

		// Setter Methods 

		public void setId(String id) {
			this.id = id;
		}

		public void setAggregate_id(String aggregate_id) {
			this.aggregate_id = aggregate_id;
		}

		public void setType(String type) {
			this.type = type;
		}

		public void setTimestamp(Date timestamp) {
			this.timestamp = timestamp;
		}

		public void setData(Data data) {
			this.data = data;
		}
	}
	public class Data {
		private String name;
		private Date birthdate;
		private String customer_id;


		// Getter Methods 

		public String getName() {
			return name;
		}

		public Date getBirthdate() {
			return birthdate;
		}

		public void setCustomer_id(String customer_id) {
			this.customer_id = customer_id;
		}

		public String getCustomer_id() {
			return this.customer_id;
		}

		// Setter Methods 

		public void setName(String name) {
			this.name = name;
		}

		public void setBirthdate(Date birthdate) {
			this.birthdate = birthdate;
		}
	}
}
