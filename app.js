const express=require("express");
const user=require("./routes/user");
require("./db/conn");
const app=express();

app.use(express.json());
app.use("/api",user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`);
  });
