import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, HashRouter} from "react-router-dom";
import 'style/style.css';
import News from './siteContent/News';
import Navigation from './navandfoot/Navigation';
import Welcome from './siteContent/Welcome';
import About from './siteContent/About';
import Repertoire from './siteContent/Repertoire';
import Gallery from './siteContent/Gallery';
import Contact from './siteContent/Contact';
import Footer from './navandfoot/Footer';
import reportWebVitals from './reportWebVitals';
import Maerchen from './siteContent/gallery/maerchen';
import Hanssachs from './siteContent/gallery/hanssachs';
import Veranstaltungen from './siteContent/gallery/veranstaltungen';
import Kindergat from './siteContent/gallery/kinder-gat';
import Hinterkulissen from './siteContent/gallery/hinter-den-kulissen';
import Calendar from './siteContent/Calendar';
import Imprint from './important/Imprint';
import TestContent from './siteContent/TestContent';
import RaffleConfirmation from './christmas/RaffleConfirmation';

const root = ReactDOM.createRoot(document.getElementById('content'));

root.render(
  <React.StrictMode>
    <Navigation />
    <div className="ContentArea">
      <News />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />}exact  />
          <Route path="/about" element={<About />}exact  />
          <Route path="/repertoire" element={<Repertoire />}exact  />
          <Route path="/gallery" element={<Gallery />}exact />
          <Route path="/contact" element={<Contact />}exact  />
          <Route path="/maerchen" element={<Maerchen />} exact />
          <Route path="/hanssachs" element={<Hanssachs />}exact  />
          <Route path="/veranstaltungen" element={<Veranstaltungen />}exact  />
          <Route path="/kinder-gat" element={<Kindergat />}exact  />
          <Route path="/hinter-den-kulissen" element={<Hinterkulissen />}exact  />
          <Route path="/calendar" element={<Calendar />}exact  />
          <Route path="/imprint" element={<Imprint />}exact  />
          <Route path="/test" element={<TestContent />}exact  />
          <Route path="/confirmraffle" element={<RaffleConfirmation />}exact  />
        </Routes>
      </HashRouter>
    </div>
    <Footer />
  </React.StrictMode>
);

reportWebVitals();