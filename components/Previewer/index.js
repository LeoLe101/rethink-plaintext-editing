import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPreview from '../MarkdownEditor/preview';
import CodePreview from '../CodeEditor/preview';
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';
import css from './style.css';

function Previewer({ file, setEditFile }) {
    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);
    const fileType = getFileType(file);

    const renderPreviewer = () => {
        if (fileType === 'md') {
            return <MarkdownPreview file={file} />;

        }
        else if (fileType === 'txt') {
            return <div className={css.plainTxt}>{fileContent}</div>;
        }
        else {
            return <CodePreview file={file} />;
        }
    }

    return (
        <div className={css.preview}>
            <div className={css.title}>{fileName}</div>
            <div className={css.content}>
                {renderPreviewer()}
            </div>
            <button
                className={css.save}
                onClick={() => setEditFile(true)}>
                EDIT
			</button>
        </div>
    );
}

Previewer.propTypes = {
    file: PropTypes.object,
    setEditFile: PropTypes.func
};

export default Previewer;