const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Employees = require('./models/Employees');
const Vehicles = require('./models/Vehicles');
const Agencies = require('./models/Agencies');
const VehicleTypes = require('./models/VehicleTypes');
const Users = require('./models/Users');
const Points = require('./models/Points');
const Airports = require('./models/Airports');

//UETDS
const UetdsAirport = require('./models/_UetdsAirports');
const UetdsCity = require('./models/_UetdsCities');
const UetdsCountry = require('./models/_UetdsCountry');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/employees.json`, 'utf-8')
);

const vehicles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/vehicles.json`, 'utf-8')
);

const agencies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/agencies.json`, 'utf-8')
);

const vehicleTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/vehicleTypes.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const points = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/points.json`, 'utf-8')
);

const airports = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/airports.json`, 'utf-8')
);


//UETDS
const uetdsAirports = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/_uetdsAirport.json`, 'utf-8')
);

const uetdsCities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/_uetdsCities.json`, 'utf-8')
);

const uetdsCountries = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/_uetdsCountries.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    //UETDS
    await UetdsAirport.create(uetdsAirports);
    console.log('UetdsAirport...OK'.yellow);
    await UetdsCity.create(uetdsCities);
    console.log('UetdsCity...OK'.yellow);
    await UetdsCountry.create(uetdsCountries);
    console.log('UetdsCountry...OK'.yellow);

    //İşlemler
    await Employees.create(employees);
    console.log('Employees...OK'.yellow);
    await Vehicles.create(vehicles);
    console.log('Vehicles...OK'.yellow);
    await Agencies.create(agencies);
    console.log('Agencies...OK'.yellow);
    await VehicleTypes.create(vehicleTypes);
    console.log('VehicleTypes...OK'.yellow);
    await Users.create(users);
    console.log('Users...OK'.yellow);
    await Points.create(points);
    console.log('Points...OK'.yellow);
    await Airports.create(airports);
    console.log('Airports...OK'.yellow);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Employees.deleteMany();
    await Vehicles.deleteMany();
    await Agencies.deleteMany();
    await VehicleTypes.deleteMany();
    await Users.deleteMany();
    await Points.deleteMany();
    await Airports.deleteMany();

    //UETDS
    await UetdsAirport.deleteMany();
    await UetdsCity.deleteMany();
    await UetdsCountry.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}