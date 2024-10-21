
const app = require('./app')
const  mongoose  = require('mongoose')
 

require('dotenv').config()

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)  // logging the port number
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB Connected successfully")
})