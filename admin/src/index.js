import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, HashRouter} from "react-router-dom";
import 'style/style.css'
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
import Auth from './authentication/Auth';

import getLanguageSet from './helpers/language';
import {IntlProvider} from 'react-intl';
import { getToken } from './helpers/token';
import { useState } from 'react';
import AdminControls from './siteContent/AdminControls';

const root = ReactDOM.createRoot(document.getElementById('content'));
const locale = navigator.language;
let lang = getLanguageSet(locale);
const adminComponentsVisibleDefault = false;

function App() {
  const [adminComponentsVisible, setAdminComponentVisibility] = React.useState(adminComponentsVisibleDefault);

  return (
    <React.StrictMode>
      <IntlProvider locale={locale} messages={lang}>
        {(getToken()) ?
          <>
            <AdminControls adminComponentsVisible={adminComponentsVisible} setAdminComponentVisibility={setAdminComponentVisibility} />
            <Navigation />
            <div className="ContentArea">
              <News adminComponentsVisible={adminComponentsVisible} />
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Welcome adminComponentsVisible={adminComponentsVisible} />} exact />
                  <Route path="/about" element={<About adminComponentsVisible={adminComponentsVisible} />} exact />
                  <Route path="/repertoire" element={<Repertoire adminComponentsVisible={adminComponentsVisible} />} exact />
                  <Route path="/gallery" element={<Gallery adminComponentsVisible={adminComponentsVisible} />} exact />
                  <Route path="/contact" element={<Contact adminComponentsVisible={adminComponentsVisible} />} exact />
                  <Route path="/maerchen" element={<Maerchen />} exact />
                  <Route path="/hanssachs" element={<Hanssachs />} exact />
                  <Route path="/veranstaltungen" element={<Veranstaltungen />} exact />
                  <Route path="/kinder-gat" element={<Kindergat />} exact />
                  <Route path="/hinter-den-kulissen" element={<Hinterkulissen />} exact />
                  <Route path="/calendar" element={<Calendar />} exact />
                </Routes>
              </HashRouter>
            </div>
            <Footer />
          </>
          :
          <Auth />
        }
      </IntlProvider>
    </React.StrictMode>
  );
}

root.render(<App />);
reportWebVitals();