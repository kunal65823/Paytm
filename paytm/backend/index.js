const express = require("express");
    
const app = express();

const apiRouter = require("./routes");
const transferRouter = require("./routes/transfer");
app.use(express.json());

app.use("/api/v1", apiRouter);
app.use("/api/v1/account", transferRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});