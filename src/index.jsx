import React from "react"
import {render} from "react-dom";

import fs from "fs";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            content: ""
        }
    }

    readFile() {
        const configFile = "C:/xampp/apache/conf/httpd.conf";
        const me = this;

        fs.readFile(configFile, "utf8", function(error, data) {
            if (error) throw error;

            console.log(data);

            me.setState({content: data});
        });
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>

                <button type="button" onClick={() => this.readFile()}>
                    Read file
                </button>

                <hr/>

                <textarea 
                    value={this.state.content}
                    style={{
                        width: "100%",
                        height: "60vh"
                    }}
                />
            </div>
        );
    }
}

render(<App/>, document.getElementById("app"));