// import { Routes, Route, Outlet, HashRouter, Switch, BrowserRouter } from "react-router-dom";
import { Routes as Switch, Route } from "react-router-dom"
import Layout from "./components/Layout";
import ApiDetail from "./pages/api-detail/index.jsx";
import Library from "./pages/api-library/index.jsx";
import ContactFaq from "./pages/contact-faq";
import Home from "./pages/home/index.jsx";
import ReleaseNotes from "./pages/release-notes";
import Upload from "./pages/upload/index.jsx";

export default function App() {
  return (
    <Switch>
      <Route exact path="/upload" element={<Layout><Upload /></Layout>} />
      <Route exact path="/library" element={<Layout><Library/></Layout>} />
      <Route path="/library/:api" element={<Layout><ApiDetail /></Layout>} />
      <Route path="/release-notes" element={<Layout><ReleaseNotes/></Layout>} />
      <Route path="/contact-faq" element={<Layout><ContactFaq/></Layout>} />
      <Route path="/" element={<Layout><Home /></Layout>} />
    </Switch>
  );
}

// https://www.figma.com/file/WoSTfRskkgiqnSuCQceFie/API-Direct-Webpage-Designs?node-id=1100%3A4241&t=SyLLU3rxI6SyvgXh-0