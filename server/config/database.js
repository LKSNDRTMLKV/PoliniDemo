import mongoose from "mongoose";

const databaseConnection = () => {
    mongoose.connect(process.env.DB_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        // .then((data) => {
        //    console.log(data.connection.host);
        // })

}

export default databaseConnection;