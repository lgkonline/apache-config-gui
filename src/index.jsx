import React from "react"
import {render} from "react-dom";

import fs from "fs";

import "./main.scss";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            content: "",
            configFile: localStorage.getItem("configFile") ? localStorage.getItem("configFile") : "C:/xampp/apache/conf/httpd.conf",
            paths: null
        }
    }

    componentDidMount() {
        this.readFile();
    }

    readFile() {
        const me = this;

        fs.readFile(this.state.configFile, "utf8", function(error, data) {
            if (error) {
                alert(error.message);
                throw error;
            }

            const lines = data.split("\n");
            me.state.paths = [];

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].indexOf("DocumentRoot ") > -1) {
                    const path = lines[i].match(/"((?:.|[^"])*)"/)[0].replace(/"/g, "");

                    me.state.paths.push({
                        path: path,
                        enabled: (lines[i].indexOf("#DocumentRoot ") > -1 || lines[i].indexOf("# DocumentRoot ") > -1) ? false : true
                    });                    
                }
            }

            console.log(me.state.paths);

            me.setState({content: data, paths: me.state.paths});
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.configFile} 
                        onChange={(event) => {
                            this.setState({configFile: event.target.value}, () => {
                                localStorage.setItem("configFile", this.state.configFile);
                            });
                        }}
                    />

                    <span className="input-group-btn">
                        <button type="button" className="btn btn-default" onClick={() => this.readFile()}>
                            Read file
                        </button>
                    </span>
                </div>

                {this.state.paths ? this.state.paths.map((path, i) => 
                    <div key={i} className="input-group">
                        <span className="input-group-addon">
                            <input type="radio" checked={path.enabled}/>
                        </span>
                        <input type="text" className="form-control" value={path.path}/>
                    </div>
                ) : ""}
            </div>
        );
    }
}

render(<App/>, document.getElementById("app"));