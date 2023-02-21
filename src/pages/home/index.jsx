import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from '../../config/constants';
import "../styles/global-n.css";
import "./style.css";



export default function Main() {

    const scrollRef = useRef();
    const executeScroll = () => scrollRef.current.scrollIntoView();
    useEffect(() => { executeScroll(); }, []);

    const [buildForm, setBuildForm] = useState({ email: "", name: "" });
    
    function onBuildFormChange({ target }) {
        const { name, value } = target;
        setBuildForm(prev => ({ ...prev, [name]: value }))
    }

    async function onBuildFormSubmit(e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl + '/build', buildForm);
            alert("Build request registered. We'll contact you soon.");
            setBuildForm({ email: "", name: "" });
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    return (
        <main id="home" ref={scrollRef}>
            <section className="cdh hero d-flex flex-column py-3">
                <div className="my-auto container font-mont my-auto" id='carousel-hold'>
                    <h1 className="fsxl72 fw-600 text-cc">
                        The world's first <br /> Healthcare API library.
                    </h1>
                    <div className="fsxl40 pt-3 fw-600 text-primary-3 d-flex">
                        <span className="m-fit-content">For Healthcare</span>&nbsp;
                        <div className="scroller">
                            <span>
                                Innovators. <br />
                                Digital Leaders. <br />
                                Automation Experts. <br />
                                System Integrators. <br />
                                Transformers.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-center text-cc browse">
                    <Link to='library'>
                        <h4 className="fsxl20 fw-600 font-mont">
                            Browse our API Library
                            <span style={{ marginLeft: '1.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_2307_4365" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect y="24" width="24" height="24" transform="rotate(-90 0 24)" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_2307_4365)">
                                        <path d="M15.3751 12L9.3751 18L7.9751 16.6L12.5751 12L7.9751 7.4L9.3751 6L15.3751 12Z" fill="#CCCCCC" />
                                    </g>
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
                    <div className="d-flex s-flex-column justify-content-between">
                        <div className='what-title'>
                            <span className="font-mont fw-600 fsxl48 text-cc">
                                Discover what's possible with APIdirect.
                            </span>
                        </div>
                        <div className='what-desc d-flex flex-column py-3'>
                            <span className="fsxl-l16 font-lucida text-cc">
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
                <div className="container d-flex s-flex-column justify-content-between">
                    <div className="ad-cards">
                        <div className="ac back"></div>
                        <div className="ac fore"></div>
                    </div>
                    <div className="ad-card-right my-auto">
                        <p className="font-lucida text-cc fsxl-l16">
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

            <br />
            <section className="py-4 container not-got-hold">
                <div className="not-got s-flex-column d-flex align-items-center justify-content-around">
                    <img className='not-got-dots right' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <img className='not-got-dots left' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <img className='not-got-dots bottom' src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/cir_bg_2.svg" alt="dots" />
                    <div id='ngth'>
                        <h4 className="fsxl40 fw-600 text-cc font-mont">
                            Not got an API yet?
                        </h4>
                        <br />
                        <h6 className="fsxl20 fw-600 text-cc font-mont">
                            We can build you one! 😊
                        </h6>
                        <p className='fsxl-l16 pt-2 font-lucida text-primary-3'>
                            Just fill in the contact form and we will be in touch soon!
                        </p>
                    </div>
                    <div>
                        <form onSubmit={onBuildFormSubmit} id="build-form" className='form-hold'>
                            <input type="text" required name="name" placeholder='Forename Surname'
                                value={buildForm.name} onChange={onBuildFormChange}
                                className='input-field fsxl-m14 font-mont py-3 px-3'
                            />
                            <input type="email" required name="email" placeholder='Work Email'
                                value={buildForm.email} onChange={onBuildFormChange}
                                className='input-field fsxl-m14 font-mont py-3 px-3'
                            />
                            <input type="submit" value="Submit" className='submit-btn font-mont fsxl-m18 py-2 fw-600' />
                        </form>
                    </div>
                </div>
            </section>

            <section className="container d-flex mb-4 pb-4">
                <Link to='library' className="start-browsing mx-auto">
                    <span className="font-mont fsxl20 fw-600">Take me to APIDirect</span>
                </Link>
            </section>
            <br />
            <br />
        </main>
    )
}

