local ui = require'harpoon.ui'
local term = require'harpoon.term'

ui.nav_file(1)
-- term.gotoTerminal(1)
-- term.sendCommand(1, "cd server && brave http://localhost:8000 && npm run dev\n")
term.gotoTerminal(1)
term.sendCommand(1, "cd client && brave http://localhost:3000 && npm run dev\n")
ui.nav_file(1)
