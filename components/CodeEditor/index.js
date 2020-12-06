import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getFileContent, getFileName, getFileType } from "../../utils/fileUtil";

import css from './style.css';

const CodeEditor = ({ file, write }) => {
    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);
    const fileType = getFileType(file);

    console.log(`Edit Code File: ${file} - Write: ${write}`);

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
            {/* Select Language to Edit */}
            {/* <fieldset>
                <legend>Choose language:</legend>
                <input
                    type="radio"
                    id="javascript"
                    name="language"
                    value="javascript"
                    checked={editorLanguage === "javascript"}
                    onChange={() => setEditorLanguage("javascript")}
                />
                <label htmlFor="javascript">JavaScript</label>
                <input
                    type="radio"
                    id="xml"
                    name="language"
                    value="markup"
                    checked={editorLanguage === "markup"}
                    onChange={() => setEditorLanguage("markup")}
                />
                <label htmlFor="xml">XML</label>
                <input
                    type="radio"
                    id="css"
                    name="language"
                    value="css"
                    checked={editorLanguage === "css"}
                    onChange={() => setEditorLanguage("css")}
                />
                <label htmlFor="css">CSS</label>
            </fieldset> */}

            {/* Code Editor */}
            <div className={css.editor}>
                <textarea
                    className={css.input}
                    value={file}
                />
            </div>

            <button onClick={saveFile}>
                SAVE
            </button>
        </div>
    );

}

CodeEditor.propTypes = {
    file: PropTypes.object,
    write: PropTypes.func
}

export default CodeEditor;