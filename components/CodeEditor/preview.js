import React from "react";
import PropTypes from 'prop-types';
import { getFileContent } from "../../utils/fileUtil";
import css from './style.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function CodePreview({ file }) {
    const [fileContent] = getFileContent(file);

    return (
        <div className={css.editor}>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}
                wrapLongLines={true}
                showLineNumbers={true}
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