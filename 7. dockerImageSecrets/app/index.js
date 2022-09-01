const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.json({
    // These would be empty, as expected
    ENV_NAME: process.env.ENV_NAME || null,
    ENV_AGE: process.env.ENV_AGE || null,

    // These would have value, as expected
    DOCKER_NAME: process.env.DOCKER_NAME || null,
    DOCKER_AGE: process.env.DOCKER_AGE || null,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
