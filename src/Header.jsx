import React from "react";

const Header = () => {
    return (
        <div className="header">
            <img class="header__logo" src="./images/logo.png" />
            <div class="header__buttons">
                <button>Login/signup</button>
                <button>Cart</button>
            </div>
        </div>
    )
}

export default Header;