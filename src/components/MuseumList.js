import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const museums = [
  { id: 1, name: 'Museum A', category: 'Art', location: 'Paris' },
  { id: 2, name: 'Museum B', category: 'History', location: 'London' },
  // Add more museums as needed
];

const MuseumListContainer = styled.div`
  margin: 20px;
`;

const MuseumItem = styled.li`
  margin-bottom: 10px;
`;

const MuseumList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMuseums, setFilteredMuseums] = useState(museums);

  const handleSearch = event => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = museums.filter(museum =>
      museum.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMuseums(filtered);
  };

  return (
    <MuseumListContainer>
      <h1>List of Museums</h1>
      <input
        type="text"
        placeholder="Search museums..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredMuseums.map(museum => (
          <MuseumItem key={museum.id}>
            <Link to={`/museum/${museum.id}`}>
              {museum.name} - {museum.category} - {museum.location}
            </Link>
          </MuseumItem>
        ))}
      </ul>
    </MuseumListContainer>
  );
};

export default MuseumList;
