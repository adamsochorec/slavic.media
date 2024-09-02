#!/bin/bash

# Start backend dev server in a new terminal
osascript -e 'tell application "Terminal" to do script "cd ~/path/to/backend && npm run dev"'

# Start backend start-dev server in a new terminal
osascript -e 'tell application "Terminal" to do script "cd ~/path/to/backend && npm run start-dev"'

# Start frontend dev server in a new terminal
osascript -e 'tell application "Terminal" to do script "cd ~/path/to/frontend && npm run dev"'