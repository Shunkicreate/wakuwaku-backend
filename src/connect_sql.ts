import mysql, { Connection } from 'mysql';
import fs from 'fs'

var config =
{
    host: 'wakuwaku-backend-database.mysql.database.azure.com',
    user: 'shunki',
    password: process.env.SQLPASS,
    database: 'wakuwaku-backend-database',
    port: 3306,
    ssl: { ca: fs.readFileSync("BaltimoreCyberTrustRoot.crt.pem") }
};
export const conn: Connection = mysql.createConnection(config);

// export const conn = mysql.createConnection({ host: "wakuwaku-backend-database.mysql.database.azure.com", user: "shunki", password: "process.env.SQLPASS", ssl: { ca: fs.readFileSync("BaltimoreCyberTrustRoot.crt.pem") } });

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            queryDatabase();
        }
    });

export function queryDatabase() {
    conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) {
        if (err) throw err;
        console.log('Dropped inventory table if existed.');
    })
    conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);',
        function (err, results, fields) {
            if (err) throw err;
            console.log('Created inventory table.');
        })
    conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150],
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154],
        function (err, results, fields) {
            if (err) throw err;
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100],
        function (err, results, fields) {
            if (err) throw err;
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.end(function (err) {
        if (err) throw err;
        else console.log('Done.')
    });
};