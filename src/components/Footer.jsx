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
                    {/* <div className="d-flex gap-3 social-media">
                        <a href="#" target="_blank">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6915 2.61523C13.1053 2.61523 10.5771 3.38214 8.42672 4.81898C6.27634 6.25582 4.60032 8.29805 3.61061 10.6874C2.6209 13.0768 2.36195 15.706 2.8665 18.2426C3.37105 20.7791 4.61644 23.1091 6.44519 24.9378C8.27394 26.7666 10.6039 28.012 13.1405 28.5165C15.677 29.0211 18.3062 28.7621 20.6956 27.7724C23.0849 26.7827 25.1272 25.1067 26.564 22.9563C28.0009 20.8059 28.7678 18.2777 28.7678 15.6915C28.7678 13.9743 28.4295 12.2739 27.7724 10.6874C27.1153 9.10094 26.1521 7.65943 24.9378 6.44518C23.7236 5.23094 22.2821 4.26775 20.6956 3.61061C19.1091 2.95346 17.4087 2.61523 15.6915 2.61523ZM15.6915 26.1525C13.6225 26.1525 11.6 25.539 9.87968 24.3895C8.15937 23.24 6.81856 21.6063 6.02679 19.6948C5.23502 17.7833 5.02786 15.6799 5.4315 13.6507C5.83514 11.6214 6.83145 9.75745 8.29445 8.29445C9.75745 6.83145 11.6214 5.83513 13.6507 5.43149C15.6799 5.02785 17.7833 5.23502 19.6948 6.02678C21.6063 6.81855 23.24 8.15937 24.3895 9.87967C25.539 11.6 26.1525 13.6225 26.1525 15.6915C26.1525 18.4659 25.0504 21.1267 23.0886 23.0886C21.1267 25.0504 18.4659 26.1525 15.6915 26.1525Z" fill="#CCCCCC" />
                                <path d="M16.1359 9.7416C15.8155 9.44633 15.4154 9.25173 14.9853 9.18199C14.5552 9.11224 14.1141 9.17043 13.7168 9.34931C13.3311 9.50533 13.0007 9.77278 12.7678 10.1175C12.5349 10.4622 12.41 10.8686 12.4092 11.2846V20.098C12.41 20.514 12.5349 20.9204 12.7678 21.2651C13.0007 21.6098 13.3311 21.8773 13.7168 22.0333C14.0003 22.1619 14.3078 22.2287 14.6191 22.2294C15.1799 22.2269 15.7201 22.0174 16.1359 21.641L20.9218 17.2343C21.1359 17.0383 21.3068 16.7999 21.4237 16.5342C21.5407 16.2686 21.6011 15.9815 21.6011 15.6913C21.6011 15.4011 21.5407 15.114 21.4237 14.8484C21.3068 14.5827 21.1359 14.3443 20.9218 14.1483L16.1359 9.7416ZM15.0375 19.0911V12.2915L18.7119 15.6913L15.0375 19.0911Z" fill="#CCCCCC" />
                            </svg>
                        </a>

                        <a href="#" target="_blank">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.3819 28.7677H12.1514C11.8046 28.7677 11.472 28.63 11.2268 28.3847C10.9815 28.1395 10.8438 27.8069 10.8438 27.4601V19.3528H8.22852C7.88172 19.3528 7.54912 19.2151 7.30389 18.9698C7.05867 18.7246 6.9209 18.392 6.9209 18.0452V13.3377C6.9209 12.9909 7.05867 12.6583 7.30389 12.4131C7.54912 12.1679 7.88172 12.0301 8.22852 12.0301H10.8438V9.80716C10.9354 7.8148 11.8122 5.93978 13.2825 4.59207C14.7527 3.24436 16.6967 2.5336 18.6895 2.61521H22.6124C22.9592 2.61521 23.2918 2.75298 23.537 2.99821C23.7823 3.24343 23.92 3.57603 23.92 3.92284V8.63029C23.92 8.9771 23.7823 9.3097 23.537 9.55493C23.2918 9.80015 22.9592 9.93792 22.6124 9.93792H18.6895V12.0301H22.6124C22.8143 12.0286 23.0138 12.0738 23.1953 12.1623C23.3768 12.2508 23.5354 12.3801 23.6585 12.5401C23.7803 12.7025 23.8626 12.891 23.899 13.0908C23.9353 13.2905 23.9246 13.4959 23.8677 13.6908L22.5601 18.3983C22.481 18.6811 22.309 18.9291 22.0718 19.1022C21.8346 19.2754 21.546 19.3637 21.2525 19.3528H18.6895V27.4601C18.6895 27.8069 18.5518 28.1395 18.3065 28.3847C18.0613 28.63 17.7287 28.7677 17.3819 28.7677ZM13.459 26.1525H16.0743V18.0452C16.0743 17.6984 16.2121 17.3658 16.4573 17.1206C16.7025 16.8753 17.0351 16.7376 17.3819 16.7376H20.311L20.8863 14.6454H17.3819C17.0351 14.6454 16.7025 14.5076 16.4573 14.2624C16.2121 14.0172 16.0743 13.6846 16.0743 13.3377V9.80716C16.1079 9.13646 16.3981 8.50438 16.885 8.04186C17.3719 7.57934 18.018 7.32183 18.6895 7.32267H21.3048V5.23046H18.6895C17.3908 5.15134 16.1133 5.58749 15.1341 6.44429C14.1549 7.30109 13.553 8.50943 13.459 9.80716V13.3377C13.459 13.6846 13.3213 14.0172 13.076 14.2624C12.8308 14.5076 12.4982 14.6454 12.1514 14.6454H9.53615V16.7376H12.1514C12.4982 16.7376 12.8308 16.8753 13.076 17.1206C13.3213 17.3658 13.459 17.6984 13.459 18.0452V26.1525Z" fill="#CCCCCC" />
                            </svg>
                        </a>

                        <a href="#" target="_blank">
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5764 10.9839C19.5741 10.9805 18.5811 11.1747 17.654 11.5555C16.7269 11.9362 15.884 12.496 15.1735 13.2029C14.463 13.9098 13.8988 14.7498 13.5133 15.6749C13.1278 16.6 12.9285 17.5921 12.9268 18.5943V26.2832C12.9268 26.5953 13.0507 26.8946 13.2715 27.1153C13.4922 27.336 13.7915 27.46 14.1036 27.46H16.8496C17.1618 27.46 17.4611 27.336 17.6818 27.1153C17.9025 26.8946 18.0265 26.5953 18.0265 26.2832V18.5943C18.0262 18.2379 18.1011 17.8854 18.2462 17.5598C18.3913 17.2342 18.6034 16.9428 18.8687 16.7047C19.134 16.4666 19.4464 16.2871 19.7857 16.1778C20.125 16.0685 20.4835 16.032 20.8379 16.0706C21.4734 16.1506 22.0575 16.4611 22.4792 16.9432C22.901 17.4252 23.1313 18.0453 23.1262 18.6859V26.2832C23.1262 26.5953 23.2502 26.8946 23.4709 27.1153C23.6916 27.336 23.991 27.46 24.3031 27.46H27.0491C27.3612 27.46 27.6606 27.336 27.8813 27.1153C28.102 26.8946 28.226 26.5953 28.226 26.2832V18.5943C28.2243 17.5921 28.025 16.6 27.6394 15.6749C27.2539 14.7498 26.6898 13.9098 25.9793 13.2029C25.2688 12.496 24.4258 11.9362 23.4988 11.5555C22.5717 11.1747 21.5786 10.9805 20.5764 10.9839Z" fill="#CCCCCC" />
                                <path d="M9.39642 12.1611H5.86583C5.21586 12.1611 4.68896 12.688 4.68896 13.338V26.2835C4.68896 26.9335 5.21586 27.4604 5.86583 27.4604H9.39642C10.0464 27.4604 10.5733 26.9335 10.5733 26.2835V13.338C10.5733 12.688 10.0464 12.1611 9.39642 12.1611Z" fill="#CCCCCC" />
                                <path d="M7.63112 9.80717C9.25603 9.80717 10.5733 8.48992 10.5733 6.86501C10.5733 5.2401 9.25603 3.92285 7.63112 3.92285C6.00621 3.92285 4.68896 5.2401 4.68896 6.86501C4.68896 8.48992 6.00621 9.80717 7.63112 9.80717Z" fill="#CCCCCC" />
                            </svg>
                        </a>

                        <a href="#" target="_blank">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7152 26.1525C12.6487 26.2172 14.5757 25.8937 16.3821 25.201C18.1885 24.5083 19.8377 23.4605 21.2323 22.1196C22.6268 20.7787 23.7384 19.1718 24.5014 17.3939C25.2644 15.6161 25.6633 13.7033 25.6744 11.7687C26.5605 10.6721 27.2185 9.40948 27.6097 8.055C27.6389 7.94798 27.6365 7.83481 27.6029 7.7291C27.5693 7.6234 27.5058 7.52967 27.4201 7.4592C27.3345 7.38873 27.2303 7.34453 27.12 7.33192C27.0098 7.3193 26.8983 7.33882 26.799 7.38811C26.3354 7.61126 25.8135 7.68334 25.3068 7.5942C24.8 7.50506 24.3341 7.25918 23.9745 6.89121C23.5154 6.38853 22.9602 5.98311 22.3416 5.69895C21.723 5.4148 21.0536 5.25771 20.3732 5.23698C19.6928 5.21625 19.0151 5.33231 18.3804 5.57827C17.7456 5.82424 17.1667 6.19511 16.6779 6.66892C16.0087 7.31705 15.5185 8.1273 15.255 9.02091C14.9915 9.91452 14.9636 10.8611 15.1742 11.7687C10.7936 12.0302 7.78607 9.95106 5.38004 7.10043C5.30776 7.01858 5.21321 6.95954 5.10793 6.93053C5.00265 6.90152 4.8912 6.9038 4.7872 6.93708C4.68319 6.97036 4.59112 7.03321 4.52225 7.11795C4.45337 7.20269 4.41065 7.30565 4.39932 7.41426C3.94096 9.95684 4.2716 12.5788 5.34685 14.928C6.4221 17.2772 8.19045 19.2411 10.4144 20.5559C8.92323 22.2661 6.82916 23.3342 4.56931 23.5373C4.44824 23.5574 4.33648 23.6148 4.24966 23.7015C4.16285 23.7883 4.10533 23.9 4.08516 24.0211C4.06498 24.1421 4.08316 24.2664 4.13715 24.3767C4.19113 24.4869 4.27823 24.5774 4.38624 24.6357C6.35229 25.6182 8.51734 26.1371 10.7152 26.1525Z" fill="#CCCCCC" />
                            </svg>
                        </a>

                        <a href="#" target="_blank">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.4157 18.3067C23.0329 19.6384 22.2742 20.8315 21.2305 21.7429C20.1869 22.6544 18.9025 23.2456 17.5314 23.4456C16.4592 23.6012 15.3666 23.5385 14.3192 23.2613C13.2718 22.9841 12.2912 22.4981 11.4364 21.8325C10.5815 21.1669 9.86989 20.3354 9.34434 19.388C8.81878 18.4406 8.4901 17.3967 8.378 16.3191C8.29117 15.2372 8.42974 14.1491 8.78496 13.1235C9.14018 12.098 9.70431 11.1573 10.4417 10.3609C11.1791 9.56452 12.0737 8.9298 13.0689 8.49686C14.0642 8.06392 15.1384 7.84218 16.2238 7.84565C17.2408 7.84709 18.2482 8.04236 19.1921 8.42101C19.3407 8.48774 19.5089 8.49657 19.6637 8.44577C19.8185 8.39498 19.9487 8.28822 20.029 8.14641L21.9119 4.6812C21.9525 4.60138 21.9768 4.51435 21.9837 4.42509C21.9905 4.33584 21.9796 4.24611 21.9517 4.16107C21.9237 4.07603 21.8792 3.99734 21.8208 3.92952C21.7624 3.8617 21.6912 3.80608 21.6112 3.76586C19.5892 2.85041 17.3675 2.4647 15.1553 2.64505C12.9431 2.82541 10.8132 3.5659 8.96624 4.79678C7.11927 6.02766 5.616 7.70842 4.59802 9.68075C3.58005 11.6531 3.08087 13.8521 3.1475 16.0706C3.27636 19.3657 4.63083 22.494 6.9456 24.8426C9.26036 27.1912 12.3686 28.591 15.6615 28.7677C19.1109 28.9206 22.4808 27.7031 25.0359 25.3807C27.591 23.0584 29.1239 19.8197 29.3 16.3714C29.3 16.1099 29.3 14.6061 29.3 13.7561C29.2967 13.5838 29.2267 13.4194 29.1048 13.2975C28.9829 13.1756 28.8186 13.1057 28.6462 13.1023H16.8776C16.7042 13.1023 16.5379 13.1712 16.4153 13.2938C16.2926 13.4164 16.2238 13.5827 16.2238 13.7561V17.679C16.2238 17.8524 16.2926 18.0187 16.4153 18.1413C16.5379 18.2639 16.7042 18.3328 16.8776 18.3328H23.4157" fill="#CCCCCC" />
                            </svg>
                        </a>
                    </div> */}
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