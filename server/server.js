const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080

// middlewares
app.use(cors()) // allow cross origin sharing
app.use(express.json()) // decode request received from frontend

app.post('/login', (req, res) => {
})

app.get('/chat', (req, res) => {
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
