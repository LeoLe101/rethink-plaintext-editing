import React from "react";
import PropTypes from 'prop-types';
import { getFileContent, getFileType } from "../../utils/fileUtil";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import css from './style.css';

function CodePreview({ file }) {
    const [fileContent] = getFileContent(file);
    const fileType = getFileType(file);

    return (
        <div className={css.previewer}>
            <SyntaxHighlighter
                language={fileType}
                style={dracula}
                wrapLongLines={true}
                showLineNumbers={true}
                className={css.highlighter}
            >
                {fileContent}
            </SyntaxHighlighter>
        </div>
    );

}

CodePreview.propTypes = {
    file: PropTypes.object,
}

export default CodePreview;