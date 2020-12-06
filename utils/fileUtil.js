import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Re-use the Page Previewer File parser code
const getFileContent = (file) => {
    const [fileContent, setFileContent] = useState(null);

    // Set new content when Active File changed
    useEffect(
        async () => {
            setFileContent(await file.text());
        },
        [file]
    );
    return [fileContent, setFileContent];
}

getFileContent.prototype = {
    file: PropTypes.object
}


export default getFileContent;