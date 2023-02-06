import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/global-n.css";
import "./style.css";

import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { FilterIcon, SearchIcon } from '../../components/Icons';

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
        <main>
            <section className="cdh center library-hero">
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
                        <form className='form-hold'>
                            <input type="text" name="name" className='fsxl-l14 font-mont input-field py-2 px-3' placeholder='Forename Surname' />
                            <input type="email" name="email" className='fsxl-l14 font-mont input-field py-2 px-3' placeholder='Work Email' />
                            <input type="submit" value="Submit" className='submit-btn font-mont fw-600 py-1' />
                        </form>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="accordion" id='filter-accordion'>
                    <div className="accordion-item">
                        <div className='d-flex gap-2'>
                            <button class="accordion-button" id='filter-button' type="button" data-bs-toggle="collapse" 
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
                        </div>
                        <div id="collapseFilterMenu" class="accordion-collapse collapse show" 
                            aria-labelledby="headingOne" data-bs-parent="#accordionExample"
                        >
                            <div class="accordion-body">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, laboriosam?
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}


