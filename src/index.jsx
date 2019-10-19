import React from "react";
import ReactDOM from "react-dom";
import ItemPage from "./pages/ItemPage.jsx";
import Header from "./components/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import { BrowserRouter, Route } from "react-router-dom"; 

class App extends React.Component {
    state = {
        token: null,
        user: {
          email: null,
          createdAt: null,
          _id: null,
        }
      };

    handleLogin = ({token, user}) => {
        this.setState({
            user, token
        });
    };

    render(){
        return(
            <BrowserRouter>
                <Route 
                    path={"/"} 
                    render={(props) => 
                        <Header 
                            {...props} 
                            token={this.state.token}
                            user={this.state.user}
                        />
                    } 
                />
                <Route 
                    path="/" 
                    exact 
                    render={(props) => 
                        <LoginPage 
                            {...props} 
                            onLogin={this.handleLogin}
                        />
                    } 
                />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignupPage} />
                <Route 
                    path="/users/:userId" 
                    exact 
                    render={(props) => {
                        return <UserPage {...props} user={this.state.user}/>;
                    }}
                />
                <Route path="/items/:itemId" exact component={ItemPage} />
            </BrowserRouter>
        );
    }
}

const root = document.getElementById("app");

ReactDOM.render(<App />, root);