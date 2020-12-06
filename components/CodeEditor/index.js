import React from "react";
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { getFileContent, getFileName } from "../../utils/fileUtil";

import css from './style.css';

function CodeEditor({ isPreview, file, write }) {

    const [fileContent] = getFileContent(file);
    const fileName = getFileName(file);

    console.log(`IsPreview: ${isPreview} - Edit Code File: ${file} - Write: ${write}`);

    const saveFile = () => {
        console.log(`Saving Content...`);
        const content = new File([fileContent], `/${fileName}`, 
        {
            type: file.type,
            lastModified: Date.now()
        });
        write(content);
    }

    return (
        <div className={css.editor}>
            <AceEditor
                placeholder="Code Editor"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={fileContent}
                setOptions={
                    {
                        readOnly: isPreview,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 4,
                    }
                }
            />
            <button onClick={saveFile}>
                SAVE
            </button>
        </div>
    );

}

CodeEditor.propTypes = {
    isPreview: PropTypes.bool,
    file: PropTypes.object,
    write: PropTypes.func
}

export default CodeEditor;