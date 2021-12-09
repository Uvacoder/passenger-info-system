import React, { useEffect, useState, useCallback } from 'react';
import { Text } from '@mantine/core'
import { useQuery } from "react-query";
import data from './data/data.json';
import axios from "axios";


export const BusesList = ({ routes }) => {
    const [buses, setBuses] = useState([]);
    const [apiData, setApiData] =  useState([]);

    const getBuses = (rawData) => {
        const etaData = rawData["Items"].filter(item => item.data_type === 'eta')[0];
        const buses = [];
        console.log(etaData, routes);
        for(let i = 0; i < Object.keys(etaData).length ; i++) {
          const values = Object.values(etaData);
          const busData = values[i];
          if(busData !== 'eta' && i === 2) {

            console.log({busData, bus: Object.keys(etaData)[i]});

            const bus = busData.filter(item => { console.log({item, code:item[0].join('_'), routes, bool: routes.includes(item[0].join('_'))}); return routes.includes(item[0].join('_'))})
            console.log({bus});
            if(bus.length > 0) {
              buses.push({...bus, number:Object.keys(etaData)[i]} );
            }
          }
        }
        return buses;
    }
    
   const { status, data, error, isFetching }  = useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://6c05x42fjc.execute-api.ap-south-1.amazonaws.com/all_data"
    );
    return data;
  }, {
    // Refetch the data every second
    refetchInterval: 5000,
  });

    useEffect(() => {
      setApiData(data);
      if(data) {
        const buses = getBuses(data);
        console.log(buses);
        setBuses(buses);
      }
    }, [data, routes, buses]);

    return (
    <div>
      {routes.map((route, index) => <Text key={index}>{route}</Text>)}
      {JSON.stringify(buses)}
      </div>
    );
};
