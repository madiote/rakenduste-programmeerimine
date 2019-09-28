import React from "react";
import {phones, tvs} from "./mydatabase.js";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";

class HomePage extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            items: phones,
        };
    }

    handleChange(event){
        console.log(event.target.value);
        switch(event.target.value){
            case "phones": {
                this.setState({
                    items: phones,
                });
                break;
            }
            case "tvs": {
                this.setState({
                    items: tvs,
                });
                break;
            }
        }
    }

    render(){
        return (
            <>
                <Header />
                <select onChange={this.handleChange.bind(this)}>
                    <option value="phones">Phones</option>
                    <option value="tvs">TVs</option>
                </select>
                <ItemList items={this.state.items}/>
            </>
        );
    }
}

export default HomePage;