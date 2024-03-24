const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080
app.use(cors())

app.get('/chat', (_, res) => {
  res.json({ message: "Hello, World!", people: ["Harry", "Jack", "Barry"] })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
