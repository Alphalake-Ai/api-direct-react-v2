export default function ToggleSwitch({label, logo, ...props}) {
    return (
        <div className="d-flex gap-2 align-items-center">
            <span className="fw-600 text-cc toggle-text capitalize font-mont">{label}</span>
            { logo? <img src={logo} width="25px" alt="logo" /> : "" }
            <label className="switch">
                <input type="checkbox" {...props} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}