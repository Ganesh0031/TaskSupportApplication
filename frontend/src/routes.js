import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ChoseRole from "./pages/ChoseRole";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import UserDashboard from "./user/UserDashboard";
import Tickets from "./pages/Tickets";
import {TicketDetails} from "./pages/TicketDetails";

import { Signup } from "./pages/Signup1";

import AddTicket from './user/AddTicket';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChoseRole />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />

        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/signup1" element={<Signup />} />
         <Route path="/addticket" element={<AddTicket />} />
        


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
