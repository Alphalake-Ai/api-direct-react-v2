import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config/constants";
import "./styles/footer.css";

const defaultFooterForm = { name: "", email: "", consent: false };

export default function Footer() {

    const [formData, setFormData] = useState(defaultFooterForm);
    function onFooterDataChange ({ target }) {
        const { name, value } = target;
        if(name === "consent") {
            setFormData(prev => ({...prev, consent: !prev.consent}))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    } 

    async function onFooterFormSubmit(e) {
        e.preventDefault();
        try {
          await axios.post(baseUrl + "/subscribe", formData);
          alert("Subscribed");
          setFormData(defaultFooterForm);
        } catch (error) {
          console.log(error);
          alert("Oops! An error occured. Please try again after sometime.");
        }
      }

    return (
        <footer>
            <section className='contact'>
                <div className="container d-flex flex-wrap">
                    <div className="sub-form-hold">
                        <h2 className="fsxl32 font-mont text-cc fw-600">Subscribe !</h2>
                        <br />
                        <p className="fsxl-l20 font-lucida text-cc">
                            Get early-bird guest-list for events and insights from our AI,
                            health tech and automation subject matter experts!
                        </p>
                        <br />
                        <form className='subscription-form' onSubmit={onFooterFormSubmit}>
                            <div className="d-flex flex-wrap align-items-center">
                                <label className="fsxl20 font-lucida text-cc">Name</label>
                                <input type="text" name="name" className='field py-2 font-lucida fsxl20' placeholder="Forename Surname" 
                                    checked={formData.name} onChange={onFooterDataChange}
                                />
                            </div>
                            <div className="d-flex flex-wrap align-items-center">
                                <label className="fsxl20 font-lucida text-cc">Work Email</label>
                                <input type="email" name="email" className='field py-2 font-lucida fsxl20' placeholder="Email" 
                                    checked={formData.email} onChange={onFooterDataChange}
                                />
                            </div>
                            <br />
                            <div className="d-flex" style={{ columnGap: '2rem' }}>
                                <div>
                                    <input type="checkbox" name="consent" checked={formData.consent} onChange={onFooterDataChange} id="marketing-com" />
                                </div>
                                <label className='font-lucida text-cc check-label' htmlFor='marketing-com'>
                                    I'd like to receive marketing communications from Alphalake Ai
                                    regarding industry news, services and events.
                                    <br />
                                    Information on our privacy practices, and our commitment
                                    to respect your privacy can be found in our <a target="_blank" href="https://www.alphalake.ai/privacy-policy" className="text-primary-2"> Privacy Policy.</a>
                                </label>
                            </div>
                            <input type="submit" value="Subscribe" className='font-mont fw-600 fsxl24 py-2 bg-primary-3 text-cc br-5' />
                        </form>
                    </div>
                    <div className='address-hold' >
                        <h2 className="fsxl32 font-mont text-cc fw-600">UK</h2>
                        <br />
                        <address className="font-lucida fsxl-l20 text-cc">
                            The Stanley Building <br />
                            7 Pancras Square <br />
                            London, England, N1C 4AG <br />
                            Tel: +44 20 3289 0014
                        </address>
                    </div>
                </div>
            </section>
            <section className="social">
                <div className="d-flex justify-content-between container">
                    <div style={{ width: "239px" }} id="back-to-home">
                        <Link to='/'>
                            <img
                                src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/api-direct-v2-1/api-direct-logo.png"
                                alt="API Direct Logo"
                            />
                        </Link>
                    </div>
                    <div id="to-release-notes">
                        <Link to="/release-notes" className="font-mont text-cc fw-600 fsxl-l20">APIdirect release notes</Link>
                    </div>
                </div>
                <p className="text-center fsxl-l16 text-cc font-lucida dis-text">
                    APIdirect is an Alphalake Technologies product, the service is built as a free service to  
                    help promote interoperability, increased standardisation, data security, user experience
                    and knowledge in and across healthcare globally. &#169; Alphalake Technologies Ltd
                </p>
            </section>
        </footer>
    )
}