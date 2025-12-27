const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Location = require('./models/Location');

// --- सभी राज्यों की फाइलों को यहाँ इम्पोर्ट करें ---
const andhraPradeshData = require('./data/andhraPradeshData');
const arunachalPradeshData = require('./data/arunachalPradeshData');
const assamData = require('./data/assamData');
const biharData = require('./data/biharData');
const chandigarhData = require('./data/chandigarhData');
const chhattisgarhData = require('./data/chhattisgarhData');
const delhiData = require('./data/delhiData');
const goaData = require('./data/goaData');
const gujaratData = require('./data/gujaratData');
const haryanaData = require('./data/haryanaData');
const himachalPradeshData = require('./data/himachalPradeshData');
const jammuKashmirData = require('./data/jammuKashmirData');
const jharkhandData = require('./data/jharkhandData');
const karnatakaData = require('./data/karnatakaData');
const keralaData = require('./data/keralaData');
const ladakhData = require('./data/ladakhData');
const lakshadweepData = require('./data/lakshadweepData');
const madhyaPradeshData = require('./data/madhyaPradeshData');
const maharashtraData = require('./data/maharashtraData');
const manipurData = require('./data/manipurData');
const meghalayaData = require('./data/meghalayaData');
const mizoramData = require('./data/mizoramData');
const nagalandData = require('./data/nagalandData');
const odishaData = require('./data/odishaData');
const puducherryData = require('./data/puducherryData');
const punjabData = require('./data/punjabData');
const rajasthanData = require('./data/rajasthanData');
const sikkimData = require('./data/sikkimData');
const tamilNaduData = require('./data/tamilNaduData');
const telanganaData = require('./data/telanganaData');
const tripuraData = require('./data/tripuraData');
const uttarakhandData = require('./data/uttarakhandData');
const uttarPradeshData = require('./data/uttarPradeshData');
const westBengalData = require('./data/westBengalData');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected for Master Seeding... 🚀');
        importAllData();
    })
    .catch((err) => console.log(err));

const importAllData = async () => {
    try {
        // 1. पुराना डेटा साफ़ करें
        await Location.deleteMany(); 

        // 2. सभी राज्यों के डेटा को एक साथ जोड़ें
        const masterLocationData = [
            ...andhraPradeshData, ...arunachalPradeshData, ...assamData, ...biharData,
            ...chandigarhData, ...chhattisgarhData, ...delhiData, ...goaData,
            ...gujaratData, ...haryanaData, ...himachalPradeshData, ...jammuKashmirData,
            ...jharkhandData, ...karnatakaData, ...keralaData, ...ladakhData,
            ...lakshadweepData, ...madhyaPradeshData, ...maharashtraData, ...manipurData,
            ...meghalayaData, ...mizoramData, ...nagalandData, ...odishaData,
            ...puducherryData, ...punjabData, ...rajasthanData, ...sikkimData,
            ...tamilNaduData, ...telanganaData, ...tripuraData, ...uttarakhandData,
            ...uttarPradeshData, ...westBengalData
        ];

        // 3. डेटाबेस में एक साथ इन्सर्ट करें
        await Location.insertMany(masterLocationData);

        console.log(`Success: ${masterLocationData.length} Locations from all States/UTs imported! ✅`);
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};