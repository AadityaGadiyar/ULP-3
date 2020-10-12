import React, {useState,useEffect} from 'react';
import {Line } from 'react-chartjs-2';
import axios from 'axios';
import numeral from 'numeral';


function Linegraph() {
    const [date,setDate] = useState([])
    const [val, setVal] = useState([])



    useEffect(() => {
            async function fetchCountryData() {
            try {
                    const request = await axios({
                    method: "GET",
                    url:
                        "https://disease.sh/v3/covid-19/historical/all?lastdays=30",
                    headers: {
                        Accept: "application / json",
                    },
                    }).then((res) => {
                        setDate(Object.keys(res.data.cases))
                        setVal(Object.values(res.data.cases))
                    // const sortedData = sortData(res.data);
                    // setTableData(sortedData);
                    // setCountries(res.data);
                    // console.log(res.data);
                });
            } catch (error) {
                console.log(error);
            }
            }
            fetchCountryData();
    })


    const data = {
      labels: date,
      datasets: [
        {
          label: "Cases in 2020",
          data: val,
          borderColor: ["rgba(255,206,86,0.2)"],
          backgroundColor: ["rgba(255,206,86,0.2)"],
          pointBackgroundColor: "rgba(255,206,86,0.2)",
          pointBorderColor: "rgba(255,206,86,0.2)"
        },
      ],
    };
    const options={
        scales:{
            yAxes:[
                {
                    ticks:{
                        min :20000000,
                        max :40000000,
                        stepSize: 5000000
                    }
                }
            ]
        }
    }
    // const options= {
    //     legend:{
    //         display:false
    //     },
    //     elements:{
    //         point:{
    //             radius:0,
    //         },
    //     },
    //     maintainaspectRatio: false,
    //     tooltips:{
    //         mode:"index",
    //         intersect:false,
    //         callbacks:{
    //             label: function (tooltipItem, data){
    //                 return numeral(tooltipItem.value).format("+0,0");
    //             },
    //         },
    //     }, 
    //     scales:{
    //         xAxes:[
    //             {
    //                 type:"time",
    //                 time:{
    //                     format:"MM/DD/YY",
    //                     tooltipFormat:"ll",
    //                 }
    //             }
    //         ],
    //         yAxes:[
    //             {
    //                 gridLines:{
    //                     display:false,
    //                 },
    //                 ticks:{
    //                     callback: function(value, index, values){
    //                         return numeral(value).format("0a");
    //                     }
    //                 }
    //             }
    //         ]
    //     }
    // }
    
    return (
      <div>
        
          <Line
            data={data}
            options={options}
          />
        
      </div>
    );
}

export default Linegraph
