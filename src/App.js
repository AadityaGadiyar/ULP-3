import React,{useState,useEffect} from 'react';
import './App.css';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import Infobox from './Infobox';
import Map from'./Map';
import { Card, CardContent, Typography } from "@material-ui/core";
import Table from './Table';
import {sortData} from './sorter';
import LineGraph from './Linegraph';
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState('worldwide');
  // For storing individual country info onChangeHandler
  const [countryInfo, setCountryInfo]= useState({});
  //table data 
  const [tableData, setTableData] = useState([])
  // map data
  const [mapCenter, setMapCenter] = useState(
    {lat: 34.80746, lng: -40.4796}
  )
  const [mapZoom, setMapZoom] = useState(3)
  // useEffect(() => {
  //   async function fetchCountryData() {
  //     try {
  //       const request = await axios({
  //         method: "GET",
  //         url: "https://disease.sh/v3/covid-19/countries",
  //         headers: {
  //           Accept: "application / json",
  //         },
  //       }).then((res) => {
  //         console.log(res);
  //         console.log(res.data);
  //         setCountries(res.data);
  //         console.log(res.data[0].country);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchCountryData();
  // })


  useEffect(() => {
    //api call for all countries
      async function fetchCountryData() {
          try {
            const request = await axios({
              method: "GET",
              url: "https://disease.sh/v3/covid-19/countries",
              headers: {
                Accept: "application / json",
              },
            }).then((res) => {
              const sortedData = sortData(res.data)
              setTableData(sortedData)
              setCountries(res.data);
              console.log(res.data)
            });
          } catch (error) {
            console.log(error);
          }
    }
    fetchCountryData();
    // api call for worldwide on first render
      async function fetchAllData() {
          try{
            const request = await axios({
              method: "GET",
              url: "https://disease.sh/v3/covid-19/all",
              headers: {
                Accept: "application / json",
              },
            }).then((res) => {
              setCountryInfo(res.data);
            });
        }
          catch(error){
            console.log(error)
          }
        
        }
    fetchAllData();    
  },[])
  

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await axios(url,{
          method: "GET",          
          headers: {
            Accept: 'application / json',
          },
      }).then(res => {
        setCountry(countryCode);
        setCountryInfo(res.data);
        setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
        setMapZoom(4);
      }
      )
  }

  console.log("Country info",countryInfo)
  
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries
                ? countries.map((country) => (
                    <MenuItem value={country.country}>
                      {country.country}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <Infobox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <Infobox 
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* map */}
        <Map 
        center={mapCenter}
        zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            <Table countries={tableData}/>
            
            <h3>Worldwide cases</h3>
            
            <LineGraph/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
