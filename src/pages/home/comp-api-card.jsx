import ToolImgRenderer from "../../components/ToolImgTags.jsx";
import ImgTagRenderer, { FHIR, NonFHIR } from "../../components/ImageTags";
import TextTagRenderer from "../../components/TextTags";
import { useNavigate } from "react-router-dom";

const defaultLogoUrl = "https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/cerner-1.png";

const fakeData = {
    title: "Cerner R4 Millenium",
    logoUrl: "https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/cerner-1.png",
    imgTags: ["FHIR", "WORKATO"],
    textTags: ["EHR", "HOSPITALS", "CLINICIANS"],
    toolTags: ["GITHUB", "SWAGGER"],
    description: `Cerner Ignite APIs are cloud-based allowing for rapid,
    agile deployment of future updates or enhancements.
    It also simplifies implementation of the...`,
    publisher: {
        by: "Cerner",
        date: "xx/xx/xx",
        version: "xx.xx.alpha"
    }
}

function createSlug(title, id) {
    return title.trim().toLowerCase().replace(/\s+/g, '-')+'@'+id;
}

export default function Card({ data, listView }) {

    const navigate = useNavigate();
    function onCardClick () {
        navigate('detail/'+createSlug(data.name, data._id));
    }

    return (
        // <Link to={createSlug(data.title)}>
            <div className="card" onClick={onCardClick}>
                <div className="brand-n-title">
                    <div className="title capitalize fsxl36 text-cc font-mont fw-600">{data?.name}</div>
                    <div className="brand-image-hold">
                        <img src={data?.logoUrl || defaultLogoUrl} width="100%" />
                    </div>
                </div>
                <div className="tile-right">
                    <div className="img-tags py-1">
                        {
                            data?.fhirCompliant ? <FHIR/> : <NonFHIR/>
                        }
                        <ToolImgRenderer tag={data?.type.toUpperCase()}/>
                    </div>
                    <div className="tool-imgs d-flex py-1">
                        {
                            data.tools.map((t, i) => <ToolImgRenderer key={i} tag={t} />)
                        }
                    </div>
                </div>
                <div className="text-tags pt-2">
                    {
                        data.textTags.slice(0,3).map((t, i) => <TextTagRenderer key={i} tag={t.toUpperCase()} />)
                    }
                </div>
                <div className="desc">
                    <p className="font-lucida text-cc fsxl-l16">
                        { listView ? 
                            data?.description[0].split(" ").slice(0, 20).join(" ")+"..."
                            : data?.description[0].split(" ").slice(0, 33).join(" ")+"..."
                        }
                    </p>
                </div>
                <div className="publish">
                    <div className="fsxl-l16">API by: <span className="value">{data.publisher}</span></div>
                    <div className="fsxl-l16">Published on: <span className="value">{data.firstRelease}</span></div>
                    <div className="fsxl-l16">Released version: <span className="value">{data.currentVersion}</span></div>
                </div>
            </div>
        // </Link>
    )
}