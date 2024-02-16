// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MuseumList from './components/MuseumList';
import MuseumTour from './components/MuseumTour';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MuseumList/>} />
          <Route path="/museum/:id" element={<MuseumTour/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
