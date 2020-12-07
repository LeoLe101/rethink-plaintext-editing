import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import css from './style.css';
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';

function PlaintextEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);
	let fileType = getFileType(file);

	// Change the highlight when file content or type changes
	useEffect(() => {
		Prism.highlightAll();
	}, [fileType, fileContent]);

	console.log(`File: ${file}`);
	console.log(`- Content: ${fileContent}`);
	console.log(`- Name: ${fileName}`);
	console.log(`- Type: ${fileType}`);

	if (fileType === 'txt')
		fileType = 'javascript';

	console.log(`- Type After: ${fileType}`);

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
		<div className={css.editor}>
			<h2>{fileName}</h2>

			{/* Editor */}
			<textarea
				className="code-input"
				value={fileContent}
				onChange={(evt) => editFile(evt)}
			/>

			{/* Code or Text Highlighter */}
			<pre className="code-output">
				<code className={`language-${fileType}`}>
					{fileContent}
				</code>
			</pre>

			{/* Buttons */}
			<button onClick={saveFile()}>
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
