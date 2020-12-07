import React from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';


import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
function PlaintextEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);
	const fileType = getFileType(file);

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

	return (
		<div>
			<Editor
				value={fileContent}
				onValueChange={code => setFileContent(code)}
				highlight={code => highlight(code, languages.js)}
				padding={10}
				style={{
					fontSize: 15
				}}
			/>
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
