import { Card, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import './Infobox'
import Infobox from './Infobox';
import Table from './Table';
import Map from './Map';




function App() {

  const [country, setInputCountry] = useState("worldwide");
  const [centre,setCentre]=useState({
    lat:11.505,
    long:-0.09
  });
  const changeCountry = async (event)=>{
    setInputCountry(event.target.value)

    const countryCode=event.target.value

    
    
      const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
        setCountryInfo(data)
        const centre = countryCode==="worldwide"?{
          lat:91.505,
          long:-10.09 
        }
        :{
          lat:data.countryInfo.lat,
          long:data.countryInfo.long
        };

        console.log(centre)
        setCentre(centre)
      })
    
  }

  const [countries,setCountries] = useState([]);
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([])

  useEffect(()=>{
    const getCountries = async ()=>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data) => {
      let id = 101
      const countries = data.map((country)=>({
        id:id++,
        name:country.country,
        value:country.countryInfo.iso2,
        cases:country.cases
        
      }))
     setCountries(countries) 
     setTableData(data);
    });
    
    }
    getCountries();


    
      
      
  },[])

  useEffect(()=>{

    const fetchData = ()=>{
      fetch("https://disease.sh/v3/covid-19/all")
      .then((res)=>res.json())
      .then((data)=>{
        const countryInfo = data
        console.log("hello")
        console.log(countryInfo);
        setCountryInfo(countryInfo);
        
  
      });
  
    }
    fetchData();
    
  },[])


  return (
    <div className="App">
    <div className="App_left">

    <header className="App_Header">
      <div>
      <h1>Covid-19 Tracker</h1>
      </div>
      <div>
      <FormControl>
        
      <Select
              variant="outlined"
              value={country}
              onChange={changeCountry}
            >
          <MenuItem  key ="worldwide" value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id.toString()} value={country.value}>{country.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      </div>
      
      

      </header> 


      <div className="Info">
      <Infobox number={countryInfo.cases} title="Cases"/>
      <Infobox number={countryInfo.todayCases} title="Today's Cases"/>
      <Infobox number={countryInfo.recovered} title="Recovered"/>
       
      </div>
      <div className="mapid">
       <Map centre={centre} tableData={tableData} />
       </div>

    
  </div>
    <div className="App_right">
      <h2>Worldwide Cases</h2>
       <Card>
        
       <Table tableData={countries} />   
       </Card>

       

    </div>
</div>
  );
}

export default App;
