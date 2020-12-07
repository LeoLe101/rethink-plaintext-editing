import React from "react";
import PropTypes from 'prop-types';
import { getFileContent, getFileName, getFileType } from "../../utils/fileUtil";

import css from './style.css';

const CodeEditor = ({ file, write }) => {
    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);
    const fileType = getFileType(file);

    console.log(`CODE EDITOR`);
    console.log(`- Content: ${fileContent}`);
    console.log(`- Name: ${fileName}`);
    console.log(`- Type: ${fileType}`);

    const saveFile = () => {
        console.log(`Saving Content...`);
        const content = new File([fileContent], `/${fileName}`,
            {
                type: fileType,
                lastModified: Date.now()
            });
        write(content);
    }

    return (
        <div>

        </div>
    );

}

CodeEditor.propTypes = {
    file: PropTypes.object,
    write: PropTypes.func
}

export default CodeEditor;