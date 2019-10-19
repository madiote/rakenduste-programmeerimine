import React from "react";
import {Link} from "react-router-dom"; 
import {profileIcon, cartIcon} from "../icons.js";
import "./header.css";
import PropTypes from "prop-types";

const Header = ({token, user}) => {
    console.log("header", token, user);
    return (
        <div className="header">
            <Link to={"/"}>
                <img src="/images/logo.svg" /> {/* className="header__logo" */}
            </Link>
            <div className="header__buttons">
                {user.email && <WelcomeIcon user={user}/>}
                {!user.email && <LoginRegisterIcon />}

                <div className={"header__button"}>
                    <img src={cartIcon} />
                    <div className={"header__button-text"}>Cart</div>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
};

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