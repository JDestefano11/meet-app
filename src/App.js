import React, { useEffect, useState } from 'react';
import CitySearch from './components/Citysearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import EventScatterPlot from './components/EventScatterPlot';
import EventGenresChart from './components/EventGenresChart';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. The displayed events may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));

    const locationCount = allEvents.reduce((acc, event) => {
      const location = event.location;
      if (!acc[location]) {
        acc[location] = 0;
      }
      acc[location]++;
      return acc;
    }, {});

    const data = Object.keys(locationCount).map(location => ({
      location,
      count: locationCount[location]
    }));

    setScatterData(data);
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents setNumberOfEvents={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <EventList events={events} />
      <div className="charts-container">
        <EventScatterPlot data={scatterData} />
        <EventGenresChart events={events} />
      </div>
    </div>
  );
};

export default App;
