local ui = require'harpoon.ui'
local term = require'harpoon.term'

ui.nav_file(1)
term.gotoTerminal(1)
term.sendCommand(1, "cd server && npm run dev\n")
term.gotoTerminal(2)
term.sendCommand(2, "cd client && npm run dev\n")
ui.nav_file(1)
