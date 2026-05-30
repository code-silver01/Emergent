import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Splash from './pages/Splash';
import Otp from './pages/Otp';
import RoleSelect from './pages/RoleSelect';
import InviteClaim from './pages/InviteClaim';
import OnboardResident from './pages/OnboardResident';
import OnboardGig from './pages/OnboardGig';
import Home from './pages/Home';
import MapPage from './pages/Map';
import NodeProfile from './pages/NodeProfile';
import Barter from './pages/Barter';
import BarterMatch from './pages/BarterMatch';
import Ledger from './pages/Ledger';
import Alerts from './pages/Alerts';
import Favours from './pages/Favours';
import Reputation from './pages/Reputation';
import Jobs from './pages/Jobs';
import Me from './pages/Me';
import Snapshot from './pages/Snapshot';
import AppLayout from './components/AppLayout';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/role" element={<RoleSelect />} />
          <Route path="/invite/:code" element={<InviteClaim />} />
          <Route path="/onboard/resident" element={<OnboardResident />} />
          <Route path="/onboard/gig" element={<OnboardGig />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map/:nodeId" element={<NodeProfile />} />
            <Route path="/barter" element={<Barter />} />
            <Route path="/barter/:matchId" element={<BarterMatch />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/favours" element={<Favours />} />
            <Route path="/reputation" element={<Reputation />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/me" element={<Me />} />
            <Route path="/snapshot" element={<Snapshot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
