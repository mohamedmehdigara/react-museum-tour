import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HistoricalInfo from './HistoricalInfo';

const TourContainer = styled.div`
  margin: 20px;
`;

const MuseumTour = () => {
  const { id } = useParams();
  const [museumData, setMuseumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching museum data based on id
    fetchMuseumData(id);
  }, [id]);

  const fetchMuseumData = id => {
    // Simulate fetching museum data with a delay
    setTimeout(() => {
      const museum = {
        id,
        name: `Museum ${id}`,
        description: `This is a virtual tour of Museum ${id}.`,
        // Add more fields as needed
      };
      setMuseumData(museum);
      setLoading(false);
    }, 1000);
  };

  return (
    <TourContainer>
      <h1>Museum Tour</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {museumData && (
        <>
          <h2>{museumData.name}</h2>
          <p>{museumData.description}</p>
          {/* Add additional tour content such as images or videos */}
          <HistoricalInfo />
        </>
      )}
    </TourContainer>
  );
};

export default MuseumTour;
