import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import './style.css';
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';

import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


function PlaintextEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);
	let fileType = getFileType(file);

	// Change the highlight when file content or type changes

	console.log(`Plain Text EDITOR`);
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

	const editFile = evt => {
		console.log(`Event: ${evt}`);
		// setFileContent(event.target.value);
	}

	return (
		<div>

			<div className={window}>
				{/* Editor */}
				<Editor
					placeholder="Type some code…"
					value={fileContent}
					onValueChange={code => setFileContent(code)}
					highlight={code => Prism.highlight(code, Prism.languages.js)}
					padding={10}
				/>
			</div>

			{/* Buttons */}
			<button onClick={() => saveFile()}>
				SAVE
			</button>
		</div>
	);
}

PlaintextEditor.propTypes = {
	file: PropTypes.object,
	write: PropTypes.func
};

export default PlaintextEditor;
