// MuseumTour.js
import React, { Component } from 'react';
import HistoricalInfo from './HistoricalInfo';

class MuseumTour extends Component {
  render() {
    return (
      <div>
        <h1>Museum Tour</h1>
        {/* Display museum tour content */}
        <HistoricalInfo museumId={this.props.match.params.id} />
      </div>
    );
  }
}

export default MuseumTour;
