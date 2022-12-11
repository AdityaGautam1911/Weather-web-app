const express=require("express");
const https=require("https");
const app=express();

//nessecary code to be able to use body-parser for post request
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="94a1ffb6276c8cb76832122aaee41f6d";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"%20&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data) //convert hexadecimal data to readable json format
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>THE CURRENT WEATHER IS "+weatherDescription+"<p>");
            res.write("<p>TEMPERATURE IS "+temp+" DEGREE CELCIUS<p>");
            res.write("<img src="+imageURL+">");
            res.send();

            // //the following converts normal json format to compressed 1 line 
            // const object={
            //     name:"Aditya",
            //     favFood:"Maggi"
            // }
            // console.log(JSON.stringify(object));
        })
    })

    // res.send("server is running") //there can only be 1 send method in the app but multiple write() methods
})










app.listen(3000,function(){
    console.log("server is running on port 3000!")
})