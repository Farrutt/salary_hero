# Salary_hero
# เริ่มต้นใช้งาน
    $ npm install
# ข้อกำหนดเบื้องต้น
* **Programming Language** : Node v10.19.0
* **Database** : PostgresSQL
    * database name : postgres
    * table
        * company
        * employee
        * admin
        * company_admin
        * transfer_log
* **Create Database**
    * สร้าง database ด้วยชื่อ postgres และสร้าง Table ด้วย sql ด้านล่าง
``` 
CREATE TABLE public."admin" (
	admin_id serial NOT NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	create_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	update_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	status varchar NULL,
	CONSTRAINT admin_pk PRIMARY KEY (admin_id)
);

CREATE TABLE public.company (
	company_id serial NOT NULL,
	company_name varchar NULL,
	create_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	update_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	status varchar NULL,
	CONSTRAINT company_pk PRIMARY KEY (company_id)
);

CREATE TABLE public.company_admin (
	company_admin_id serial NOT NULL,
	company_id serial NOT NULL,
	admin_id serial NOT NULL,
	create_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	update_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	status varchar NULL,
	CONSTRAINT company_admin_pk PRIMARY KEY (company_admin_id)
);
CREATE UNIQUE INDEX company_admin_company_id_idx ON public.company_admin USING btree (company_id, admin_id);

CREATE TABLE public.employee (
	employee_id serial NOT NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	company_id serial NOT NULL,
	create_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	update_date timestamptz NOT NULL DEFAULT CURRENT_DATE,
	salary numeric(17) NULL,
	status varchar NULL,
	update_by serial NOT NULL,
	CONSTRAINT employee_pk PRIMARY KEY (employee_id)
);
CREATE UNIQUE INDEX employee_employee_id_idx ON public.employee USING btree (employee_id, company_id);

CREATE TABLE public.transfer_log (
	transfer_id serial NOT NULL,
	employee_id serial NOT NULL,
	amount numeric(17) NULL,
	"year" varchar NULL,
	"month" varchar NULL,
	datetime timestamptz NOT NULL DEFAULT CURRENT_DATE,
	status varchar NULL,
	message varchar NULL,
	CONSTRAINT transfer_log_pk PRIMARY KEY (transfer_id)
);

``` 
# API Document
Api collection: https://drive.google.com/file/d/1WXyZBc1oaJLRUEhmhTVH3JEvS2N2v49l/view?usp=sharing