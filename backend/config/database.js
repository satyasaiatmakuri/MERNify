const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with Host: ${con.connection.host}`)
    })
}

module.exports = connectDatabase