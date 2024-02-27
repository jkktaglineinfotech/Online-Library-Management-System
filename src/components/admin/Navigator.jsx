import React from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import AdminSideNav from "./AdminSideNav";
import Books from "./Books";
import Users from "./Users";
import Transactions from "./Transactions";
import NotFound from "../layouts/NotFound";

function Navigator() {
  return (
    <>
      <NavBar />
      <AdminSideNav/>
      <Routes>
        <Route exact path="/admin" element={<Books />} />
        <Route exact path="/admin/users" element={<Users />} />
        <Route exact path="/admin/transactions" element={<Transactions />} />
        
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default Navigator;