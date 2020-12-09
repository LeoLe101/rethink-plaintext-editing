import React from "react";
import PropTypes from 'prop-types';
import { getFileContent, getFileName, getFileType } from "../../utils/fileUtil";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import css from './style.css';

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
			type: file.type,
			lastModified: Date.now()
		});
		write(edit);
	}

	// Handle Tab
	const handleKeyDown = evt => {
		let value = fileContent;
		let startPos = evt.currentTarget.selectionStart;

		console.log("Key handler: ", evt.currentTarget);

		// handle 4-space indent on
		if (evt.key === "Tab") {
			value = value.substring(0, startPos) +
				"    " +
				value.substring(startPos, value.length);

			evt.currentTarget.selectionStart = startPos + 3;
			evt.currentTarget.selectionEnd = startPos + 4;
			evt.preventDefault();

			setFileContent(value);
		}
	};
	return (
		<div className={css.editor}>
			<div className={css.title}>{fileName}</div>
			<div className={css.content}>
				<textarea
					value={fileContent}
					onChange={(evt) => setFileContent(evt.target.value)}
					onKeyDown={handleKeyDown}
					className={css.txt}
				/>

				<SyntaxHighlighter
					language="javascript"
					style={dracula}
					wrapLongLines={true}
					showLineNumbers={true}
					className={css.highlighter}
				>
					{fileContent}
				</SyntaxHighlighter>
			</div>

			<button
				className={css.save}
				onClick={() => saveFile()}
			>
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