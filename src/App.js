import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Layout><Home /> </Layout>} />
      {/* <Route path="/" element={<Home/>} /> */}
    </Routes>
  );
}

function Wrapper({ children }) {
  return <Layout>
    {children}
  </Layout>
}

// https://www.figma.com/file/WoSTfRskkgiqnSuCQceFie/API-Direct-Webpage-Designs?node-id=1100%3A4241&t=SyLLU3rxI6SyvgXh-0