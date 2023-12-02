# CLEAR MySQL Database Data

node command to recursive delete record on database by specific amount of records per query

cause if bulk delete it will take long duration to exec that make timeout, un-trackable and freeze connection

## How to use

```
yarn
cp .env.example .env
```

setting ENV match your requirement need to find Id of record to start delete and Id that this recursive will stop 
if reached

**this command work only for table that use id as int

```
yarn start
```

first of this command will list all of query from start to reach target id