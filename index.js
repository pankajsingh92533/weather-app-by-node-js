const http=require("http");
const fs=require("fs");
var requests = require("requests");

//ham html wala file add kr liye index.js mei
const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal=(tempval,orgval)=>{
  let temperature=tempval.replace("{%tempval%}",orgval.main.temp);
  // console.log(temperature);
   temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);
   temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
   temperature=temperature.replace("{%location%}",orgval.name);
    temperature=temperature.replace("{%country%}",orgval.sys.country);
    temperature=temperature.replace("{%tempstatus%}",orgval.weather[0].main);
    
    return temperature;

}

//creating server
const server=http.createServer((req,res)=>{
    //routing
    if(req.url == "/")
    {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Kharagpur&appid=48f79ad3172230568139b86833b15f13")
.on("data",  (chunk)=> {
  const objdata=JSON.parse(chunk);
  const arrData=[objdata];
  const realTimeData=arrData.map((val)=>
    
    replaceVal(homeFile,val)).join("");
  res.write(realTimeData);
  console.log(realTimeData);

  // console.log(arrData);
})
.on(" end",  (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 res.end();
  // console.log('end');
});
    }
});
//now we have to listen
server.listen(8000,"127.0.0.1");