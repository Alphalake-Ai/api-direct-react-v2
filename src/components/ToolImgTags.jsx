
export function Github ({...props}) {
    return <img {...props} src="https://www.alphalake.ai/hubfs/API%20Direct%20Logo/githubr.svg" alt="github logo" />
}

export function Swagger ({...props}) {
    return <img {...props} src="https://www.alphalake.ai/hubfs/API%20Direct%20Logo/Swagger.svg" alt="swagger logo" />
}

export function UploadIo ({...props}) {
    return <img {...props} src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/upload-tr.png" alt="upload io-logo" width="45px" />
}

export function RestApi ({...props}) {
    return <img {...props} src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/api-connect-images/RESTAPI_LOGO.svg" alt="rest-api" width="100px" />
}

export function Workato ({...props}) {
    return <img {...props} src="https://fs.hubspotusercontent00.net/hubfs/6637851/api-connect-images/Workato.png" width="35px" />
}

export function Soap ({...props}) {
    return <img {...props} src="https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/SOAP_API_1702.png" width="35px" />
}

export default function ToolImgRenderer ({ tag, ...props }) {
    switch (tag) {
        case 'GITHUB': return <Github {...props}/>;
        case 'WORKATO': return <Workato {...props}/>;
        case 'SWAGGER': return <Swagger {...props} />;
        case 'UPLOAD-TO': return <UploadIo {...props}/>;
        case 'UPLOAD-IO': return <UploadIo {...props}/>;
        case 'REST-API': return <RestApi {...props}/>;
        case 'REST': return <RestApi {...props}/>;
        case 'SOAP': return <Soap {...props}/>
        default: return <></>;
    }
}