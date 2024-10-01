
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI,{connectTimeoutMS: 30000})
 
.then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Database connection error: ', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
