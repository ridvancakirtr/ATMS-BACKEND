const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const colors = require('colors')
const morgan = require('morgan')
var cors = require('cors')

const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' })
const app = express()

app.use(express.json());

app.use(cors({ origin: ["https://atms-frontend.herokuapp.com"], credentials: true }));
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//Connect to DB
connectDB();

//Route files
const employees = require('./routes/employees')
const vehicles = require('./routes/vehicles')
const agencies = require('./routes/agencies')
const vehicletypes = require('./routes/vehicleTypes')
const users = require('./routes/users')
const customers = require('./routes/customers')
const auth = require('./routes/auth')
const uetds = require('./routes/uetds')
const points = require('./routes/points')
const airports = require('./routes/airports')
const rezervations = require('./routes/rezervations')
const uetdssoapservices = require('./routes/uetdsSoapServiceTestURL')
const uetdsNotification = require('./routes/uetdsNotification')
const taxation = require('./routes/settings/taxation')

//Mount files
app.use('/api/v1/employees', employees);
app.use('/api/v1/vehicles', vehicles);
app.use('/api/v1/agencies', agencies);
app.use('/api/v1/vehicletypes', vehicletypes);
app.use('/api/v1/users', users);
app.use('/api/v1/customers', customers);
app.use('/api/v1/auth', auth);
app.use('/api/v1/uetds', uetds);
app.use('/api/v1/points', points);
app.use('/api/v1/airports', airports);
app.use('/api/v1/rezervations', rezervations);
app.use('/api/v1/uetdssoapservice', uetdssoapservices);
app.use('/api/v1/uetdsnotification', uetdsNotification);

app.use('/api/v1/settings/taxation', taxation);

app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Success app listening at http://localhost:${PORT}`.green.bold)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Connection Error Reason:'.red.bold, reason.message);
    server.close(() => {
        process.exit(true);
    })
});