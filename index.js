// code away!
const server = require("./server.js");

const port = process.env.PORT || 5003;

server.listen(port, () => {
    console.log(`\n Server running on http://localhost:${port}\n`);
});