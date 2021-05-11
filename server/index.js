const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
