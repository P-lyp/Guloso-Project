import React from "react";
import Session from "./components/Session/Session.jsx";
import Form from "./components/form/Form.jsx";
import "./App.css";
import DataList from "./components/DataList/DataList.jsx";

function App() {
    return (
        <div>
            <Session />
            <Form />
            <DataList />
        </div>
    );
}

export default App;
