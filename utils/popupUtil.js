import PropTypes from 'prop-types';
import React, { useState } from 'react';

function PopUpMessage({ message, time }) {
    const [modal, toggleModal] = useState(false);

    console.log(`Mess: ${message} - Time: ${time}`)
    if (modal)
        return (
            <div className='modalCSS' id='modalDiv'>
                <div className="modelContent">{modal}</div>
            </div>
        );

    else // close modal
        return;
}

PopUpMessage.PropTypes = {
    message: PropTypes.string,
    time: PropTypes.object
}