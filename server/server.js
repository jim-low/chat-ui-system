const express = require('express')
const app = express()
const cors = require('cors')
const { default: axios } = require('axios')
const PORT = 8080

app.use(cors()) // allow cross origin sharing
app.use(express.json()) // decode request received from frontend

app.post('/login', (req, res) => {
  const { username } = req.body
  let found = false
  let foundUser = {}

  axios('http://13.212.255.177/api/chatSystem/users/list').then(response => {
    const users = response.data
    for (let i = 0; i < users.length; ++i) {
      const currUser = users[i]
      const splitName = currUser.username.split(" ")
      if (currUser.username.includes(username) || splitName.includes(username)) {
        foundUser = currUser.id
        found = true
        break
      }
    }
    res.json({
      found: found,
      user: foundUser,
    })
  })
})

app.post('/user', (req, res) => {
  const { userId } = req.body
  axios(`http://13.212.255.177/api/chatSystem/user/${userId}`).then(response => {
    res.json(response.data)
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
