import React, { useEffect, useState, useCallback } from 'react';
import { Text } from '@mantine/core'
import { useQuery } from "react-query";
import data from './data/data.json';
import axios from "axios";



export const BusesList = ({ routes }) => {
    const [buses, setBuses] = useState([]);
    
   const { status, data, error, isFetching }  = useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://6c05x42fjc.execute-api.ap-south-1.amazonaws.com/all_data"
    );
    return data;
  });

    useEffect(() => {
        console.log('BusesList component mounted');
        // console.log(data);
    }, []);

    return <div>{routes.map((route, index) => <Text key={index}>{route}</Text>)}</div>;
};
