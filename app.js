const yargs = require('yargs');
const axios = require('axios');

const arguments = yargs
    .option('location', {
        describe: "Enter the relevant location",
        demand: true,
        alias: 'l',
        default: 'Delhi'
    })
    .help()
    .argv;

let location = arguments.location;
let geolocationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location;
let forecastUrl = 'https://api.darksky.net/forecast/1a5299edf0bdfbe60b5a9d0dc00b7cf3/';

axios.get(geolocationUrl).then((body) => {
    if(body.data.results[0]){
        let latitude = body.data.results[0].geometry.location.lat;
        let longitude = body.data.results[0].geometry.location.lng;
        forecastUrl += latitude + ',' + longitude + '?units=si';
        return axios.get(forecastUrl);
    }
    throw new Error(body.data.results[0].error);
}).then((body) => {
    console.log({
        summary: body.data.currently.summary,
        temperature: body.data.currently.temperature
    });
}).catch((error) => {
    console.log(error);
});