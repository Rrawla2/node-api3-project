// code away!
require("dotenv").config();
const server = require("./server.js")
const port = process.env.PORT || 5000;
//const port = 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
})