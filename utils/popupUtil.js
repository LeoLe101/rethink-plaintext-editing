import PropTypes from 'prop-types';

function PopUpMessage({ message, time }) {

    console.log(`Mess: ${message} - Time: ${time}`)
}

PopUpMessage.PropTypes = {
    message: PropTypes.string,
    time: PropTypes.object
}