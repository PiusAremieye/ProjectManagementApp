import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){    
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="Dashbord.html">
                        Project Management Application
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    Dashbord
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="register.html">
                                    Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login.html">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>                
                </div>
            </nav>            
        )
    }
}

export default Header; 