import React from 'react';

const heroStyle = {
    "height": "100%",
    "overflow-x": "hidden",
    "overflow-y": "auto"
}
const titleStyle = {
    "font-family": 'Vollkorn, serif',
    "font-size": '7em'
}
const subtitleStyle = {
    "font-family": 'Vollkorn, serif',
    "font-size": '1.5em'
}

const LandingPage = () => {
    return (
        <section class="hero is-fullheight-with-navbar is-primary">
            <div style={heroStyle} class="hero-body">
                <div class="container has-text-centered">
                    <span style={titleStyle}>VAULT</span><br />
                    <span style={subtitleStyle}>The Only Password Manager You Need</span>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;