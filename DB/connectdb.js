const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://MahmoudYahia:BnYahia162@nodeexpressprojects.h9jeu8a.mongodb.net/?retryWrites=true&w=majority";

const connectDB=()=>{
return mongoose
  .connect(connectString)

}

module.exports=connectDB;


