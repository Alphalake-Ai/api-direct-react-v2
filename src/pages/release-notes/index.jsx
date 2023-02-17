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
                                <li> New Improved User Experience </li>
                                <li> New Associated Filters </li>
                                <li> Added the "free" tag </li>
                                <li> Feature Improvements </li>
                                <li> New Redesigned Splash Screen </li>
                                <li> Improved Layout </li>
                                <li> UI/UX Fixes </li>
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