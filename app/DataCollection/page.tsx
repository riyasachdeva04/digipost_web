"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SummaryCards } from '../components/summary-cards';
import { EnvironmentalMetrics } from '../components/environmental-metrics';

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [areas, setAreas] = useState<{[key: string]: string[]}>({});
  const [villages, setVillages] = useState<{[key: string]: {[key: string]: string[]}}>({});

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [newCity, setNewCity] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [isCityInput, setIsCityInput] = useState(true);

  const [metrics, setMetrics] = useState({
    fuel: 'Select a location',
    waste: 'Select a location',
    aqi: 'Select a location'
  });

  useEffect(() => {
    Papa.parse('/data2.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const parsedData = results.data;
        setData(parsedData);

        // Extract unique cities
        const uniqueCities = [...new Set(parsedData.map(row => row.city))];
        setCities(uniqueCities);

        // Process areas and villages
        const areasMap: {[key: string]: string[]} = {};
        const villagesMap: {[key: string]: {[key: string]: string[]}} = {};

        parsedData.forEach(row => {
          // Process areas
          if (!areasMap[row.city]) {
            areasMap[row.city] = [];
          }
          if (!areasMap[row.city].includes(row.area)) {
            areasMap[row.city].push(row.area);
          }

          // Process villages
          if (!villagesMap[row.city]) {
            villagesMap[row.city] = {};
          }
          if (!villagesMap[row.city][row.area]) {
            villagesMap[row.city][row.area] = [];
          }
          if (!villagesMap[row.city][row.area].includes(row.village)) {
            villagesMap[row.city][row.area].push(row.village);
          }
        });

        setAreas(areasMap);
        setVillages(villagesMap);
      }
    });
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedArea('');
    setSelectedVillage('');
    setMetrics({
      fuel: 'Select an area',
      waste: 'Select an area',
      aqi: 'Select an area'
    });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value;
    setSelectedArea(area);
    setSelectedVillage('');
    setMetrics({
      fuel: 'Select a village',
      waste: 'Select a village',
      aqi: 'Select a village'
    });
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const village = e.target.value;
    setSelectedVillage(village);
  };

  const handleSetLocation = () => {
    // Find the matching row in the data
    const selectedRow = data.find(
      row => 
        row.city === selectedCity && 
        row.area === selectedArea && 
        row.village === selectedVillage
    );

    if (selectedRow) {
      setMetrics({
        fuel: selectedRow.fuel,
        waste: selectedRow.waste,
        aqi: selectedRow.aqi
      });
    } else {
      setMetrics({
        fuel: 'No data found',
        waste: 'No data found',
        aqi: 'No data found'
      });
    }
  };

  const handleAddNew = () => {
    if (isCityInput) {
      // Add a new city
      if (newCity && !cities.includes(newCity)) {
        setCities([...cities, newCity]);
        setAreas({ ...areas, [newCity]: [] });
      }
    } else {
      // Add a new area or village
      if (selectedCity) {
        if (newArea && !areas[selectedCity].includes(newArea)) {
          setAreas({
            ...areas,
            [selectedCity]: [...areas[selectedCity], newArea],
          });
        } else if (selectedArea && newVillage && 
          !villages[selectedCity]?.[selectedArea]?.includes(newVillage)) {
          const updatedVillages = {
            ...villages,
            [selectedCity]: {
              ...villages[selectedCity],
              [selectedArea]: [...(villages[selectedCity][selectedArea] || []), newVillage],
            },
          };
          setVillages(updatedVillages);
        }
      }
    }

    // Clear input fields after adding
    setNewCity('');
    setNewArea('');
    setNewVillage('');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Environmental Metrics Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* City Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label htmlFor="city">Select City:</label>
          <select 
            id="city" 
            value={selectedCity} 
            onChange={handleCityChange} 
            className="border p-2 rounded w-full"
          >
            <option value="">--Select City--</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Area Dropdown */}
        {selectedCity && (
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="area">Select Area:</label>
            <select 
              id="area" 
              value={selectedArea} 
              onChange={handleAreaChange} 
              className="border p-2 rounded w-full"
            >
              <option value="">--Select Area--</option>
              {areas[selectedCity]?.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
          </div>
        )}

        {/* Village Dropdown */}
        {selectedArea && (
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="village">Select Village:</label>
            <select 
              id="village" 
              value={selectedVillage} 
              onChange={handleVillageChange} 
              className="border p-2 rounded w-full"
            >
              <option value="">--Select Village--</option>
              {villages[selectedCity]?.[selectedArea]?.map((village, index) => (
                <option key={index} value={village}>{village}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button
        onClick={handleSetLocation}
        className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        disabled={!selectedCity || !selectedArea || !selectedVillage}
      >
        Set Location
      </button>

      {/* Add New Location Section */}
      <div className="mt-6  p-4 rounded">
        <h3 className="text-xl font-semibold mb-4">Add New Location</h3>
        <div className="mb-4">
          <label>
            <input
              type="radio"
              name="inputType"
              checked={isCityInput}
              onChange={() => setIsCityInput(true)}
              className="mr-2"
            />
            Add City
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="inputType"
              checked={!isCityInput}
              onChange={() => setIsCityInput(false)}
              className="mr-2"
            />
            Add Area or Village
          </label>
        </div>

        {isCityInput ? (
          <div>
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Enter new city"
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        ) : (
          <div>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            
            {selectedCity && (
              <>
                <input
                  type="text"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  placeholder="Enter new area"
                  className="w-full p-2 border rounded mb-4"
                />
                {newArea && (
                  <input
                    type="text"
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    placeholder="Enter new village"
                    className="w-full p-2 border rounded"
                  />
                )}
              </>
            )}
          </div>
        )}

        <button 
          onClick={handleAddNew} 
          className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
          disabled={
            (isCityInput && !newCity) || 
            (!isCityInput && (!selectedCity || !newArea || !newVillage))
          }
        >
          Add Location
        </button>
      </div>

      {/* Metrics Display */}
      {selectedCity && selectedArea && selectedVillage && (
        <div className=" p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">
            Metrics for {selectedCity} - {selectedArea} - {selectedVillage}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <strong>Fuel Consumption:</strong> {metrics.fuel} L
            </div>
            <div>
              <strong>Waste Collected:</strong> {metrics.waste} kg
            </div>
            <div>
              <strong>AQI Level:</strong> {metrics.aqi}
            </div>
          </div>
        </div>
      )}

      {/* Summary and Metrics Components */}
      <div className="space-y-6 mt-6">
        <SummaryCards fuelData={data.reduce((acc, item) => {
          acc[`${item.city}_${item.area}_${item.village}`] = item.fuel;
          return acc;
        }, {})} 
        wasteData={data.reduce((acc, item) => {
          acc[`${item.city}_${item.area}_${item.village}`] = item.waste;
          return acc;
        }, {})} 
        />
        <EnvironmentalMetrics 
          fuelData={data.reduce((acc, item) => {
            acc[`${item.city}_${item.area}_${item.village}`] = item.fuel;
            return acc;
          }, {})} 
          wasteData={data.reduce((acc, item) => {
            acc[`${item.city}_${item.area}_${item.village}`] = item.waste;
            return acc;
          }, {})} 
        />
      </div>
    </div>
  );
}