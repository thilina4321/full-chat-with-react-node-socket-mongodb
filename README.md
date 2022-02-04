# full-chat-with-react-node-socket-mongodb

## this is a full chat app with server and client
## for client this app use react.js with socket.io client
## for server this app use node.js with socket.io and mongo db

- FE - docker run --name chat-react -v /Users/thilinadilshan/Documents/development/chatApp/client/src:/app/src -p 3000:3000 --rm --network chat-net  chat-frontend

- BE - docker run -d --name chat-node --rm -v /Users/thilinadilshan/Documents/development/chatApp/server:/app -v :/app/node_modules -p 3500:3500 --network chat-net  chat-backend

- DB - docker run --name chat-db -d --rm --network chat-net -v data:/data/db mongo
