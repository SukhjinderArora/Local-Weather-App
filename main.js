var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

var temp;
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(success, error, options);
    $('#tempUnit').on("click",function(){
        var tempType=""+$("#tempUnit").text();
       
        var tempInF="";
        var tempInC="";
        if(tempType.includes("C")){
            tempInF=Math.round(temp*1.8+32);
            
            $('#temp').html(" "+tempInF+" °");
            $('#tempUnit').html("F");
        }
        else{
            
            $('#temp').html(" "+temp+" °");
            $('#tempUnit').html("C");
            
        }
    });
});


function success(pos) {
    var crd = pos.coords;
    var latitude = crd.latitude;
    var longitude = crd.longitude;
    var url = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&" + "lat=" + latitude;
    localWeather(url);
   
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
     $("#city").html(err.message);
};

function localWeather(url){
    
    $.getJSON(url,function(json){
        var desciption=json.weather[0].description;
        var iconUrl=json.weather[0].icon;
        temp=json.main.temp;
        temp=Math.round(temp * 10) / 10;
        var country=json.sys.country;
        var city=json.name+", "+country;
        $("#city").html(city);
        $("#temp").html(" "+temp+" °");
        $("#tempUnit").html("C");
        $("#description").html(desciption);
        $("#weather-icon").prop("src", iconUrl);
    })
}

