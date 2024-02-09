import React from "react";
import Session from "./components/session/session.jsx";
import Form from "./components/form/form.jsx";
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
