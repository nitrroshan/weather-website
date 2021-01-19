
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Roshan Kumar Sahu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Roshan Kumar Sahu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Help is at your Service',
        name: 'Roshan Kumar Sahu'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                cod: 404,
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    cod: 404,
                    error
                })
            }
            
             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Roshan Kumar Sahu'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'page not found',
        name: 'Roshan Kumar Sahu'
    })     
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})