const mysql = require('mysql');
const dotenv = require('dotenv');
 dotenv.config();
console.log(process.env)
const connection = mysql.createConnection({
    host: process.env.host,
    password: process.env.password,
    port: process.env.port,
    user: process.env.user,
    database: process.env.database
})
connection.connect();

const startId = parseInt(process.env.startId);
const endId = parseInt(process.env.endId);
const deleteCount = parseInt(process.env.deleteCount);
const tableName = process.env.tableName;
let start = startId;
let end = startId + deleteCount;
const scripts = [];
while (start < endId) {
    console.log(`add script DELETE FROM ${tableName} WHERE id >= ${start} AND id < ${end} LIMIT ${deleteCount};`);
    scripts.push(`DELETE FROM ${tableName} WHERE id >= ${start} AND id < ${end} LIMIT ${deleteCount};`);
    start = end;
    end = start + deleteCount;
}

// run sql script
const run = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};


async function main() {
    for(let i = 0; i < scripts.length; i++) {
        console.log(`run ${i} script`);
        console.log(scripts[i]);
        await run(scripts[i]);
    }
}

main().catch(err => {
    console.log(err);
});




