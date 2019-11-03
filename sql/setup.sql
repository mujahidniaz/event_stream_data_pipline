USE `events_db`;
 
/****** Object:  Table [dbo].[customer_data]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE customer_data(
	`id` varchar(500) NOT NULL,
	`name` varchar(500) NULL,
	`birthday` datetime(3) NULL,
 CONSTRAINT `PK_customer_data` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[customer_registered]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE customer_registered(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_customer_registered` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[order_accepted]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE order_accepted(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_order_accepted` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[order_cancelled]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE order_cancelled(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_order_cancelled` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[order_declined]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE order_declined(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_order_declined` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[order_fulfilled]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE order_fulfilled(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_order_fulfilled` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[product_data]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE product_data(
	`id` varchar(500) NOT NULL,
	`name` varchar(500) NULL,
	`customer_id` varchar(500) NULL,
 CONSTRAINT `PK_product_data` PRIMARY KEY 
(
	`id` ASC
) 
);
/****** Object:  Table [dbo].[product_ordered]    Script Date: 11/3/2019 3:19:13 AM ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE product_ordered(
	`id` varchar(500) NOT NULL,
	`aggregate_id` varchar(500) NULL,
	`timestamp` datetime(3) NULL,
 CONSTRAINT `PK_product_ordered` PRIMARY KEY 
(
	`id` ASC
));