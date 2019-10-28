import React from "react";
import {Link} from "react-router-dom"; 
import {profileIcon, cartIcon} from "../icons.js";
import "./header.css";
import PropTypes from "prop-types";
import {AuthContext} from "../index.jsx";

const Header = () => {
    return (
        <AuthContext.Consumer>
            {
                (contextValue) => (
                    <div className="header">
                        <Link to={"/"}>
                            <img src="/images/logo.svg" /> {/* className="header__logo" */}
                        </Link>
                        <div className="header__buttons">
                            {contextValue.user.email && <WelcomeIcon user={contextValue.user}/>}
                            {!contextValue.user.email && <LoginRegisterIcon />}

                            <div className={"header__button"}>
                                <img src={cartIcon} />
                                <div className={"header__button-text"}>Cart</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </AuthContext.Consumer>
    );
};

/* Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
}; */

const LoginRegisterIcon = () => (
    <Link className={"header__button"} to={"/login"}>
        <img src={profileIcon} />
        <div className={"header__button-text"}>Sign in/<br/>register</div>
    </Link>
);

const WelcomeIcon = ({user}) => (
    <Link className={"header__button"} to={`/users/${user._id}`}>
        <img src={profileIcon} />
        <div className={"header__button-text"}>Welcome, {user.email}</div>
    </Link>
);

WelcomeIcon.propTypes = {
    user: PropTypes.object.isRequired
};

export default Header;