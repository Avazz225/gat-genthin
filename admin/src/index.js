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
import Auth from './authentication/Auth';
import UserMgmt from './adminComponents/UserMgmt';

import getLanguageSet from './helpers/language';
import {IntlProvider} from 'react-intl';
import { checkTokenValidity } from './adminComponents/token';
import AdminControls from './adminComponents/AdminControls';
import "./atoms/EditContent.css"
import Calendar from './christmas/Calendar';
import RaffleConfirmation from './christmas/RaffleConfirmation';
import ChristmasForm from './christmas/SolutionForm';
import Imprint from './important/Imprint';

const root = ReactDOM.createRoot(document.getElementById('content'));
const locale = navigator.language;
let lang = getLanguageSet(locale);
const adminComponentsVisibleDefault = false;
const deleteModeDefault = false;
const textEditorDefault = false;

const consoleWarn = console.error;
const SUPPRESSED_WARNINGS = ['A component is ', 'cannot appear', 'You provided a `checked` prop to a form field without an `onChange` handler.'];

console.error = function filterWarnings(msg, ...args) {
    if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
        consoleWarn(msg, ...args);
    }
};

function App() {
  const [adminComponentsVisible, setAdminComponentVisibility] = React.useState(adminComponentsVisibleDefault);
  const [deleteMode, setDeleteMode] = React.useState(deleteModeDefault)
  const [textEditor, setTextEditor] = React.useState(textEditorDefault)
  const [validity, setValidity] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkTokenValidity();
        setValidity(result);
      } catch (error) {
        console.error("Fehler beim Überprüfen des Tokens:", error);
        setValidity(false); 
      }
    };

    fetchData();
  }, []); 

  return (
    <React.StrictMode>
      <IntlProvider locale={locale} messages={lang}>
        {(validity) ?
          <>
            <AdminControls adminComponentsVisible={adminComponentsVisible} setAdminComponentVisibility={setAdminComponentVisibility} deleteMode={deleteMode} setDeleteMode={setDeleteMode} textEditor={textEditor} setTextEditor={setTextEditor} />
            <Navigation />
            <div className="ContentArea">
              <News page={"page_news"} adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor}/>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Welcome page={"page_welcome"} adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor} />} exact />
                  <Route path="/about" element={<About page={"page_about"} adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor} />} exact />
                  <Route path="/repertoire" element={<Repertoire page={"page_repertoire"} adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor} />} exact />
                  <Route path="/gallery" element={<Gallery adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor} />} exact />
                  <Route path="/contact" element={<Contact page={"page_contact"} adminComponentsVisible={adminComponentsVisible} deleteMode={deleteMode} textEditor={textEditor} />} exact />
                  <Route path="/maerchen" element={<Maerchen />} exact />
                  <Route path="/hanssachs" element={<Hanssachs />} exact />
                  <Route path="/veranstaltungen" element={<Veranstaltungen />} exact />
                  <Route path="/kinder-gat" element={<Kindergat />} exact />
                  <Route path="/hinter-den-kulissen" element={<Hinterkulissen />} exact />
                  <Route path="/imprint" element={<Imprint />}exact  />
                  <Route path="/calendar" element={<Calendar />} exact />
                  <Route path="/users" element={<UserMgmt />} exact />
                  <Route path="/enter" element={<ChristmasForm />}exact  />
                  <Route path="/confirmraffle" element={<RaffleConfirmation />}exact  />
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