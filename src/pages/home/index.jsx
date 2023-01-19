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


function matchAtleastOne (arr1 = [], arr2 = []) {
    for (let index = 0; index < arr1.length; index++) {
        if (arr2.includes(arr1[index])){
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

    async function onSearchFormSubmit (e) {
        e?.preventDefault();
        try {
            const { data } = await axios.get(baseUrl + `/api-cards?q=${searchQuery}&tags=${selectedTags.join(",")}`);
            setAllCards(data.data);
            setCards(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {onSearchFormSubmit()}, []);

    useEffect(() => {
        if(searchQuery) {
            let regex = new RegExp(searchQuery, 'i');
            let temp = allCards.filter(c => regex.test(c.name));
            setCards(temp);
        } else {
            setCards(allCards);
        }
        // onSearchFormSubmit();
    }, [searchQuery])

    function onSearchQueryChange (e) {
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
        if(selectedTags.length) {
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
    function onInfoFormChange ({target}) {
        const { name, value } = target;
        setInfoForm(prev => ({...prev, [name]: value}))
    }

    function onBuildFormChange ({target}) {
        const { name, value } = target;
        setBuildForm(prev => ({...prev, [name]: value}))
    }

    async function onInfoFormSubmit (e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl+'/info', infoForm);
            alert("Thanks for the help. We'll contact you soon.");
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    async function onBuildFormSubmit (e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl+'/build', buildForm);
            alert("Build request registered. We'll contact you soon.");
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    return (
        <main id="home">
            <section className="cdh hero py-3">
                <div className="container-fluid px-0 d-flex">
                    <div className="d-flex py-4 my-auto w-100">
                        <div className="l-bg d-flex">
                            <div className="my-auto">
                                <h1 className="fsxl96 fw-600 text-white">
                                    Welcome to <br /> APIdirect
                                </h1>
                                <br />
                                <h3 className="fsxl32 fw-600 text-primary-3">
                                    The world's first Healthcare API library.
                                </h3>
                            </div>
                        </div>
                        <div className="r-bg d-flex">
                            <div className="my-auto">
                                <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/ReactApiImg/hero-bot.png" alt="bg-imge" width="90%" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-white browse">
                    <h4 className="fsxl24" style={{ cursor: "pointer" }} onClick={executeScroll}>Browse our API Library <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                    </svg> </h4>
                </div>
            </section>

            <section className="cdh center what">
                <div className="container">
                    <div className="text-center font-mont text-white">
                        <h3 className="fsxl32 fw-600">What is APIdirect ?</h3>
                    </div>
                    <div className="content-form d-flex justify-content-around flex-wrap">
                        <div className="content">
                            <h5 className="fsxl24 font-mont">
                                The library serves as a <span style={{ color: "#F8B225" }}>FREE</span> knowledge base for the
                                digital health tech community to access simplified
                                information on API’s that exist across the health
                                and care ecosystem.
                            </h5>
                            <br />
                            <div className="d-flex bot-n-content">
                                <div className="plug-bot-img-hold">
                                    <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/ReactApiImg/plug-bot.png" alt="alphabot plug" />
                                </div>
                                <div className="font-lucida plug-content text-white">
                                    <p className="fsxl-l16">
                                        Private and open APIs can be searched or browsed as both traditional
                                        APIs and modern no-code Connectors. Each API contains a simplified
                                        summary of the data endpoints available. The library can also be used
                                        to quickly obtain available FHIR resources.
                                    </p>
                                    <p className="fsxl-l16">
                                        Where a No-Code Connector exists for an API to offer plug
                                        and play interoperability and improved automation, this is
                                        displayed along with the API’s key information and capability.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-hold">
                            <div className="know-form font-mont">
                                <div>
                                    <h5 className="fsxl20 text-white  fw-600">Like what you see ?</h5>
                                    <p className="fsxl-m14 text-white my-4">
                                        Do you see an API that you think will
                                        be beneficial to your organisation?
                                        Fill out the form below and we will
                                        be in touch soon!
                                    </p>
                                </div>
                                <form onSubmit={onInfoFormSubmit}>
                                    <input type="text" name="name" value={infoForm.name} onChange={onInfoFormChange} placeholder="Firstname Surname" />
                                    <input type="email" name="email" value={infoForm.email} onChange={onInfoFormChange} placeholder="Work Email" />
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="not-got">
                <div className="container-fluid d-flex gap-2">
                    <div className="l-hold">
                        <div className="d-flex justify-content-around align-items-center">
                            <div className="text-side">
                                <h3 className="fsxl32 font-mont text-white fw-600">
                                    Not got an API yet? The team over at Alphalake Ai can build you one! 😊
                                </h3>
                                
                                <div className="fsxl-l16 font-lucida text-white pt-2">
                                    Just fill in the contact form and we will be in touch soon!
                                </div>

                                <img className='not-got-dots' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                            </div>
                            <div className="know-form font-mont">
                                <form onSubmit={onBuildFormSubmit}>
                                    <input type="text" name="name" value={buildForm.name} onChange={onBuildFormChange} placeholder="Firstname Surname" />
                                    <input type="email" name="email" value={buildForm.email} onChange={onBuildFormChange} placeholder="Work Email" />
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="adv-space">
                        <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/pro_seagrass.png" alt="ad" width='100%' />
                    </div>
                </div>
            </section>

            <section className="direct" ref={scrollRef}>
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
            </section>

            <section className="container mt-3 mb-4 pb-2">
                <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/sehtafooter.png" alt="shetha ad" width='100%' />
            </section>
            <div className="my-4"></div>
        </main>
    )
}

