import React from "react";
import ItemsList from "../components/ItemsList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../components/SortDropdown.jsx";
import {connect} from "react-redux";
import {ItemProps} from "./CartPage.jsx";
import {getItems} from "../store/store.js";

class HomePage extends React.PureComponent{

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            sortDirection: -1,
            allCategories: ["phones", "tvs"],
            selectedCategories: ["phones"],
        };
    }

    componentDidMount(){
        this.props.dispatch(getItems());
    }

    handleFilterSelect = (event) => {
        const categoryName = event.target.name;
        if (this.isSelected(categoryName)) {
            return this.unselectCategory(categoryName);
        }
        this.selectCategory(categoryName);
    };

    selectCategory = (categoryName) => {
        this.setState({
            selectedCategories: this.state.selectedCategories.concat([categoryName])
        });
    };

    unselectCategory = (categoryName) => {
        const newArr = this.state.selectedCategories.filter( cn => cn !== categoryName);
        this.setState({
            selectedCategories: newArr
        });
    };

    getVisibleItems = () => {
        return this.props.items
        .filter(item => this.isSelected(item.category))
        .sort((a, b) => {
            switch (this.state.sortDirection){
                case -1: return b.price - a.price;
                case 1: return a.price - b.price;
            }
        });
    }

    isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;

    handleSortDropdown = (event) => {
        this.setState({
            sortDirection: parseInt(event.target.value),
        });
    } 

    render(){
        const visibleItems = this.getVisibleItems();
        return (
            <>
                <div className={"body-wrapper"}>
                    <div className={"filters-wrapper"}>
                        <CategoriesFilter 
                            allCategories={this.state.allCategories}
                            handleDropdown={this.handleFilterSelect}
                            isSelected={this.isSelected}
                        />
                    </div>
                    <div className={"items-header-wrapper"}>
                        <div>
                            {visibleItems.length} items found for {this.state.selectedCategories.join(", ")}
                        </div>
                        <SortDropdown direction = {this.state.sortDirection} onChange = {this.handleSortDropdown} />
                    </div>
                    <ItemsList items={visibleItems}/>
                </div>
            </>
        );
    }
}
const CategoriesFilter = ({allCategories, handleDropdown, isSelected}) => {
    return (
        <>
            {
                allCategories.map(categoryName => {
                    return (
                        <Checkbox 
                            key={categoryName} 
                            name={categoryName} 
                            onChange={handleDropdown} 
                            checked={isSelected(categoryName)}
                        />
                    );
                })
            }
        </>
    );
};

CategoriesFilter.propTypes = {
    allCategories: PropTypes.array.isRequired,
    handleDropdown: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
    return {
        items: store.items,
    };
};

export default connect(mapStateToProps)(HomePage);