const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url =  'http://api.weatherstack.com/forecast?access_key=7af1ef47753d7b296996635b0958cc87&query=' + latitude +',' + longitude
    request({url , json:true} , (error ,{body}) => {
            if(error) {
                    callback('network error',undefined)
            }
            else if(body.error) {
                    callback('unable to process the request',undefined)
            }
            else {
                    callback(undefined, body.current.weather_descriptions +' throughout the day. It is currently '+ body.current.temperature +' degrees out.There is ' + body.current.precip + '% chances of rain')
            }
    })
}

module.exports = forecast