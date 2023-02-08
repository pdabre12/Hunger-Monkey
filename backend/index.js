const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Hunger Monkey listening on port ${port}!`);
});

app.use("/user", require("./routes/userRoutes"));
