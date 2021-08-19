import React, { Component } from "react";

class Planet extends Component {
    render() {
        const { planet_name } = this.props;
        return (
            <div class="grid grid-cols-2 h-32 border border-gray-200 my-4">
                <div class="relative">
                    <img class="absolute top-0 left-0 w-full h-32 object-cover" src={"img/" + planet_name + ".jpeg"} />
                </div>
                <p class="text-3xl font-bold text-left p-10">{planet_name}</p>
            </div>
        );
    }
}

export default Planet;