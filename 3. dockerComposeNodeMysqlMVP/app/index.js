const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql2')

const con = mysql.createConnection({
  host: "my_mysql_db",
  user: "root",
  password: "123456",
  database: "learnDocker"
});

/**
 * Gets all users
 */
app.get('/', async (req, res) => {
  try {
    const users = await query(con, "SELECT * FROM user;")
    res.send({
      success: true,
      users: users
    })
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

/**
 * Inserts a random user into table
 */
app.get('/insert', async (req, res) => {
  try {
    const name = Math.random() * 10000
    await query(con, `INSERT INTO user (name) VALUES (${name});`)
    res.send({
      success: true
    })
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

/**
 * View tables
 */
 app.get('/tables', async (req, res) => {
  try {
    const result = await query(con, `show tables;`)
    res.send({
      success: true,
      result
    })
  } catch (err) {
    res.status(400).send(err.toString())
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function query(con, query) {
  return new Promise((res, rej) => {
    if (!con) {
      rej("No connection found")
    } else {
      con.query(query, function (err, result) {
        if (err) throw err;
        res(result)
      });
    }
  })
}