import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import InvestorsDAO from "./dao/investorsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
console.log("Connection established successfully?");

MongoClient.connect(
    process.env.INVESTORS_URI,
    {
        // poolSize: 50,
        // wtimeout: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.log("Connection failed");
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await InvestorsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})