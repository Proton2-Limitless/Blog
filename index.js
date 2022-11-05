const app = require("./app")
const { connectTodb } = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3334

// connect to database
connectTodb();

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})