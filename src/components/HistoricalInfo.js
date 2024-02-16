import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HistoricalInfo = () => {
  // Mock historical information data
  const historicalInfo = {
    description: "The Mona Lisa is a half-length portrait painting by the Italian artist Leonardo da Vinci. It is considered an archetypal masterpiece of the Italian Renaissance.",
    year: 1503,
    artist: "Leonardo da Vinci",
    style: "Renaissance",
    location: "Louvre Museum, Paris"
    // Add more fields as needed
  };

  return (
    <InfoContainer>
      <h2>Historical Information</h2>
      <div>
        <p>Description: {historicalInfo.description}</p>
        <p>Year: {historicalInfo.year}</p>
        <p>Artist: {historicalInfo.artist}</p>
        <p>Style: {historicalInfo.style}</p>
        <p>Location: {historicalInfo.location}</p>
        {/* Add more information fields as needed */}
      </div>
    </InfoContainer>
  );
};

export default HistoricalInfo;
