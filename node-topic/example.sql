-- Table structure for table member
CREATE TABLE member (
    id integer primary key AUTOINCREMENT,
    member_id text,
    name text,
    password text
);

-- Dumping data for table `author`
INSERT INTO member(member_id, name, password) VALUES ('test', 'testname', 'test1234');
INSERT INTO member(member_id, name, password) VALUES ('best', 'bestname', 'test1234');
INSERT INTO member(member_id, name, password) VALUES ('jest', 'jestname', 'test1234');

-- Table structure for table `topic`
CREATE TABLE topic (
    id integer primary key AUTOINCREMENT,
    title text NOT NULL,
    description text,
    created_at text NOT NULL,
    member_id integer DEFAULT NULL
);

-- Dumping data for table `topic`
INSERT INTO topic(title, description, created_at, member_id) VALUES ('MySQL','MySQL is...',datetime('now','localtime'),1);
INSERT INTO topic(title, description, created_at, member_id) VALUES ('PostgreSQL','PostgreSQL is...',datetime('now','localtime'),2);
INSERT INTO topic(title, description, created_at, member_id) VALUES ('Oracle','Oracle is...',datetime('now','localtime'),null);