const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
 

    
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Hunger Monkey listening on port ${port}!`);
});

app.use("/user", require("./routes/userRoutes"));
