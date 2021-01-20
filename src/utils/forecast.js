const request=require('request')

const forecast=(lat,lon,callback)=>{

    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&appid=5cc7e700a824ca67629270c84f79c731&units=imperial'
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Forecast Services!',undefined)

        }else if(body.cod){
            callback(body.message,undefined)

        }else{
            callback(undefined,`The outside temprature is ${body.current.temp}.The weather is ${body.current.weather[0].main} & ${body.current.clouds}% chances of precepitation`)
        }
   
    })
}

module.exports=forecast