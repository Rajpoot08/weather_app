let search_btn=document.getElementById('search_btn')
let input=document.getElementById('sitems')
search_btn.addEventListener('click',()=>{
    change_width();
    search_rotate();
})
input.addEventListener('focus',()=>{
    input.style.borderBlockColor='black'
})

function search_rotate() {
    search_btn.style.transform='rotateZ(360deg)'
}
function change_width(){
    input.classList.add('change_width')
}

///// elements dom
let location_name=document.getElementById('location_name')
let country_code=document.getElementById('country_code')
let weather_icon=document.getElementById('weather_icon')
let description=document.getElementById('description')
let pressure=document.getElementById('ovalue1')
let temperature=document.getElementById('ovalue2')
let wind_speed=document.getElementById('ovalue3')
let error_box=document.getElementById('error_box')
let error_msg=document.getElementById('error_msg')
let close_error=document.getElementById('close_error')
close_error.addEventListener('click',()=>{
    error_box.style.display='none'

})
const apiKey = 'f40ec58cce5dc6c1c39484db9f33fd97'; 
search_btn.addEventListener('click',feach_api)
function feach_api() {
    if(input.classList.contains('change_width')==true){
        const city = input.value;
          if (city.trim() === '') return;
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
         fetch(url)
             .then(response => {
          if (!response.ok) throw new Error("City not found");
             return response.json();
            })
             .then(data => {
                console.log(data)
                weather_icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                location_name.innerHTML=`" ${data.name}"`
                country_code.innerHTML=`" ${data.sys.country}"`
                description.innerHTML=`${data.weather[0].description}`
                pressure.innerHTML=`${data.main.pressure}hPa`
                temperature.innerHTML=`${data.main.temp}°C`
                wind_speed.innerHTML=`${data.wind.speed}m/s`
              input.classList.remove('change_width')
              input.value=''
            })
            .catch(err => {
                console.error(err.message);
                error_msg.innerHTML=`${err.message}`
              error_box.style.display='block'
              input.value=' '
              input.classList.remove('change_width')
        
              });
    }else{
        console.error('The input field was not opened')
    }
    
}

function defaultFetch() {
    const city = 'Multan';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then(data => {
        console.log(data);
        weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        location_name.innerHTML = `" ${data.name}"`;
        country_code.innerHTML = `" ${data.sys.country}"`;
        description.innerHTML = `${data.weather[0].description}`;
        pressure.innerHTML = `${data.main.pressure}hPa`;
        temperature.innerHTML = `${data.main.temp}°C`;
        wind_speed.innerHTML = `${data.wind.speed}m/s`;
      })
      .catch(err => {
        console.error(err.message);
        error_msg.innerHTML=`${err.message}`
     error_box.style.display='block'

      });
  }



  window.onload = () => {
    defaultFetch(); 
  };
  
  



