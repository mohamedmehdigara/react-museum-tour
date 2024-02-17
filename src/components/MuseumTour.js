// MuseumTour.js
import React, { Component } from 'react';
import HistoricalInfo from './HistoricalInfo';

class MuseumTour extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>Museum Tour</h1>
        {/* Display museum tour content */}
        <HistoricalInfo museumId={id} />
      </div>
    );
  }
}

export default MuseumTour;
