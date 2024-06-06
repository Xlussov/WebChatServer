const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRouther = require("./authRouther")

const PORT = process.env.PORT || 5000

const USERNAME = process.env.USERNANME || 'Xlussov'
const PASSWORD = process.env.PASSWORD || '4ch7s8v2'
const DBNMAME = process.env.DBNMAME || 'WebChat'
const CLUSTERNAME = process.env.CLUSTERNAME || 'Cluster0'

const conectUrl = `mongodb+srv://${USERNAME}:${PASSWORD}d@cluster0.brbk0oi.mongodb.net/${DBNMAME}?retryWrites=true&w=majority&appName=${CLUSTERNAME}`

const app = express()

app.use(cors());
app.use(express.json())
app.use("/auth",authRouther)

const start = async () => {
   try {
      await mongoose.connect(conectUrl)
      app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
   } catch (error) {
      console.log(error);
   }
}

start() 



















// const io = require("socket.io")(3000, {
//    cors: {
//       origin: ['http://localhost:5173']
//    }
// })

// const chatState = []
// io.on("connection", Socket => {
//    Socket.emit('receive', chatState)

//    Socket.on('send-massage', (massage) => {
//       chatState.push(massage)
//       Socket.broadcast.emit('receive-massage', massage)
//    })

// })