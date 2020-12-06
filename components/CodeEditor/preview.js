import React from "react";
import PropTypes from 'prop-types';
// import Prism from 'primjs';
import { getFileContent, getFileName } from "../../utils/fileUtil";

import css from './style.css';

function CodePreview({ file }) {
    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);

    console.log(`Code Preview: ${file}`)
    console.log(`- Content: ${fileContent}`)

    return (
        <div className={css.editor}>
            <span>{fileName}</span>
            <pre>
                <code className="language-javascript">
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