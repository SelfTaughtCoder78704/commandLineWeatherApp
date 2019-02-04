const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: "Enter an address to check the weather....",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, res) => {
    if(errorMessage) {
        console.log(errorMessage)
    } else{
        console.log(res.address)
        weather.getWeather(res.latitude, res.longitude, (errorMessage, weatherRes) => {
            if(errorMessage) {
                console.log(errorMessage)
            } else{
                console.log(`Its currently ${weatherRes.temperature}. It feels like ${weatherRes.apparentTemperature}.`)
            }
        })
    }
})

