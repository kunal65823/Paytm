const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", require("./routes"));

const start = async () => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

if (require.main === module) {
    start().catch(error => {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    });
}

module.exports = app;
module.exports.start = start;