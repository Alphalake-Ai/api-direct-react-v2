import React, { useRef, useEffect } from "react";
import "./style.css";

export default function ReleaseNotes() {

    const scrollRef = useRef();
    const executeScroll = () => scrollRef.current.scrollIntoView();

    useEffect(() => {
        executeScroll();
    }, [])


    return (
        <main id="release-notes" ref={scrollRef}>
            <section className="head">
                <div className="container text-center">
                    <h1 className="fsxl48 font-mont text-cc fw-600">Release Notes</h1>
                </div>
            </section>
            <br />
            <section className="container d-flex pt-4 mt-4" id="release-info">
                <div className="nav nav-tabs flex-column" id="nav-tab-rel" role="tablist">
                    <div className="text-cc px-3 fw-600 fsxl20 font-mont pb-2">
                        Date
                    </div>
                    <button className="nav-link active" id="nav-2023-tab" data-bs-toggle="tab" data-bs-target="#nav-2023"
                        type="button" role="tab" aria-controls="nav-2023" aria-selected="true"
                    >
                        2023
                    </button>
                </div>
                <div className="tab-content" id="nav-tab-relContent">
                    <div className="tab-pane fade show active" id="nav-2023" role="tabpanel" aria-labelledby="nav-2023-tab">
                        <div className="rel-detail">
                            <h2 className="fsxl40 fw-600">
                                Version 2.1
                            </h2>
                            <p className="font-lucida fsxl-l20">
                                15 February 2023
                            </p>
                            <h6 className="fsxl-l20 fw-600">
                                Improvements
                            </h6>
                            <ul className="rel-list">
                                <li> Enhanced the interface to provide a smoother user experience. </li>
                                <li> Added over 10 new API listings. </li>
                                <li> Implemented new tags, including the “free” tag. </li>
                                <li> Integrated new data points, including the
                                    number of endpoints and production instances.</li>
                                <li> New, redesigned splash screen. </li>
                                <li> Overhauled the filter menu. </li>
                                <li> Updated the technical information on select
                                    cards. </li>
                            </ul>
                        </div>
                        <div className="rel-detail">
                            <h2 className="fsxl40 fw-600">
                                Version 2.0
                            </h2>
                            <p className="font-lucida fsxl-l20">
                                18 January 2023
                            </p>
                            <h6 className="fsxl-l20 fw-600">
                                Improvements
                            </h6>
                            <ul className="rel-list">
                                <li> Redesigned for improved look, feel and intuitiveness. </li>
                                <li> Added 10 new API listings. </li>
                                <li> Embedded API documentation into each API card.</li>
                                <li> Toggle between a Grid or List view for user preference in browsing API library. </li>
                                <li> Click through to a dedicated page for each API card, containing all available endpoints, triggers and actions.</li>
                                <li> Ability to filter API cards by tags eg. Hospitals, EHR. </li>
                                <li> Recoded to React and a new Code Repo for improved product life cyle and content management. </li>
                                <li> Redesigned Filter Menu </li>
                                <li> Navigation Menu Updated </li>
                                <li> New Tags </li>
                                <li> Technical Info on Cards Updated
                                    & New APIs </li>
                            </ul>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="nav-2021" role="tabpanel" aria-labelledby="nav-2021-tab">
                        Something 20231
                    </div>
                </div>
            </section>
        </main>
    )
}