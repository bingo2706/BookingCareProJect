import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    <FormattedMessage id="homepage.media" /> FrontEnd Programmer
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="350px"
                            src="https://www.youtube.com/embed/e4EZSBASYU4"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>"<FormattedMessage id="homepage.media-content" />"</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
