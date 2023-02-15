import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/global-n.css";
import "./style.css";

import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { FilterIcon, SearchIcon } from '../../components/Icons';
import {  GridIcon,  ListIcon } from '../../components/TextTags';
import { EhrIcon, HospitalIcon, CliniciansIcon } from '../../components/TextTags';
// import { Australia, Europe, India, Italy, UK, USA } from '../../components/Flags';
import ToggleSwitch from '../../components/ToggleSwitch';
import ApiCard from './api-card';

const tags = [
    { title: "EHR", tag: "EHR", icon: <EhrIcon /> },
    { title: "Hospital", tag: "Hospital", icon: <HospitalIcon /> },
    { title: "Clinicians", tag: "Clinician", icon: <CliniciansIcon /> },
]

function matchAtleastOne(arr1 = [], arr2 = []) {
    for (let index = 0; index < arr1.length; index++) {
        if (arr2.includes(arr1[index])) {
            return true;
        }
    }
    return false;
}

let backup = [];

export default function Main() {

    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [listView, setListView] = useState(false);
    const [allCards, setAllCards] = useState([]);
    const [cards, setCards] = useState([]);

    const [formats, setFormats] = useState([]);
    const [accessFilters, setAccessFilters] = useState({ partner: false, full: false, sandbox: false });
    const [singleFilters, setSingleFilters] = useState({ free: false, fhir: false });

    async function onSearchFormSubmit(e) {
        e?.preventDefault();
        try {
            const { data } = await axios.get(baseUrl + `/api-cards?q=${searchQuery}&tags=${selectedTags.join(",")}`);
            setAllCards(data.data);
            backup = data.data;
            setCards(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    function resetFilters () {
        setSingleFilters({ free: false, fhir: false });
        setAccessFilters({ partner: false, full: false, sandbox: false });
        setFormats([]);
        setSelectedTags([]);
    }

    useEffect(() => { onSearchFormSubmit(); executeScroll(); }, []);

    useEffect(() => {
        if (searchQuery) {
            let regex = new RegExp(searchQuery, 'i');
            let temp = allCards.filter(c => regex.test(c.name));
            setCards(temp);
            backup = temp;
        } else {
            setCards(allCards);
            backup = allCards;
        }
        // onSearchFormSubmit();
    }, [searchQuery])

    function onSearchQueryChange(e) {
        setSearchQuery(e.target.value);
        resetFilters();
    }

    function onTagClick(tag) {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag))
        } else {
            setSelectedTags(prev => [...prev, tag])
        }
    }

    function onSingleFilterChange ({target}) {
        const { name, checked } = target;
        setSingleFilters(prev => ({...prev, [name]: checked}))
    } 

    useEffect(() => {
        let tempHold = backup;
        if (selectedTags.length) {
            tempHold = tempHold.filter(c => matchAtleastOne(c.textTags, selectedTags));
        }
        if (formats.length) {
            tempHold = tempHold.filter(c => formats.includes(c.type));
        }
        if(accessFilters.full) {
            tempHold = tempHold.filter(c => c.openApi && c.openPricing)
        } else if (accessFilters.partner) {
            tempHold = tempHold.filter(c => !c.openApi)
        }
        if (accessFilters.sandbox) {
            tempHold = tempHold.filter(c => c.sandbox);
        }
        if(singleFilters.fhir) {
            tempHold = tempHold.filter(c => c.fhirCompliant);
        }
        if(singleFilters.free) {
            tempHold = tempHold.filter(c => c.isFree);
        }
        setCards(tempHold);
    }, [selectedTags, formats, accessFilters, singleFilters])

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
    function onInfoFormChange({ target }) {
        const { name, value } = target;
        setInfoForm(prev => ({ ...prev, [name]: value }))
    }

    async function onInfoFormSubmit(e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl + '/info', infoForm);
            alert("Thanks for the help. We'll contact you soon.");
            setInfoForm({ name: "", email: "" });
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    
    return (
        <main>
            <section className="cdh center library-hero" ref={scrollRef}>
                <div className="container align-items-center justify-content-between d-flex">
                <img className='not-got-dots' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <div className='text'>
                        <h1 className="fsxl64 font-mont text-white fw-600">
                            APIdirect Library
                        </h1>
                        <br />
                        <p className='font-mont fsxl20 fw-600'>
                            <span className='text-primary-3'>
                                Browse our selection of available APIs or if you would like <br />
                                to have yours listed, request it 
                            </span>
                            <span className='mx-1'></span>
                            <Link to='upload' className='text-white'>
                                here.
                            </Link>
                        </p>
                    </div>
                    <div className="like-form">
                        <div>
                            <h4 className="fsxl20 font-mont text-white fw-600">Like what you see?</h4>
                            <p className="fsxl-l14 py-2 text-cc font-mont">
                                Do you see an API that you think will be beneficial to your organisation? Fill out the form below and we will be in touch soon!
                            </p>
                        </div>
                        <form className='form-hold' onSubmit={onInfoFormSubmit}>
                            <input type="text" name="name" className='fsxl-l14 font-mont input-field py-2 px-3' placeholder='Forename Surname'
                                value={infoForm.name} onChange={onInfoFormChange} 
                            />
                            <input type="email" name="email" className='fsxl-l14 font-mont input-field py-2 px-3' placeholder='Work Email'
                                value={infoForm.email} onChange={onInfoFormChange}
                            />
                            <input type="submit" value="Submit" className='submit-btn font-mont fw-600 py-1' />
                        </form>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="accordion" id='filter-accordion'>
                    <div className="accordion-item">
                        <div className='d-flex gap-2'>
                            <button className="accordion-button" id='filter-button' type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseFilterMenu" aria-expanded="true" aria-controls="collapseFilterMenu"
                            >
                                <FilterIcon />
                                <span className='font-mont text-white fw-600 fsxl-l16'>Filter</span>
                            </button>
                            <div id='search-box'>
                                <SearchIcon/>
                                <input type="text" value={searchQuery} onChange={onSearchQueryChange} 
                                    name="search" placeholder={`Search our ${allCards.length} APIs`} 
                                />
                            </div>
                            <button id='view-switch' onClick={() => setListView(prev => !prev)}>
                                {listView ? <GridIcon /> : <ListIcon />}
                                <span className='font-mont text-white fw-600 fsxl-l16'>
                                    {listView ? "Grid View" : "List View"}
                                </span>
                            </button>
                        </div>
                        <div id="collapseFilterMenu" className="accordion-collapse collapse show" 
                            aria-labelledby="headingOne" data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body py-3 px-0">
                                <div>
                                    <h4 className="fw-600 font-mont text-white fsxl-m16">Filter by tag: </h4>
                                    <div className="d-flex tag-box">
                                        {
                                            tags.map((t, i) => <div key={i} className={`search-tag ${selectedTags.includes(t.tag) ? 'active' : ''}`}
                                                onClick={() => onTagClick(t.tag)}>
                                                {t.icon} <span>{t.title}</span>
                                            </div>)
                                        }
                                    </div>
                                </div>
                                <div className="filter-hold">
                                    <div id='region-filter'>
                                        <h4 className="fw-600 font-mont text-white fsxl-m16">Format: </h4>
                                        <FormatSelector setSelected={setFormats} selected={formats} />
                                    </div>
                                    <div id='access-filter'>
                                        <h4 className="fw-600 font-mont text-white fsxl-m16">Access: </h4>
                                        <AccessSelector setSelected={setAccessFilters} selected={accessFilters} />
                                    </div>
                                    <div id='fhir-filter'>
                                        <h4 className="fw-600 font-mont text-white fsxl-m16">FHIR: </h4>
                                        <div className="d-flex gap-3">
                                            <ToggleSwitch logo='https://www.alphalake.ai/hubfs/api-connect-images/FHIR.png'
                                                name="fhir" onChange={onSingleFilterChange} checked={singleFilters.fhir}
                                            />
                                        </div>
                                    </div>
                                    <div id='price-filter'>
                                        <h4 className="fw-600 font-mont text-white fsxl-m16">Price: </h4>
                                        <div className="d-flex gap-3">
                                            <ToggleSwitch label='Free' checked={singleFilters.free}
                                                name="free" onChange={onSingleFilterChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`cards ${listView? "list": "grid"} container d-flex flex-wrap pt-3`}>
                {
                    cards.length ? <></> : <p className='font-lucida text-white fsxl24'>No cards found ...</p>
                }
                {
                    cards.map((c, i) => <ApiCard key={i} data={c} listView={listView} />)
                }
            </section>
            <section className="pt-4 pb-3 container">
                <a href="http://sehta.co.uk" target="_blank" rel="noopener noreferrer">
                    <img width='100%' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/sehtafooter.png" alt="sehta-ad" />
                </a>
            </section>
        </main>
    )
}


// function RegionSelector({ setSelected }) {
//     function handleSelectChange ({target}) {
//         const { value, checked } = target;
//         if(checked) {
//             setSelected(prev => [...prev, value]);
//         } else {
//             setSelected(prev => prev.filter(r => r !== value))
//         }
//     }

//     return (    
//         <div className="d-flex tag-box">
//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="UK" onChange={handleSelectChange} />
//                 <UK />
//             </label>

//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="EUROPE" onChange={handleSelectChange} />
//                 <Europe />
//             </label>

//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="USA" onChange={handleSelectChange} />
//                 <USA />
//             </label>

//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="ITALY" onChange={handleSelectChange} />
//                 <Italy />
//             </label>

//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="AUSTRALIA" onChange={handleSelectChange} />
//                 <Australia />
//             </label>

//             <label className="reg-f">
//                 <input type="checkbox" name="rf" value="INDIA" onChange={handleSelectChange} />
//                 <India />
//             </label>
//         </div>
//     )
// }

function FormatSelector({ setSelected, selected = [] }) {

    function handleSelectChange ({target}) {
        const { value, checked } = target;
        if(checked) {
            setSelected(prev => [...prev, value]);
        } else {
            setSelected(prev => prev.filter(r => r !== value))
        }
    }

    return (
        <div className="d-flex gap-3">
            <ToggleSwitch label="REST API"  value="REST" checked={selected.includes("REST")} onChange={handleSelectChange} />
            <ToggleSwitch label="SOAP API" value="SOAP" checked={selected.includes("SOAP")} onChange={handleSelectChange} />
            <ToggleSwitch logo='https://fs.hubspotusercontent00.net/hubfs/6637851/api-connect-images/Workato.png' 
                value="WORKATO" onChange={handleSelectChange} checked={selected.includes("WORKATO")}
            />
        </div>
    )
}

function AccessSelector({setSelected, selected}) {

    function handleSelectChange ({target}) {
        const { name, checked } = target;
        setSelected(prev => ({...prev, [name]: checked}))
    }

    return (
        <div className="d-flex gap-3">
            <ToggleSwitch label="Partner-Only" name="partner" checked={selected.partner} onChange={handleSelectChange} />
            <ToggleSwitch label="Fully Open" name="full" onChange={handleSelectChange} checked={selected.full} />
            <ToggleSwitch label="Secure Sandbox" name="sandbox" onChange={handleSelectChange} checked={selected.sandbox} />
        </div>
    )
}