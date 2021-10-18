import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {

    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2021 BookingCare with Bingo2706. More information <a target="blank" href="https://www.youtube.com/channel/UCnz2rsSOw4JDYilb8aobqHA"> &#8594; Click here  &#8592; </a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
