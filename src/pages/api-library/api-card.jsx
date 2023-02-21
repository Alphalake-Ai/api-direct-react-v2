import ToolImgRenderer from "../../components/ToolImgTags";
import TextTagRenderer from "../../components/TextTags";
import { Link } from "react-router-dom";

function createSlug(title, id) {
    return title.trim().toLowerCase().replace(/\s+/g, '-')+'@'+id;
}

export default function ApiCard({ data }) {
    return (
        <Link to={createSlug(data.name, data._id)} className="card">
            <div>
                <div className="title-logo">
                    <div className="title">
                        <h2 className="fw-600 font-mont text-cc fsxl32">{data?.name}</h2>
                        {
                            data?.isFree ? <span className='free-api'>free</span> : <></>
                        }
                    </div>
                    <div className="logo">
                        <img src={data?.logoUrl} alt="api-logo" width="100%"  />
                    </div>
                </div>
                <div className="grid-tag-img">
                    <div className="flag" data-title={data?.type}>
                        {
                            <ToolImgRenderer tag={data?.type.toUpperCase()} />
                        }
                    </div>
                    <div className="flag" data-title={data?.fhirCompliant? "FHIR": "Non-FHIR"}>
                        <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/FHIR_LOGO_1702.png" style={{ filter: data?.fhirCompliant ? "none": "grayscale(1)" }} width='25px' alt="fhir" />
                    </div>
                </div>
                <div className="text-tags">
                    {
                        data.textTags.slice(0,3).map((t, i) => <TextTagRenderer key={i} tag={t.toUpperCase()} />)
                    }
                </div>
            </div>
            <div className='desc-hold'>
                <div className="desc">
                 {data?.description[0]}
                </div>
                <div className="d-flex justify-content-between">
                    <div className="list-tag-img">
                        <div className="flag" data-title={data?.type}>
                            {
                                <ToolImgRenderer tag={data?.type.toUpperCase()} />
                            }
                        </div>
                        <div className="flag" data-title={data?.fhirCompliant ? "FHIR" : "Non-FHIR"}>
                            <img src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/FHIR_LOGO_1702.png" style={{ filter: data?.fhirCompliant ? "none" : "grayscale(1)" }} width='25px' alt="fhir" />
                        </div>
                    </div>
                    <div className="list-tag-img">
                        <div className="flag" data-title="Github">
                            <ToolImgRenderer tag="GITHUB" width="32px" />
                        </div>
                        <div className="flag" data-title="Swagger">
                            <ToolImgRenderer tag="SWAGGER" width="32px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='info font-mont text-cc fsxl16'>
                <div>
                    Current version: <span className="fw-600">{data?.currentVersion}</span>
                </div>
                <div>
                    Format: <span className="fw-600">{ /workato/i.test(data?.type) ? "Automation Connector (NO-CODE)": data.type+" API" }</span>
                </div>
                <div>
                    Access: <span className="fw-600">{data?.openApi ? "Open": "Partner-Only"}</span>
                </div>
                {
                    data?.firstRelease ? <div>
                        Release date: <span className="fw-600">{data?.firstRelease}</span>
                    </div> : <div className="faded">
                        Release date: <span className="fw-300"> Not supplied</span>
                    </div>
                }
                {
                    data?.instances ? <div>
                        Production Instances: <span className="fw-600">{data?.instances}</span>
                    </div> : <div className="faded">
                        Production Instances: <span className="fw-300"> Not supplied</span>
                    </div>
                }
                {
                    data?.endpoints ? <div>
                        No. of data Endpoints: <span className="fw-600">{data?.endpoints}</span>
                    </div> : <div className="faded">
                        No. of data Endpoints: <span className="fw-300"> Not supplied</span>
                    </div>
                }
            </div>
        </Link>
    )
}