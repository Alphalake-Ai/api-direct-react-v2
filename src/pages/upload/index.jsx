import React, { useEffect, useRef, useState } from 'react';
import "../styles/global-n.css";
import "./style.css";
import { resources } from "./config.js";
import { baseUrl } from "../../config/constants.js";
import axios from 'axios';
import { Link } from 'react-router-dom';

let emptyResListMap = {};
function initResouceMap() {
  Object.keys(resources).forEach((r, i) => {
    emptyResListMap[r] = [];
  })
}
initResouceMap();

export default function Main() {

  const [data, setData] = useState({
    name: "", publisher: "", firstRelease: "", latestRelease: "",
    callsCount: "", documentation: "", currentVersion: "",
    type: "", tools: "", dataFormats: "",
    fhirCompliant: "", nonFhirEndpoints: "", sandbox: "",
    databaseType: "", otherConnection: "", openApi: "",
    openPricing: true, 
    contactName: "", email: ""
  });

  const [fhirResTitle, setFhirResTitle] = useState([]);

  const helpRef = useRef();

  function handleFhirResTitleChange({ target }) {
    const { name } = target;
    if (fhirResTitle.includes(name)) {
      setFhirResTitle(prev => prev.filter(p => p !== name));
    } else {
      setFhirResTitle(prev => [...prev, name]);
    }
  }

  const [fhirResList, setFhirResList] = useState(emptyResListMap);
  function handleFhirResListChange({ target }) {
    const { name, value } = target;
    if (fhirResList[name].includes(value)) {
      let modified = fhirResList[name].filter(e => e !== value);
      setFhirResList(prev => ({ ...prev, [name]: modified }));
    } else {
      let modified = [...fhirResList[name], value];
      setFhirResList(prev => ({ ...prev, [name]: modified }));
    }
  }

  const navBasic = useRef();
  const navEndpoint = useRef();
  const navAccess = useRef();

  function handleBasicFormSubmit(e) {
    e.preventDefault();
    handleNext('BASIC');
  }

  function handleResourceFormSubmit (e) {
    e.preventDefault();
    handleNext('ENDPOINT');
  }

  async function handleAccessFormSubmit (e) {
    e.preventDefault();
    try {
      let r = fhirResTitle.map((t, i) => ({ title: t, items: fhirResList[t] }))
      await axios.post(baseUrl + '/api-cards', {...data, resources: r});
      alert("Success");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  function handleInputChanges({ target }) {
    setData(prev => ({ ...prev, [target.name]: target.value }));
  }

  function handleCheckboxChange({ target }) {
    const { name, value } = target;
    if (data[name].includes(value)) {
      let modified = data[name].filter(e => e !== value);
      setData(prev => ({ ...prev, [name]: modified }));
    } else {
      let modified = [...data[name], value];
      setData(prev => ({ ...prev, [name]: modified }));
    }
  }

  const topRef = useRef();
  useEffect(() => {
    topRef.current.scrollIntoView()
  }, [])


  function handleSelectChange({ target }) {
    if (/true|false/.test(target.value)) {
      setData(prev => ({ ...prev, [target.name]: /true/.test(target.value) }));
    } else {
      setData(prev => ({ ...prev, [target.name]: target.value }));
    }
  }

  function handleBack(current) {
    switch (current) {
      case 'ENDPOINT': navBasic.current.click(); break;
      case 'ACCESS': navEndpoint.current.click(); break;
      default: break;
    }
  }

  function handleNext(current) {
    switch (current) {
      case 'BASIC': navEndpoint.current.click(); break;
      case 'ENDPOINT': navAccess.current.click(); break;
      default: break;
    }
  }

  return (
    <main>
      <section id='upload' ref={topRef}>
        <div className="container d-flex align-items-center justify-content-between">
          <div className='text-content'>
            <h1 className="fsxl48 font-mont fw-600 text-cc">
              Upload your API
            </h1>
            <h5 className="fsxl24 fw-600 font-mont text-primary-2 py-2">
              Showcase your API and its capabilities.
            </h5>
            <div className="font-lucida fsxl-l18 text-cc fw-400">
              <p>
                Increase awareness of your organisation’s Healthcare API with
                a <span style={{ color: "#F8B225" }}>FREE</span> listing on <span className="text-primary-2">APIdirect</span>,
                the world’s first healthcare API library.
              </p>
              <p>
                Whether increasing awareness of your private API or accessibility to your open API,
                the APIdirect library is the go-to online knowledge base for the healthcare API community.
              </p>
              <p>
                To apply for your free API listing, fill in the details below and our team will
                endeavour to have your listing live within 48 hours following verification of your
                submission. We will email you to let you know your API is live on our library!!
              </p>
            </div>
          </div>
          <div className="img-content">
            <div className='mt-auto w-100 mb-4'>
              <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/ReactApiImg/plug-bot.png" alt="Alphabot Plug" width="100%" />
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="title px-2 not-xl">
            <h5 className="fsxl24 font-mont fw-600 text-cc">
              Registration Form
            </h5>
            <br />
            <p className="font-lucida fsxl-l18 text-cc">
              Please fill in all fields.
            </p>
          </div>
          <div className="form-wrap">
            <div id='form-tabs'>
              <nav>
                <div className="title">
                  <h5 className="fsxl24 font-mont fw-600 text-cc">
                    Registration Form
                  </h5>
                  <br />
                  <p className="font-lucida fsxl-l18 text-cc">
                    Please fill in all fields.
                  </p>
                </div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link fsxl24 active" id="nav-basic-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-basic" type="button" role="tab" aria-controls="nav-basic"
                    aria-selected="true" ref={navBasic} >
                    Basic Information
                  </button>
                  <button className="nav-link fsxl24" id="nav-resource-tab" data-bs-toggle="tab" data-bs-target="#nav-resource"
                    type="button" role="tab" aria-controls="nav-resource" aria-selected="false" ref={navEndpoint} >
                    Endpoints &amp; Connectors
                  </button>
                  <button className="nav-link fsxl24" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                    type="button" role="tab" aria-controls="nav-contact" aria-selected="false" ref={navAccess} >
                    Accessibility
                  </button>
                  <div className='text-cc xl-only'>
                    <div className="need-help" ref={helpRef}>
                      <div className='d-flex justify-content-between'>
                        <h6 className="fsxl-m16 font-mont fw-600 text-cc">
                          Need help?
                        </h6>
                        <svg onClick={() => {helpRef.current.style.display = 'none'}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <mask id="mask0_1662_8148" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_1662_8148)">
                            <path d="M5.33366 15.8332L4.16699 14.6665L8.83366 9.99984L4.16699 5.33317L5.33366 4.1665L10.0003 8.83317L14.667 4.1665L15.8337 5.33317L11.167 9.99984L15.8337 14.6665L14.667 15.8332L10.0003 11.1665L5.33366 15.8332Z" fill="white" />
                          </g>
                        </svg>

                      </div>
                      <p className="font-lucida fsxl-l14">
                        Don’t have all the information
                        to hand, or just need help?
                      </p>
                      <Link to="/contact-faq" className='contact'>
                        Contact us
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-basic" role="tabpanel" aria-labelledby="nav-basic-tab">
                  <div className='section-title'>
                    <h5 className="fsxl24 fw-600 font-mont text-cc">
                      Basic Information
                    </h5>
                  </div>
                  <form onSubmit={handleBasicFormSubmit} className="d-flex flex-wrap justify-content-between q-grid">

                    <div className="q-hold">
                      <label htmlFor="type">Contact name:</label>
                      <input type="text" name='contactName' placeholder='Contact name'
                        value={data.contactName} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="type">Email</label>
                      <input type="email" name='email' placeholder='Email'
                        value={data.email} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="type">Name of your API?</label>
                      <input type="text" name='name' placeholder='Name'
                        value={data.name} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="publisher">Who is the publisher of this API?</label>
                      <input type="text" name='publisher' placeholder='Publisher name'
                        value={data.publisher} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="release">When was this API first released?</label>
                      <input type="date" name='firstRelease' placeholder='DD/MM/YYYY'
                        value={data.firstRelease} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="latest">When was the last version released?</label>
                      <input type="date" name='latestRelease' placeholder='DD/MM/YYYY'
                        value={data.latestRelease} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="callCount">How many API calls made in the last 12 months?</label>
                      <input type="number" name='callsCount' placeholder='API calls'
                        value={data.callsCount} onChange={handleInputChanges}
                        className="form-control" required
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="doc">Is API Documentation available for your API?</label>
                      <select name="documentation"
                        onChange={handleSelectChange} value={data.documentation}
                        className='form-control form-select' id="doc"
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>

                    <div className="q-hold">
                      <label htmlFor="version">What is the current release version?</label>
                      <input type="text" name='currentVersion' placeholder='Current release version'
                        value={data.currentVersion} onChange={handleInputChanges}
                        className="form-control"
                      />
                    </div>

                    <div className="q-hold">
                      <label htmlFor="type">What is the type of API?</label>
                      <select name="type" value={data.type} onChange={handleSelectChange}
                        className='form-control form-select' id="type"
                      >
                        <option value="">- Select -</option>
                        <option value="SOAP">SOAP</option>
                        <option value="REST">REST</option>
                      </select>
                    </div>

                    <div className="q-hold">
                      <label htmlFor="doc">What other tools have you used to publish this API?</label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='tools'
                            value="SWAGGER" id="SWAGGER_CHECK"
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor="SWAGGER_CHECK">
                            Swagger
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='tools'
                            onChange={handleCheckboxChange}
                            value="UPLOAD-IO" id="UPLOAD-IO_CHECK"
                          />
                          <label className="form-check-label" htmlFor="UPLOAD-IO_CHECK">
                            Upload.io
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='tools'
                            onChange={handleCheckboxChange}
                            value="GITHUB" id="GITHUB_CHECK"
                          />
                          <label className="form-check-label" htmlFor="GITHUB_CHECK">
                            Github
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='tools'
                            onChange={handleCheckboxChange}
                            value="RAPID-API" id="RAPID-API_CHECK"
                          />
                          <label className="form-check-label" htmlFor="RAPID-API_CHECK">
                            RapidAPI
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="q-hold">
                      <label htmlFor="doc">What data formats are used in your API?</label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='dataFormats'
                            onChange={handleCheckboxChange}
                            value="JSON" id="JSON_CHECK"
                          />
                          <label className="form-check-label" htmlFor="JSON_CHECK">
                            JSON
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='dataFormats'
                            onChange={handleCheckboxChange}
                            value="URL-ENCODED" id="URL_CHECK"
                          />
                          <label className="form-check-label" htmlFor="URL_CHECK">
                            URL Encoded
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='dataFormats'
                            onChange={handleCheckboxChange}
                            value="XML" id="XML_CHECK"
                          />
                          <label className="form-check-label" htmlFor="XML_CHECK">
                            XML
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="checkbox" name='dataFormats'
                            onChange={handleCheckboxChange}
                            value="FORM-DATA" id="Form_CHECK"
                          />
                          <label className="form-check-label" htmlFor="Form_CHECK">
                            Form Data
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex w-100 justify-content-end">
                      <button className='form-btn next' type='submit' >Next</button>
                    </div>

                  </form>
                </div>


                <div className="tab-pane fade" id="nav-resource" role="tabpanel" aria-labelledby="nav-resource-tab">
                  <div className='section-title'>
                    <h5 className="fsxl24 fw-600 font-mont text-cc">
                      API Resource/Endpoints
                    </h5>
                  </div>
                  <form onSubmit={handleResourceFormSubmit} className='d-flex flex-column'>
                    <div className="q-hold">
                      <label htmlFor="FHIR">Is the API FHIR compliant?</label>
                      <select name="fhirCompliant" className='form-control form-select' id="FHIR"
                        value={data.fhirCompliant} onChange={handleSelectChange}
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                    {
                      (data.fhirCompliant) ? <>
                        <div className='d-flex flex-wrap'>
                          {
                            Object.keys(resources).map((r, i) => {
                              return (
                                <div className="form-check col-12 col-md-6 col-lg-4" key={i}>
                                  <input className="form-check-input" type="checkbox" name={r}
                                    onChange={handleFhirResTitleChange}
                                    value={r} id={r + "CHECK"}
                                  />
                                  <label className="form-check-label" htmlFor={r + "CHECK"}>
                                    {r}
                                  </label>
                                </div>
                              )
                            })
                          }
                        </div>
                        {
                          fhirResTitle.map((t, i) => {
                            return <div key={i} className='resource-group' style={{ display: i === fhirResTitle.length - 1 ? 'block': 'none' }} >
                              <div className="fsxl-m16 font-mont fw-600">FHIR Resource Group - {t}</div>
                              <div className="d-flex flex-wrap mb-2">
                                {
                                  resources[t].map((r, j) => {
                                    return (
                                      <div className="form-check mx-2" key={j}>
                                        <input className="form-check-input" type="checkbox" name={t}
                                          onChange={handleFhirResListChange}
                                          value={r} id={r + "CHECK"}
                                        />
                                        <label className="form-check-label fsxl-m14" htmlFor={r + "CHECK"}>
                                          {r}
                                        </label>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          })
                        }
                      </> :

                        <div className="q-hold">
                          <label htmlFor="list">
                            Please list any non-FHIR API endpoints available or may even
                            provide a link to documentation or list in the text box provided.
                          </label>
                          <textarea name="nonFhirEndpoints" className='form-control'
                            rows="3" placeholder='Type list here (comma separated)'
                            value={data.nonFhirEndpoints} onChange={handleInputChanges}
                          ></textarea>
                        </div>
                    }

                    <div className="d-flex w-100 justify-content-between">
                      <button className='form-btn back' onClick={() => handleBack('ENDPOINT')} >Back</button>
                      <button className='form-btn next' type='submit'>Next</button>
                    </div>
                  </form>
                </div>


                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div className='section-title'>
                    <h5 className="fsxl24 fw-600 font-mont text-cc">
                      Accessibility
                    </h5>
                  </div>
                  <form onSubmit={handleAccessFormSubmit} className='d-flex flex-column rg-1'>
                    <div className="q-hold">
                      <label htmlFor="sandbox">Is a secured sandbox avaliable?</label>
                      <select name="sandbox" className='form-control form-select' id="sandbox"
                        value={data.sandbox} onChange={handleSelectChange}
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>

                    <div className="q-hold">
                      <label htmlFor="real-time">
                        Is the API connected to a database that is updated in real
                        time or are periodic updates scheduled
                        at your database level?
                      </label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="PERIODIC-SCHEDULED" id="PER_CHECK"
                          />
                          <label className="form-check-label" htmlFor="PER_CHECK">
                            Periodic/Scheduled
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="URL-ENCODED" id="OTH_CHECK"
                          />
                          <label className="form-check-label" htmlFor="OTH_CHECK">
                            Other (please specify)
                          </label>
                        </div>
                        <div className="form-check w-50">
                          <input className="form-check-input" type="radio" name='databaseType'
                            onChange={handleInputChanges}
                            value="XML" id="REAL_CHECK"
                          />
                          <label className="form-check-label" htmlFor="REAL_CHECK">
                            Real time
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="q-hold">
                      <label htmlFor="other">Please specify other:</label>
                      <textarea name="databaseType" className='form-control' rows="3"
                        value={data.databaseType} onChange={handleInputChanges}
                        placeholder='Type list here'
                      ></textarea>
                    </div>
                    <div className="q-hold">
                      <label htmlFor="sandbox">Is your API OPEN in public domain or works on a partnership basis?</label>
                      <select name="openApi" className='form-control form-select'
                        value={data.openApi} onChange={handleSelectChange}
                        id="sandbox"
                      >
                        <option value="">- Select -</option>
                        <option value={true}>Open</option>
                        <option value={false}>Partner</option>
                      </select>
                    </div>
                    {
                      data.openApi === false ? 
                        <div className="q-hold">
                          <label htmlFor="sandbox">Is pricing open to public or only to partners?</label>
                          <select name="openPricing" className='form-control form-select' id="sandbox"
                            value={data.openPricing} onChange={handleSelectChange}
                          >
                            <option value="">- Select -</option>
                            <option value={true}>Open</option>
                            <option value={false}>Partner</option>
                          </select>
                        </div> 
                        : <></> 
                    }
                    <div className="d-flex w-100 justify-content-between">
                      <button className='form-btn back' onClick={() => handleBack('ACCESS')} >Back</button>
                      <button className='form-btn next' type='submit'>Submit</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
