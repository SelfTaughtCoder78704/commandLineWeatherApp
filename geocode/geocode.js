const keys = require('../keys')
const request = require('request')


const geocodeAddress = (address, callback) =>{
     address = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to Google Servers")
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback(`Unable to find that address. Status: ${body.status}`)
        }
        else if (body.status === 'OK') {
            callback(undefined, {
                address:  body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });
}


module.exports.geocodeAddress = geocodeAddress