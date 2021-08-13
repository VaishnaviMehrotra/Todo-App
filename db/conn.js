const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
        try {
                mongoose.connect(
                        process.env.MONGO_URI,
                        {
                                useCreateIndex: true,
                                useUnifiedTopology: true,
                                useNewUrlParser: true,
                        },
                        (err) => {
                                if (err) {
                                        throw err;
                                }
                                console.log("DB is connected");
                        }
                );
                //console.log("connection is successful");
        }
        catch (err) {
                console.log("No connection");
        }
}
dbConnect();