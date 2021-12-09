import { useCallback, useEffect, useState } from 'react';
import { AppShell, Navbar, Header, Text, Select, Button } from '@mantine/core';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import data from './data/data.json';
import { BusesList } from './buses-list';



const App = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('Airport - Domestic Departures');
  const [isStartingPointDisabled, setIsStartingPointDisabled] = useState(false);
  const [isDestinationDisabled, setIsDestinationDisabled] = useState(true);
  const [showData, setShowData] = useState(false);
  const [routes, setRoutes] = useState([]);

  const getRoutes = useCallback(() => {
    const routeMapEntry = data.routes.filter(item => item["Origin"] === startingPoint && item["Destination"] === destination);
    const routes = routeMapEntry.length > 0 ? routeMapEntry[0]["Routes"] : '';
    return routes && routes.includes(',') ? routes.split(',').map(item => item.trim()) : [routes];
  }, [startingPoint, destination]);

  useEffect(() => {
    setRoutes(getRoutes()); 
    console.log(routes);
  }, [startingPoint, destination]);



  return (
      <AppShell
        padding="md"
        header={<Header  styles={{root: { textAlign: 'center' }}} height={60} padding="xs"><Text>TSRTC Passenger Info System</Text></Header>}
      >
        <Select
          searchable
          styles={{ root: { width: '30%', marginBottom: '12px' } }}
          value={startingPoint} 
          disabled={isStartingPointDisabled}
          onChange={(value) => { 
            setStartingPoint(value); 
            if(value?.includes('Airport')) {
              setIsDestinationDisabled(false) 
            } else {
              setDestination('Airport - Domestic Departures')
              setIsDestinationDisabled(true)
            }
          }}
          label="Select a starting point"
          data={data.stops}
        />
        <Select
          searchable
          styles={{ root: { width: '30%' } }}
          value={destination} 
          disabled={isDestinationDisabled}
          onChange={setDestination}
          label="Select a destination"
          data={data.stops}
        />
        <Button styles={{ root: { marginTop: '10px' }}} onClick={() => setShowData(true)}>Search</Button>
        {showData && <BusesList routes={routes.map(item => item.trim())} /> }
      </AppShell>
  );
}

export default App
