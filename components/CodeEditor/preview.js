import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import Prism from 'primjs';
import { getFileContent, getFileName, getFileType } from "../../utils/fileUtil";

import css from './style.css';

function CodePreview({ file }) {
    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);
    const fileType = getFileType(file);

    // Change the highlight when the file change
    useEffect(() => {
        Prism.highlightAll();
    }, [file]);

    console.log(`- Content: ${fileContent}`);
    console.log(`- Name: ${fileName}`);
    console.log(`- Type: ${fileType}`);

    return (
        <div className={css.editor}>
            <span>{fileName}</span>
            <pre>
                <code className={`language-${fileType}`}>
                    {fileContent}
                </code>
            </pre>
        </div>
    );

}

CodePreview.propTypes = {
    file: PropTypes.object,
}

export default CodePreview;