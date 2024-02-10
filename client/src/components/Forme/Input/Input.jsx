import "./Input.css";

export default function Input(props) {
    const updateState = (event) => {
        let inputInfo;
        if (props.inputType === "checkbox") {
            inputInfo = event.target.checked;
        } else {
            inputInfo = event.target.valueAsNumber;
        }

        props.updateState(inputInfo);
    };

    return (
        <div className="input-container">
            <label>{props.label}</label>
            <input
                id={props.id}
                autoComplete="off"
                type={props.inputType}
                onChange={updateState}
                value={props.inputFieldValue}
                checked={props.inputFieldValue}
            />
        </div>
    );
}
