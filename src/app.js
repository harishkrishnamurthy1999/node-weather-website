const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

console.log(__dirname) 
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT ||3000

//Define path for express config
const publicDirectoryPath =path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' ,viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) => {
    res.render('' , {
        title:'Weather app',
        name:'Harish',
    })
})

app.get('/about', (req,res) => {
    res.render('about' ,{
        title:'About me',
        name:'Harish',
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        help:'How can I assist you',
        title:'Help',
        name:'Harish',
      
    })
})

app.get('/weather',(req,res) =>{
    
      if(!req.query.address){
          return res.send({
              error:'Please provide an address'
          })
      } 
      geocode(req.query.address , (error ,{latitude,longitude,location}) => {
        if(error){
               return res.send({error})
        }
 
         forecast(latitude,longitude, (error, forecastData) => {
                if(error) {
                        return res.send({error})
                }
                res.send([{
                    forecast : forecastData,
                    location :location,
                    address : req.query.address
                }])
               })
         
 })
   
})

app.get('/help/*' ,(req,res) => {
    res.render('404page', {
        title:'Help article not found',
        name:'Harish',
        errorMessage:'page not found'  
    })
})

app.get('*' , (req,res) => {
    res.render('404page',{
        title:'404 page',
        name:'Harish',
        errorMessage:'page not found'
    })
})

//listern
app.listen(port,()=>{
    console.log('server started at ' + port)
})