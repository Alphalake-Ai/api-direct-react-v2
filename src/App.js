// import { Routes, Route, Outlet, HashRouter, Switch, BrowserRouter } from "react-router-dom";
import { Routes as Switch, Route } from "react-router-dom"
import Layout from "./components/Layout";
import ApiDetail from "./pages/api-detail/index.jsx";
import Home from "./pages/home/index.jsx";
import Upload from "./pages/upload/index.jsx";

export default function App() {
  return (
    <Switch>
      <Route exact path="/upload" element={<Layout><Upload /></Layout>} />
      <Route path="/detail/:api" element={<Layout><ApiDetail /></Layout>} />
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Switch>
  );
}

// https://www.figma.com/file/WoSTfRskkgiqnSuCQceFie/API-Direct-Webpage-Designs?node-id=1100%3A4241&t=SyLLU3rxI6SyvgXh-0