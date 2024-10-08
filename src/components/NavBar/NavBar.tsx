import { useLocation, Link } from "@solidjs/router";
import { Component } from "solid-js";
import './NavBar.module.css'

const NavBar: Component = () => {
    const location = useLocation();
    
    return (
        <nav class="navbar">
            <div class="navbar-content">
                {/* Back Button */}
                {location.pathname !== '/home' && (
                    <Link href='/home' class="back-button">
                        &#8592;
                    </Link>
                )}
                {/* Home Icon */}
                <Link href='/home' class="home-button">
                    🏠 {/* Home icon */}
                </Link>
                <h1 class="navbar-title">Your App Title</h1>
            </div>
        </nav>
    );
};

export default NavBar;
