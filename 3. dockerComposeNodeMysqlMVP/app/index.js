const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql2/promise')


let con

connectDB()

function connectDB() {
  /**
   * https://docs.docker.com/compose/startup-order/
   */
  const MAX_TRIES = 4
  const WAIT_IN_SECONDS = 10

  for (let i = 0; i < MAX_TRIES; i++) {
    try {
      const timer = setTimeout(async () => {

        /**
         * All values from docker-compose.yml
         * A better way is to use environment variables
         * https://docs.docker.com/compose/environment-variables/#pass-environment-variables-to-containers
         * 
         * But we'll keep it simple here
         */
        con = await mysql.createConnection({
          host: "my_mysql_db",
          user: "daniel",
          password: "123456",
          database: "learnDocker"
        });
      }, WAIT_IN_SECONDS * 1000)

      console.log(`Success. Connected to db`)
      console.log(con)
      clearTimeout(timer)
      break

    } catch (err) {
      console.log(`Errored. Number of retries left:${MAX_TRIES - i}`)
    }
  }

}

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