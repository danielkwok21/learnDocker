const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql2/promise')

let con

connectDB()

/**
 * https://docs.docker.com/compose/startup-order/
 * 
 * Manually configure retries to connect to db every 5 seconds.
 * Max retry 5 times
 */
async function connectDB() {
  const MAX_TRIES = 5
  const WAIT_DURATION_IN_SECONDS = 5

  console.log(`connectDB... (waiting ${WAIT_DURATION_IN_SECONDS} seconds to connect to db)`)

  for (let i = 0; i < MAX_TRIES; i++) {
    try {
      await wait(WAIT_DURATION_IN_SECONDS)

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

      console.log(`Success. Connected to db`)
      break

    } catch (err) {
      console.log(err.toString())
      console.log(`Errored. Number of retries left:${MAX_TRIES - i}. Next attempt in ${WAIT_DURATION_IN_SECONDS} seconds.`)
    }
  }

  function wait(seconds = 1) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, seconds * 1000)
    })
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
 * Insert users
 */
app.get('/insert', async (req, res) => {
  try {
    const user = {
      name: `Sam ${Date.now()}`,
      id: Math.random() * 10000
    }
    await query(con, `INSERT into user (id, name) VALUES (${user.id}, "${user.name}")`, user)

    res.send({ success: true, user })

  } catch (err) {
    res.status(400).send(err.toString())
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function query(con, query) {
  if (!con) {
    return Promise.reject("No connection found")
  }

  return con.execute(query)
    .then(([rows, fields]) => rows)
}