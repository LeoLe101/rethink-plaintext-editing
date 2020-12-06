import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import css from './style.css';
import { fileUtil } from '../../utils';

function CodeEditor({ file, write }) {

    const [fileContent] = fileUtil.getFileContent(file);

    console.log(`Edit Code File: ${file} - Write: ${write}`);

    return (
        <div className={css.editor}>
            <AceEditor
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={ fileContent }
                setOptions={
                    {
                        readOnly: true,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 4,
                    }
                }
            />
        </div>
    );

}

CodeEditor.prototype = {
    files: PropTypes.object,
    write: PropTypes.func
}

