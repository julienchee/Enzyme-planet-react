import React, { Component } from "react";
import Planet from '../components/Planet';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planetsName: '',
            words: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.generatePlanet = this.generatePlanet.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
        this.handleRLDDChange = this.handleRLDDChange.bind(this);
        this.downloadPage = this.downloadPage.bind(this);
    }

    handleChange(event) {
        this.setState({ planetsName: event.target.value });
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }

    downloadPage() {
        var text = new String;
        this.state.words.forEach(word => {
            text += word.title + "\n";
        });
        var filename = "export.html";
        this.download(filename, text);
    }
    
    generatePlanet() {
        const plainName = this.state.planetsName;
        var planetsArr = plainName.split(",").map(function (item) {
            return item.trim().toLowerCase();
        });

        var planetsObj = [];
        planetsArr.forEach((item, idx) => {
            var el = { "id": idx, "title": item };
            planetsObj.push(el);
        });

        this.setState({ words: planetsObj });
    }

    handleRLDDChange(reorderedItems) {
        this.setState({ words: reorderedItems });
    }

    itemRenderer(item) {
        return (
            <div className="item">
                <Planet planet_name={item.title}></Planet>
            </div>
        );
    }

    render() {
        const items = this.state.words;
        return (
            <div className="flex-container">
                <div className="row">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={this.handleChange} id="planets" type="text" placeholder="Input planets..."></input>
                    <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={this.generatePlanet}>
                        Generate
                    </button>
                    <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={this.downloadPage}>
                        Download
                    </button>
                    <RLDD
                        items={items}
                        itemRenderer={this.itemRenderer}
                        onChange={this.handleRLDDChange}
                    />
                </div>
            </div>
        );
    }
}

export default Home;