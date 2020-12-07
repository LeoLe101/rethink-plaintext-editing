import React from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

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
			<div className={css.editor}>
				<div className={css.title}>{fileName}</div>

				{/* Editor */}
				<div className={css.content}>
					<Editor
						value={fileContent}
						onValueChange={code => setFileContent(code)}
						highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
						padding={10}
						className={css.code}
					/>
				</div>
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
