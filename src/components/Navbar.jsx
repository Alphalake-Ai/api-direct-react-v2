import { useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles/navbar.css";

const sideItems = [
    { title: "Home", link: "/" },
    { title: "APIdirect Library", link: "/library" },
    { title: "Upload your API", link: "/upload" },
    { title: "Release Notes", link: "/release-notes" },
    // { title: "Technology", link: "https://www.alphalake.ai/technology?hsLang=en" },
    // { title: "Services", link: "https://www.alphalake.ai/services?hsLang=en" },
    // { title: "Events", link: "https://www.alphalake.ai/events?hsLang=en" },
    // { title: "Blog", link: "https://www.alphalake.ai/blog?hsLang=en" },
    // { title: "Resources", link: "https://www.alphalake.ai/resources?hsLang=en" },
    // { title: "Company", link: "https://www.alphalake.ai/company?hsLang=en" }
]

export default function Navbar() {
    const navRef = useRef();
    function openNav() {
        navRef.current.style.width = "min(500px, 100vw)";
    }

    function closeNav() {
        navRef.current.style.width = 0;
    }

    const navigate = useNavigate();

    return (
        <nav id="main-nav">
            <div className="align-items-center d-flex container">
                <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
                    <img
                        src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/api-direct-v2-1/api-direct-logo.png"
                        alt="API Direct Logo"
                    />
                </div>
                <div className="navbar-links font-mont pt-1">
                    <ul>
                        <li className={['#/', '/', ''].includes(window.location.hash) ? "text-primary-3": "text-cc"}>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className={/\#\/library$/.test(window.location.hash) ? "text-primary-3": "text-cc"}>
                            <Link to='/library' >APIdirect Library</Link>
                        </li>
                        <li className={window.location.hash.startsWith("#/upload") ? "text-primary-3": "text-cc"}>
                            <Link to='/upload'>Upload your API</Link>
                        </li>
                    </ul>
                </div>
                <button className="nav-toggle-btn" onClick={openNav}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <div className="sidepanel" ref={navRef}>
                <div className="btn-holder">
                    <button className="nav-toggle-btn" onClick={closeNav}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="ulScroll">
                    <ul>
                        {
                            sideItems.map((item, idx) => <SidebarListItem
                                title={item.title}
                                href={item.link}
                                key={idx}
                                sup={item.sup}
                            />)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}


function SidebarListItem({
    href,
    title,
    sup = false
}) {
    return (
        <li>
            <Link to={href}>
                {title} {sup ? <sup>TM</sup> : <></>}
            </Link>
        </li>
    )
}