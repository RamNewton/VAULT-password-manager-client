import React from 'react';

const heroStyle = {
    "height": "100%",
    "overflowX": "hidden",
    "overflowY": "auto"
}
const titleStyle = {
    "fontFamily": 'Vollkorn, serif',
    "fontSize": '7em'
}
const subtitleStyle = {
    "fontFamily": 'Vollkorn, serif',
    "fontSize": '1.5em'
}

const LandingPage = () => {
    return (
        <section className="hero is-fullheight-with-navbar is-primary">
            <div style={heroStyle} className="hero-body">
                <div className="container has-text-centered">
                    <span style={titleStyle}>VAULT</span><br />
                    <span style={subtitleStyle}>The Only Password Manager You Need</span>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;