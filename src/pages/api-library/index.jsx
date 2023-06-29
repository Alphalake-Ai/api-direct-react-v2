import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/global-n.css";
import "./style.css";

import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { CrossIcon, FilterIcon, LoaderIcon, ResetIcon, SearchIcon } from '../../components/Icons';
import {  GridIcon,  ListIcon } from '../../components/TextTags';
import ToggleSwitch from '../../components/ToggleSwitch';
import ApiCard from './api-card';
import { tagFilters } from './tag-filtes';

import useDelayedSearch from '../../hooks/useDelayedSearch';
import useLoadCards from '../../hooks/useLoadCards';


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
    const [cards, setCards] = useState([]);

    const [formats, setFormats] = useState([]);
    const [accessFilters, setAccessFilters] = useState({ partner: false, full: false, sandbox: false });
    const [singleFilters, setSingleFilters] = useState({ free: false, fhir: false, subscription: false });

    const filterToggleRef = useRef();

    function masterReset () {
        setSelectedTags([]);
        setFormats([]);
        setAccessFilters({ partner: false, full: false, sandbox: false });
        setSingleFilters({ free: false, fhir: false, subscription: false });
    }

    const nextLoadRef = useRef();
    const [tiles, totalTiles] = useLoadCards(nextLoadRef);
    useEffect(() => {
        backup = [...backup, ...tiles];
    }, [tiles])
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
        if(singleFilters.subscription) {
            tempHold = tempHold.filter(c => c.subscription);
        }
        setCards(tempHold);

    }, [tiles, selectedTags, formats, accessFilters, singleFilters]);

    // useEffect(() => { console.log(cards.length);} ,[cards])
    useEffect(() => { executeScroll(); filterToggleRef.current.click(); console.log("Initial Effect"); }, []);

    const [searchData, searchLoading] = useDelayedSearch(searchQuery);
    function onSearchQueryChange(e) {
        setSearchQuery(e.target.value);
    }

    function onTagClick({ target }) {
        const tag = target.value;
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

    async function onInfoFormSubmit(e) {
        try {
            e.preventDefault();
            const form = new FormData(e.target);
            const data = Object.fromEntries(form.entries());
            await axios.post(baseUrl + '/info', data);
            alert("Thanks for the help. We'll contact you soon.");
            e.target.reset();
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    function onSelectAll (index) {
        setSelectedTags(prev => [...prev, ...tagFilters[index].tags.map(t => t.og)])
    }

    function onReset(index) {
        let toRemove = tagFilters[index].tags.map(t => t.og);
        setSelectedTags(prev => prev.filter(p => !toRemove.includes(p)));
    }

    return (
        <>
            <section className="cdh center library-hero" ref={scrollRef}>
                <div className="container align-items-center justify-content-between d-flex s-flex-column">
                <img className='not-got-dots' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <div className='text'>
                        <h1 className="fsxl64 font-mont text-cc fw-600">
                            APIdirect Library
                        </h1>
                        <br />
                        <p className='font-mont fsxl20 fw-600'>
                            <span className='text-primary-3'>
                                Browse our selection of available APIs or if you would like
                                to have yours listed, request it 
                            </span>
                            <span className='mx-1'></span>
                            <Link to='/upload' className='text-cc'>
                                here.
                            </Link>
                        </p>
                    </div>
                    <div className="like-form">
                        <div>
                            <h4 className="fsxl20 font-mont text-cc fw-600">Like what you see?</h4>
                            <p className="fsxl-l14 py-2 text-cc font-mont">
                                Do you see an API that you think will be beneficial to your organisation? Fill out the form below and we will be in touch soon!
                            </p>
                        </div>
                        <form className='form-hold' onSubmit={onInfoFormSubmit}>
                            <input type="text" required name="name" className='fsxl-l14 font-mont input-field  px-3' placeholder='Forename Surname'
                                
                            />
                            <input type="email" required name="email" className='fsxl-l14 font-mont input-field  px-3' placeholder='Work Email'
                                
                            />
                            <input type="submit" value="Submit" className='submit-btn font-mont fw-600 ' />
                        </form>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="accordion" id='filter-accordion'>
                    <div className="accordion-item">
                        <div className='d-flex gap-3'>
                            <button ref={filterToggleRef} className="accordion-button collapsed" id='filter-button' type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseFilterMenu" aria-expanded="false" aria-controls="collapseFilterMenu"
                            >
                                <CrossIcon/> <FilterIcon /> 
                                <span className='font-mont text-cc fw-600 fsxl-l16'>Filter</span>
                            </button>
                            <div id='search-box'>
                                { searchLoading? <LoaderIcon/> : <SearchIcon/> }
                                <input type="text" value={searchQuery} onChange={onSearchQueryChange} 
                                    name="search" placeholder={`Search ${totalTiles} APIs`} 
                                />
                                <div id='search-list'>
                                    {
                                        searchData.map((d, i) => <div className='n-it' key={d._id}>
                                            <Link to={createSlug(d.name, d._id)} >
                                                <div className='d-flex flex-column'>
                                                <span className='ti'>{d.name}</span>
                                                <span className='pu'>{d.publisher}</span>
                                                </div>
                                            </Link>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <button id='view-switch' onClick={() => setListView(prev => !prev)}>
                                {listView ? <GridIcon /> : <ListIcon />}
                                <span className='font-mont text-cc fw-600 fsxl-l16'>
                                    {listView ? "Grid View" : "List View"}
                                </span>
                            </button>
                        </div>
                        <div  id="collapseFilterMenu" className="accordion-collapse collapse"
                            aria-labelledby="headingOne" data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <div className='pt-4 pb-2 d-flex justify-content-between'>
                                    <span className="fsxl32 fw-600 text-white font-mont">
                                        Filters:
                                    </span>
                                    <button className='t-btn text-white mater-reset' onClick={masterReset}> <ResetIcon/> Reset all</button>
                                </div>
                                <div className='justify-content-between d-flex flex-wrap py-3 px-0'>
                                    <div className='col-lg-6 col-sm-12 col-12'>
                                        <h4 className="fw-600 font-mont text-primary-1 fsxl-m16">Filter by tag: </h4>
                                        {
                                            tagFilters.map((tf, i) => <div key={i}>
                                                <div className="d-flex pb-3 align-items-center justify-content-between">
                                                    <h5 className="fsxl-m14 mb-0 text-primary-3">{tf.title}:</h5>
                                                    <div>
                                                        <button onClick={() => onSelectAll(i)} className='filter-tag-btn'>Select All</button>
                                                        <button onClick={() => onReset(i)} className='filter-tag-btn'>Reset</button>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap gap-10px pb-3">
                                                    {
                                                        tf.tags.map((tag, idx) => <span key={idx} className="filter-tag-sp">
                                                            <input onChange={onTagClick} checked={selectedTags.includes(tag.og)}
                                                                className="filter-tag-ip" id={tag.show} type="checkbox" name={tag.og} 
                                                                value={tag.og}
                                                            />
                                                            <label className='filter-tag-ch' htmlFor={tag.show} >
                                                                {tag.show}
                                                            </label>
                                                        </span>
                                                        )
                                                    }
                                                </div>
                                            </div>)
                                        }
                                    </div>
                                    <div className="filter-hold col-lg-6 col-xl-5 col-sm-12 col-12">
                                        <div id='region-filter' className='pt-3'>
                                            <h4 className="fw-600 font-mont text-primary-2 fsxl-m16">Format: </h4>
                                            <FormatSelector setSelected={setFormats} selected={formats} />
                                        </div>
                                        <div id='access-filter' className='pt-3'>
                                            <h4 className="fw-600 font-mont text-primary-2 fsxl-m16">Integration Access: </h4>
                                            <AccessSelector setSelected={setAccessFilters} selected={accessFilters} />
                                        </div>
                                        <div id='fhir-filter' className='pt-3'>
                                            <h4 className="fw-600 font-mont text-primary-2 fsxl-m16">FHIR: </h4>
                                            <div className="d-flex gap-3">
                                                <ToggleSwitch logo='https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/FHIR_LOGO_1702.png'
                                                    name="fhir" onChange={onSingleFilterChange} checked={singleFilters.fhir}
                                                />
                                            </div>
                                        </div>
                                        <div id='price-filter' className='pt-3'>
                                            <h4 className="fw-600 font-mont text-primary-2 fsxl-m16">Data: </h4>
                                            <div className="d-flex gap-3">
                                                <ToggleSwitch label='Free' checked={singleFilters.free}
                                                    name="free" onChange={onSingleFilterChange}
                                                />
                                                <ToggleSwitch label='Subscription apply' checked={singleFilters.subscription}
                                                    name="subscription" onChange={onSingleFilterChange}
                                                />
                                            </div>
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
                    cards.length ? <></> : <p className='font-lucida text-cc fsxl24'>No cards found ...</p>
                }
                {
                    cards.map((c, i) => <ApiCard key={i} data={c} listView={listView} />)
                }
            </section>
            <div ref={nextLoadRef} className='py-2'></div>
            <section className="pt-4 pb-3 container">
                <a href="http://sehta.co.uk" target="_blank" rel="noopener noreferrer">
                    <img width='100%' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/sehtafooter.png" alt="sehta-ad" />
                </a>
            </section>
        </>
    )
}

function createSlug(title, id) {
    return title.trim().toLowerCase().replace(/\s+/g, '-')+'@'+id;
}


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
            <ToggleSwitch label="Public" name="full" onChange={handleSelectChange} checked={selected.full} />
            {/* <ToggleSwitch label="Secure Sandbox" name="sandbox" onChange={handleSelectChange} checked={selected.sandbox} /> */}
        </div>
    )
}