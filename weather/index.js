class Weather extends React.Component {

    constructor() {
        super();
        this.state = {
            city: "",
            temperature: null,
            moisture: null,
            wheatherIcon: ""
        }
    }

    showWeather() {
        var place = this.place.value;
        if(!place){ alert("Şehir ismi arayınız");}
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=dbc7958dbde853b4271857dc23793dfe`).then( (response) => {
                response.json().then((resp) => {
                    var city = resp.name;
                    var temp = resp.main.temp - 273.15;
                    var moi = resp.main.humidity;
                    var icon = resp.weather[0].icon;
                    document.querySelector(".main").style.display = "block";

                    this.setState({
                       city: city,
                       temperature: temp.toFixed(2),
                       moisture: moi,
                       wheatherIcon: icon
                    });                  
                })
              }).catch(function (err) {
                    console.log(err);
              })  
    }

    render() {
        let city = this.state.city;
        let temp = this.state.temperature;
        let moi = this.state.moisture;
        let icon = `http://openweathermap.org/img/w/${this.state.wheatherIcon}.png`;

        return (<div>
            <input ref={e => this.place = e} type="text" placeholder="Istanbul etc."/>
            <button className="button" onClick={() => this.showWeather()}>Ara</button>
            <div className="main">
                <div className="left">
                    <div>
                        {city}
                    </div><br/>
                    <div>
                    Hava Durumu: {temp}
                    </div><br/>
                    <div>
                        Nem: %{moi}
                    </div><br/>
                </div>
                <div className="right">
                     <img  src={icon} />
                </div>
            </div> 
        </div>);
    }
}


var container = document.querySelector("#placeholder");
ReactDOM.render(<Weather/>, container);

