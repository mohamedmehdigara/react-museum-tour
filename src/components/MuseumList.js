// MuseumList.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const museums = [
  { id: 1, name: 'Museum A' },
  { id: 2, name: 'Museum B' },
  // Add more museums as needed
];

class MuseumList extends Component {
  render() {
    return (
      <div>
        <h1>List of Museums</h1>
        <ul>
          {museums.map(museum => (
            <li key={museum.id}>
              <Link to={`/museum/${museum.id}`}>{museum.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MuseumList;
