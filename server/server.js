const { join } = require('node:path')
const express = require('express')
const app = express()
const PORT = 8000

app.use(express.static(join(__dirname, "build")))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
