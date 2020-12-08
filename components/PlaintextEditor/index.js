import React from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { getFileContent, getFileName } from '../../utils/fileUtil';

function PlaintextEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);

	console.log(`Plain Text EDITOR`);
	console.log(`- Content: ${fileContent}`);
	console.log(`- Name: ${fileName}`);

	const saveFile = (evt) => {
		evt.preventDefault();
		evt.stopPropagation()

		// TODO: Modal pop up

		const edit = new File([fileContent], `/${fileName}`, {
			type: file.type,
			lastModified: Date.now()
		});
		write(edit);
	}

	return (
		<div>
			<div className={css.editor}>
				<div className={css.title}>{fileName}</div>
				<textarea
					value={fileContent}
					onChange={(evt) => setFileContent(evt.target.value)}
					className={css.txt}
				/>
			</div>
			<button onClick={evt => saveFile(evt)}>
				SAVE
			</button>
		</div>
	);
}

PlaintextEditor.propTypes = {
	file: PropTypes.object,
	write: PropTypes.func,
};

export default PlaintextEditor;
