Code for gas tracker (react, droplet, psql, etc)


## psql notes
```
$ sudo -u shane.barnwell createuser --interactive (user should be same as db)
$ sudo -u shane.barnwell createdb [dbname]
```
```
DROP IF EXISTS table_name;
CREATE TABLE table_name (
    id serial PRIMARY KEY,
    column1 integer NOT NULL,
    column2 integer NOT NULL,
    column3 decimal NOT NULL,
    column4 decimal NOT NULL,
    column5 varchar(25) check (vehicle in ('only', 'opteions', 'example')),
    timestamp bigint
);
INSERT INTO table_name (column1, column2, column3, column4, column5, timestamp) VALUES (123, 123, 1.23, 1.23, 'only', 1560487294993);
```