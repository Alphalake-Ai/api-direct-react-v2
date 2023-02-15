import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../../config/constants';
import { Link, useParams } from 'react-router-dom';
import TextTagRenderer from '../../components/TextTags';
import ToolImgRenderer from '../../components/ToolImgTags';
import "../styles/global-n.css";
import "./style.css";

const fakeDatabase = {
    'cerner-r4': {
        "triggers": [],
        "logoUrl": "https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/cerner-1.png",
        "actions": [],
        "_id": "63b58cb8906ff2f4cfc251f1",
        "verified": false,
        "type": "SOAP",
        "documentation": false,
        "dataFormat": [],
        "sandbox": false,
        "name": "email",
        "publisher": "email",
        "firstRelease": "2023-01-05T00:00:00.000Z",
        "latestRelease": "2023-01-06T00:00:00.000Z",
        "currentVersion": "1.2",
        "callsCount": 12,
        "tools": ["UPLOAD-IO", "SWAGGER"],
        "dataFormats": ["JSON", "URL-ENCODED"],
        "resources": [
            {
                "title": "Documents",
                "items": ["Document Manifest", "Document Reference"]
            },
            {
                "title": "Conformance",
                "items": ["Structure Defination", "Operation Defination", "Structure Map"]
            }
        ],
        "fhirCompliant": true,
        "nonFhirEndpoints": [""],
        "databaseType": "PERIODIC-SCHEDULED",
        "openApi": false,
        "openPricing": true,
        "textTags": ["EHR", "Clinicians"],
        "imageTags": [],
        "description": ["Strata Connect integrates with clinical systems across health, social care, mental health and third-party organisations"],
        "createdAt": "2023-01-04T14:27:04.250Z",
        "updatedAt": "2023-01-04T14:27:04.250Z",
        "__v": 0
    }
}

async function getApiDetails(id) {
    try {
        const { data } = await axios.get(baseUrl + "/api-card/" + id);
        return { error: false, data };
    } catch (error) {
        return { error }
    }
}

export default function Main() {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(fakeDatabase['cerner-r4']);
    const [nameSlug, id] = params.api.split("@");

    const scrollRef = useRef();
    const executeScroll = () => scrollRef.current.scrollIntoView();

    useEffect(() => {
        if (!params.api) return;
        getApiDetails(id).then(res => {
            if (res.error) alert('Error While Fetching API Data.');
            else {
                // console.log(res.data);
                setApiData(res.data);
            };
            setLoading(false);
        });
        executeScroll();
    }, [params.api]);

    const [enquireForm, setEnquireForm] = useState({ email: "", name: "" });
    function onEnquireFormChange({ target }) {
        const { name, value } = target;
        setEnquireForm(prev => ({ ...prev, [name]: value }))
    }

    async function onEnquireFormSubmit(e) {
        try {
            e.preventDefault();
            await axios.post(baseUrl + '/enquire', { ...enquireForm, apiId: id });
            alert("Enquiry request registered. We'll contact you soon.");
        } catch (error) {
            console.log(error);
            alert("Oops! An error occured. Please try again after sometime.");
        }
    }

    return (
        <main>
            <section id="api-detail" ref={scrollRef}>
                <div className="detail-hero container text-white container-fluid">
                    <div className="font-lucida fsxl-l16">
                        <Link to='/library'>
                            APIdirect Library 
                        </Link> &gt; {apiData.name}
                    </div>
                    <div className="grid-center pt-4">
                        <div className="api-logo">
                            <img src={apiData.logoUrl}
                                alt="api logo" width='100%' />
                        </div>
                        <div className="api-title">
                            <h1 className="font-mont capitalize">{apiData.name}</h1>
                        </div>
                        <div className="text-tags filled pt-2">
                            {
                                apiData.textTags.map((t, i) => <TextTagRenderer key={i} tag={t.toUpperCase()} />)
                            }
                        </div>
                    </div>
                    <div className="overview-n-form">
                        <div className="overview">
                            <h6 className="fsxl20 text-white font-mont fw-600">
                                Overview
                            </h6>
                            <br />
                            <p className="font-lucida text-white fsxl-l16 fw-400">
                                {
                                    apiData.description instanceof Array ?
                                        apiData.description.map((d, i) => <p key={i}>{d}</p>)
                                        : apiData.description
                                }
                            </p>
                            <br />
                            <div className="publish font-mont">
                                <div className="fsxl-l16">Publisher: <span className="value">{apiData.publisher}</span></div>
                                <div className="fsxl-l16">Published on: <span className="value">{apiData.firstRelease}</span></div>
                                <div className="fsxl-l16">Release Version: <span className="value">{apiData.currentVersion}</span></div>
                            </div>
                        </div>
                        <div className='like-form'>
                            <div className="font-mont">
                                <div className="pb-4">
                                    <h5 className="fsxl20 text-white  fw-600">Enquire about this API</h5>
                                </div>
                                <form className='form-hold' onSubmit={onEnquireFormSubmit}>
                                    <input type="text" name="name" className='fsxl-l14 font-mont input-field py-2 px-3' value={enquireForm.name} onChange={onEnquireFormChange} placeholder="Firstname Surname" />
                                    <input type="email" name="email" className='fsxl-l14 font-mont input-field py-2 px-3' value={enquireForm.email} onChange={onEnquireFormChange} placeholder="Work Email" />
                                    <input type="submit" value="Submit" className='submit-btn font-mont fw-600 py-1' />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between res-n-form">
                        <div className="dev-res d-flex">
                            <div className="w-50">
                                <h6 className="fsxl20 text-white font-mont fw-600 pb-2">
                                    Developer Resources
                                </h6>
                                <a href={apiData.documentationLink || "#"} className="fsxl-m16 fw-600 o-08 text-white font-mont">
                                    <span>Documentation</span>
                                    <span className="px-2"></span>
                                    <img src="/images/open_in_new.svg" alt="open in new" width='20px' />
                                </a>
                                <div className="w-100 d-flex pt-3">
                                    <div className="w-50">
                                        <h6 className="fsxl-m16 fw-600 o-08 text-white font-mont">
                                            Doc Tooling:
                                        </h6>
                                        <ToolImgRenderer tag={apiData.docTooling} />
                                    </div>
                                    <div className="w-50">
                                        <h6 className="fsxl-m16 fw-600 o-08 text-white font-mont">
                                            Wrapper:
                                        </h6>
                                        <ToolImgRenderer tag={apiData.wrapper} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-50">
                                <h6 className="fsxl20 text-white font-mont fw-600 pb-2">
                                    Accessibility
                                </h6>
                                <div className="fsxl-m16 fw-600 font-mont" style={{ color: "var(--primary-3)" }}>
                                    {apiData.openApi ? "" : "Partner-Only"}
                                </div>
                                <div className="font-mont pt-1">
                                    <p className="fsxl-m16">
                                        Pricing options in public domain,
                                        <br />
                                        <a href="#" className="fw-600">become a partner here.</a>
                                    </p>
                                </div>
                                <div className="font-mont o-08 fw-600 text-white pt-1 fsxl-m16">
                                    {
                                        apiData.documentation ? <>
                                            Documentation <span className="px-1"></span> <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px"
                                                viewBox="0 0 16 16" version="1.1">
                                                <rect width="16" height="16" id="icon-bound" fill="none" />
                                                <path
                                                    d="M0,9.014L1.414,7.6L5.004,11.189L14.593,1.6L16.007,3.014L5.003,14.017L0,9.014Z"
                                                    fill="#ffffff88" />
                                            </svg></> : <></>
                                    }
                                    <br />
                                    {
                                        apiData.sandbox ? <>
                                            Open Sandbox <span className="px-1"></span> <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px"
                                                viewBox="0 0 16 16" version="1.1">
                                                <rect width="16" height="16" id="icon-bound" fill="none" />
                                                <path
                                                    d="M0,9.014L1.414,7.6L5.004,11.189L14.593,1.6L16.007,3.014L5.003,14.017L0,9.014Z"
                                                    fill="#ffffff88" />
                                            </svg></> : <></>
                                    }
                                </div>
                                <div className="pt-3 font-mont fsxl12">
                                    {
                                        apiData.openApi ? "Documentation is open to all." :
                                            <i>*Documentation and sandbox only avaliable to <br /> partners</i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='like-form'>
                            <div className="font-mont">
                                <div className="pb-4">
                                    <h5 className="fsxl20 text-white  fw-600">Enquire about this API</h5>
                                </div>
                                <form className='form-hold' onSubmit={onEnquireFormSubmit}>
                                    <input type="text" name="name" className='fsxl-l14 font-mont input-field py-2 px-3' value={enquireForm.name} onChange={onEnquireFormChange} placeholder="Firstname Surname" />
                                    <input type="email" name="email" className='fsxl-l14 font-mont input-field py-2 px-3' value={enquireForm.email} onChange={onEnquireFormChange} placeholder="Work Email" />
                                    <input type="submit" value="Submit" className='submit-btn font-mont fw-600 py-1' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <br />

            <section id="resource-tab" className="pt-2 container">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link fsxl24 active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false"
                        >
                            {
                                apiData.fhirCompliant ?
                                    <span>
                                        <img src="https://www.alphalake.ai/hubfs/api-connect-images/FHIR.png" alt="FHIR" width='40px' /> <span className="fw-600" style={{ color: "#FF4A00" }} >FHIR Resources</span>
                                    </span> :
                                    <span className='fw-600'>Endpoints</span>
                            }
                        </button>
                        <button className="nav-link fsxl24" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            <img src="https://fs.hubspotusercontent00.net/hubfs/6637851/api-connect-images/Workato.png" width='50px' alt="" />
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {/* <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {
                            apiData.fhirCompliant ? "No Endpoints Available" :
                                <div className="d-flex gap-2 flex-wrap">
                                    {
                                        apiData.nonFhirEndpoints instanceof Array ?
                                            apiData.nonFhirEndpoints.map((e, i) => (
                                                <div key={i} className="endpoint-tag">{e}</div>
                                            )) :
                                            apiData.nonFhirEndpoints.split(",").map((e, i) => (
                                                <div key={i} className="endpoint-tag">{e}</div>
                                            ))
                                    }
                                </div>
                        }
                    </div> */}
                    <div className="tab-pane show active fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {
                            apiData.fhirCompliant ?
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        // resources.map((pr, id) => (
                                        //     <div className="rs-card-wrap" key={id}>
                                        //         {
                                        //             pr.map((r, i) => (
                                        //                 <div className="rs-card" key={i}>
                                        //                     <div className="header">
                                        //                         {r.title}
                                        //                     </div>
                                        //                     <ul>
                                        //                         {
                                        //                             r.items.map((it, idx) => <ul key={idx}>{it}</ul>)
                                        //                         }
                                        //                     </ul>
                                        //                 </div>
                                        //             ))
                                        //         }
                                        //     </div>
                                        // ))
                                        apiData.resources.map((r, i) => (
                                            <div className="rs-card" key={i}>
                                                <div className="header">
                                                    {r.title}
                                                </div>
                                                <ul>
                                                    {
                                                        r.items.map((it, idx) => <ul key={idx}>{it}</ul>)
                                                    }
                                                </ul>
                                            </div>
                                        ))
                                    }
                                </div> : 
                                <div className="d-flex gap-2 flex-wrap">
                                    {
                                        apiData.nonFhirEndpoints instanceof Array ?
                                            apiData.nonFhirEndpoints.map((e, i) => (
                                                <div key={i} className="endpoint-tag">{e}</div>
                                            )) :
                                            apiData.nonFhirEndpoints.split(",").map((e, i) => (
                                                <div key={i} className="endpoint-tag">{e}</div>
                                            ))
                                    } 
                                    {
                                        
                                        !apiData.nonFhirEndpoints.length? <span className='font-mont text-white'>No endpoints available.</span> : ""
                                    }
                                </div>
                        }

                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div>
                            <h5 className="fsxl32 font-mont fw-600 text-white">Triggers ({apiData.triggers.length})</h5>
                            <p className='font-lucida'>
                                Use these in your "recipe" to make an event happen elsewhere,
                                whether in Alphabot for Teams or any other connected system (Actions).
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                                {
                                    apiData.triggers.map((t, i) => (
                                        <div key={i} className="endpoint-tag">{t}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <br />
                        <div>
                            <h5 className="fsxl32 font-mont fw-600 text-white">Actions ({apiData.actions.length})</h5>
                            <p className='font-lucida'>
                                Insert these as a step in your "recipe" and they will happen
                                automatically following a Trigger from elsewhere in Cerner or
                                any other System...
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                                {
                                    apiData.actions.map((t, i) => (
                                        <div key={i} className="endpoint-tag">{t}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

function splitArray(array) {
    const chunkSize = 2;
    let sub = []
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        sub.push(chunk);
    }
    return sub;
}