import React from "react";
import PropTypes from 'prop-types';
import { getFileContent, getFileName, getFileType } from "../../utils/fileUtil";

import CodePreview from '../CodeEditor/preview';
import css from './style.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const CodeEditor = ({ file, write }) => {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);
	const fileType = getFileType(file);

	console.log(`CODE EDITOR`);
	console.log(`- Content: ${fileContent}`);
	console.log(`- Name: ${fileName}`);
	console.log(`- Type: ${fileType}`);

	const saveFile = () => {
		const edit = new File([fileContent], `/${fileName}`, {
			type: fileType,
			lastModified: Date.now()
		});
		write(edit);
	}

	const doHighlight = (code) => {
		console.log("Highlighting code", code)
		highlight(code, languages.javascript, 'javascript');
	}

	return (
		<div>

			<div className={css.editor}>
				<Editor
					value={fileContent}
					onValueChange={code => setFileContent(code)}
					highlight={code => doHighlight(code)}
					padding={10}
				/>


				{/* <textarea
					value={fileContent}
					onChange={(evt) => setFileContent(evt.target.value)}
					className={css.txt}
				/>
				<div className={css.txt} >
					<CodePreview file={file} />
				</div> */}
			</div>


			<button onClick={() => saveFile()}>
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