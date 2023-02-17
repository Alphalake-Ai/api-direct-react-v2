export function FHIR() {
    return (
        <div className="img-tag">
            <img className="fhir-image" src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/FHIR_LOGO_1702.png" width="25px" />
            <div className="font-mont fhir-text fw-600">FHIR</div>
        </div>
    )
}

export function WorkatoNoCode() {
    return (
        <div className="img-tag">
            <img className="workato-image" src="https://fs.hubspotusercontent00.net/hubfs/6637851/api-connect-images/Workato.png" />
            <div className="workato-text">No<span style={{ color: "#67EADD" }}>code</span></div>
        </div>
    )
}

export function NonFHIR() {
    return (
        <div className="img-tag">
            <img className="fhir-image" src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/FHIR_LOGO_1702.png" style={{ filter: "grayscale(100)" }} />
            <div className="fhir-text text-cc fw-600">Non-FHIR</div>
        </div>
    )
}

export default function ImgTagRenderer ({ tag }) {
    switch (tag) {
        case 'FHIR': return <FHIR/>;
        case 'WORKATO': return <WorkatoNoCode/>;
        case 'NON-FHIR': return <NonFHIR />;
        default: return <></>;
    }
}
