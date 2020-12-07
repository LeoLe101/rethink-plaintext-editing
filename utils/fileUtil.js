import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

// #region Get File Content
const getFileContent = (file) => {
    const [fileContent, setFileContent] = useState(null);

    // IIFE to run Async in useEffect
    useEffect(() => {
        (async () => {
            setFileContent(await file.text());
        })();
    }, [file]);

    return [fileContent, setFileContent];
}

getFileContent.prototype = {
    file: PropTypes.object
}
// #endregion

// #region Get File Name
const getFileName = (file) => {
    return path.basename(file.name);
}

getFileName.prototype = {
    file: PropTypes.object
}
// #endregion

// #region Get File Type
const getFileType = (file) => {
    const type = getFileName(file).split('.');
    return type[1];
}

getFileType.prototype = {
    file: PropTypes.object
}
// #endregion

export {
    getFileContent,
    getFileName,
    getFileType
}