import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import NavBar from "./components/layouts/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/user/Home";
import { useAdmin, useAuth } from "./hooks";
import Navigator from "./components/admin/Navigator";
import Profile from "./components/user/Profile";
import NotFound from "./components/layouts/NotFound";
import AdminRoute from "./components/admin/AdminRoute";
import Books from "./components/admin/Books";
import Users from "./components/admin/Users";
import Transactions from "./components/admin/Transactions";
import AdminSideNav from "./components/admin/AdminSideNav";

function App() {
  const isAdmin = useAdmin()

  // useEffect(() => {
  //   isAdmin = localStorage.getItem("role") === "ADMIN";
  // }, []);

  return (
    <>
      <NavBar /> 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/signup" element={<SignUp />} />
        <Route element={<AdminRoute admin={isAdmin}/>}>
          <Route exact path="/admin/home" element={<Books />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/transactions" element={<Transactions />} />
        </Route>
        <Route exact path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
