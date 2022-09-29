import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './App.css';
import Landingpage from './landingpage/Landingpage.jsx';
import Login from './Login';

import styled from 'styled-components'

const Application = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: flex-start;
`

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <Application>
      <Router>
        <Routes>
          {code
            ? <Route path="/" element={<Landingpage code={code} />} />
            : <Route path="/" element={<Login />} />
          }
          <Route path="*" element={<Landingpage />} />
        </Routes>
      </Router>
    </Application>
  );
}

export default App;
