import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CliniciansIcon, EhrIcon, GridIcon, HospitalIcon, ListIcon } from '../../components/TextTags';
import { baseUrl } from '../../config/constants';
import "../styles/global-n.css";
import Card from './comp-api-card';
import "./style.css";


const tags = [
    { title: "EHR", tag: "EHR", iconUrl: "/images/ehr-page.svg", icon: <EhrIcon /> },
    { title: "Hospital", tag: "Hospital", iconUrl: "/images/hospital-h.svg", icon: <HospitalIcon /> },
    { title: "Clinicians", tag: "Clinician", iconUrl: "/images/clinicians.svg", icon: <CliniciansIcon /> },
]


function matchAtleastOne(arr1 = [], arr2 = []) {
    for (let index = 0; index < arr1.length; index++) {
        if (arr2.includes(arr1[index])) {
            return true;
        }
    }
    return false;
}

export default function Main() {

    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [listView, setListView] = useState(false);
    const [allCards, setAllCards] = useState([]);
    const [cards, setCards] = useState([]);

    async function onSearchFormSubmit(e) {
        e?.preventDefault();
        try {
            const { data } = await axios.get(baseUrl + `/api-cards?q=${searchQuery}&tags=${selectedTags.join(",")}`);
            setAllCards(data.data);
            setCards(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { onSearchFormSubmit() }, []);

    useEffect(() => {
        if (searchQuery) {
            let regex = new RegExp(searchQuery, 'i');
            let temp = allCards.filter(c => regex.test(c.name));
            setCards(temp);
        } else {
            setCards(allCards);
        }
        // onSearchFormSubmit();
    }, [searchQuery])

    function onSearchQueryChange(e) {
        setSearchQuery(e.target.value);
    }

    function onTagClick(tag) {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag))
        } else {
            setSelectedTags(prev => [...prev, tag])
        }
    }

    useEffect(() => {
        if (selectedTags.length) {
            let temp = allCards.filter(c => matchAtleastOne(c.textTags, selectedTags));
            setCards(temp);
        } else {
            setCards(allCards);
        }
    }, [selectedTags])

    const scrollRef = useRef();
    const executeScroll = () => scrollRef.current.scrollIntoView();


    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }
        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    });

    useEffect(() => {
        if (dimensions.width < 768) {
            setListView(false)
        }
    }, [dimensions]);

    const [infoForm, setInfoForm] = useState({ email: "", name: "" });
    const [buildForm, setBuildForm] = useState({ email: "", name: "" });
    function onInfoFormChange({ target }) {
        const { name, value } = target;
        setInfoForm(prev => ({ ...prev, [name]: value }))
    }

    function onBuildFormChange({ target }) {
        const { name, value } = target;
        setBuildForm(prev => ({ ...prev, [name]: value }))
    }

    async function onInfoFormSubmit(e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl + '/info', infoForm);
            alert("Thanks for the help. We'll contact you soon.");
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    async function onBuildFormSubmit(e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl + '/build', buildForm);
            alert("Build request registered. We'll contact you soon.");
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    return (
        <main id="home">
            <section className="cdh hero d-flex flex-column py-3">
                <div className="my-auto container font-mont my-auto">
                    <h1 className="fsxl72 fw-600 text-white">
                        The world's first <br /> Healthcare API library.
                    </h1>
                    <br />
                    <h3 className="fsxl40 fw-600 text-primary-3">
                        For Healthcare Innovators.
                    </h3>
                </div>
                <div className="text-center text-white browse">
                    <Link to='library'>
                        <h4 className="fsxl24 font-mont">
                            Browse our API Library 
                            <span style={{ marginLeft: '2rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </span>
                        </h4>
                    </Link>
                </div>
            </section>

            <section className="what py-4 my-4">
                <div className="container py-4">
                    <h5 className="fsxl-l16 font-lucida text-primary-3">
                        What is APIdirect?
                    </h5>
                    <br />
                    <div className="d-flex justify-content-between">
                        <div className='what-title'>
                            <span className="font-mont fsxl48 fw-600 text-white">
                                Discover what's possible with APIdirect.
                            </span>
                        </div>
                        <div className='what-desc d-flex flex-column py-3'>
                            <span className="fsxl-l16 font-lucida text-white">
                                The library serves as a <span style={{ color: "#F8B225" }}>FREE</span> knowledge base for the digital health
                                tech community to access simplified information on API’s that exist
                                across the health and care ecosystem.
                            </span>

                            <Link to='library' className="start-browsing mt-auto">
                                <span className="font-mont fsxl20 fw-600">Start Browsing</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4 my-4 probably-ads">
                <div className="container d-flex justify-content-between">
                    <div className="ad-cards">

                    </div>
                    <div className="ad-card-right">
                        <p className="font-lucida text-white fsxl-l16">
                            Private and open APIs can be searched or browsed
                            as both traditional APIs and modern no-code Connectors.
                            Each API contains a simplified summary of the data endpoints
                            available. The library can also be used to quickly obtain
                            available FHIR resources.
                            <br />
                            <br />
                            Where a No-Code Connector exists
                            for an API to offer plug and play interoperability and improved
                            automation, this is displayed along with the API’s key information
                            and capability.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-4 container not-got-hold">
                <div className="not-got d-flex align-items-center justify-content-around">
                    <img className='not-got-dots right' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <img className='not-got-dots left' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <img className='not-got-dots bottom' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <div>
                        <h4 className="fsxl40 fw-600 text-white font-mont">
                            Not got an API yet?
                        </h4>
                        <br />
                        <h6 className="fsxl20 fw-600 text-white font-mont">
                            We can build you one! 😊
                        </h6>
                        <p className='fsxl-l16 font-lucida text-primary-3'>
                            Just fill in the contact form and we will <br /> be in touch soon!
                        </p>
                    </div>
                    <div>
                        <form onSubmit={onBuildFormSubmit} className='form-hold'>
                            <input type="text" name="name" placeholder='Forename Surname'
                                value={buildForm.name} onChange={onBuildFormChange}
                                className='input-field fsxl-m14 font-mont py-3 px-3'
                            />
                            <input type="email" name="email" placeholder='Work Email'
                                value={buildForm.email} onChange={onBuildFormChange}
                                className='input-field fsxl-m14 font-mont py-3 px-3'
                            />
                            <input type="submit" value="Submit" className='submit-btn font-mont fsxl-m18 py-2 fw-600' />
                        </form>
                    </div>
                </div>
            </section>

            <section className="container d-flex">
                <Link to='library' className="start-browsing mx-auto">
                    <span className="font-mont fsxl20 fw-600">Take me to APIDirect</span>
                </Link>
            </section>

            {/* <section className="direct" ref={scrollRef}>
                <div className="container-fluid text-center font-mont">
                    <h2 className="fsxl36 fw-600 text-white">APIdirect Library</h2>
                    <br />
                    <p className="fsxl20 text-white">
                        Browse our selection of avaliable APIs or if you would like <br />
                        to have yours listed, request it <Link to="upload" className='text-primary-3 imp' style={{ textDecoration: "none" }}>here.</Link>
                    </p>
                </div>
                <br />
                <div className="container">
                    <div className="search-box d-flex">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_1553_6033" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_1553_6033)">
                                <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 
                                16 6.146 15.371 4.888 14.113C3.62933 12.8543 3 11.3167 3 9.5C3 7.68333 3.62933 6.14567 4.888 
                                4.887C6.146 3.629 7.68333 3 9.5 3C11.3167 3 12.8543 3.629 14.113 4.887C15.371 6.14567 
                                16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 
                                19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5627 11.8127 14 10.75 14 9.5C14 
                                8.25 13.5627 7.18733 12.688 6.312C11.8127 5.43733 10.75 5 9.5 5C8.25 5 7.18733 5.43733 6.312 
                                6.312C5.43733 7.18733 5 8.25 5 9.5C5 10.75 5.43733 11.8127 6.312 12.688C7.18733 13.5627 8.25 14 9.5 14Z"
                                    fill="#059B9A"
                                />
                            </g>
                        </svg>
                        <input type="text" value={searchQuery} onChange={onSearchQueryChange} name="search" placeholder={`Search our ${allCards.length} APIs`} />
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-flex tag-box">
                            {
                                tags.map((t, i) => <div key={i} className={`search-tag ${selectedTags.includes(t.tag) ? 'active' : ''}`}
                                    onClick={() => onTagClick(t.tag)}>
                                    {t.icon} <span>{t.title}</span>
                                </div>)
                            }
                        </div>
                        <button className='view-switch' onClick={() => setListView(prev => !prev)}>
                            {listView ? <GridIcon /> : <ListIcon />}
                            <span>
                                {listView ? "Grid View" : "List View"}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <section className={`cards container ${listView ? 'tile' : 'grid'}`}>
                {
                    cards.length ? <></> : <p className='font-lucida text-white fsxl24'>No cards found ...</p>
                }
                {
                    cards.map((c, i) => <Card key={i} data={c} listView={listView} />)
                }
            </section> */}

            {/* <section className="container mt-3 mb-4 pb-2">
                <a href="https://sehta.co.uk/" target='_blank' rel='noreferrer'>
                    <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/sehtafooter.png" alt="shetha ad" width='100%' />
                </a>
            </section> */}
            <div className="my-4"></div>
        </main>
    )
}

