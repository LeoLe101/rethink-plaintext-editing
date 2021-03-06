import React from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { getFileContent, getFileName } from '../../utils/fileUtil';

const DEBUG = false;

function PlaintextEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);

	if (DEBUG) {
		console.log(`Plain Text EDITOR`);
		console.log(`- Content: ${fileContent}`);
		console.log(`- Name: ${fileName}`);
	}

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
		<div className={css.editor}>
			<div className={css.title}>{fileName}</div>
			<div className={css.content}>
				<textarea
					value={fileContent}
					onChange={(evt) => setFileContent(evt.target.value)}
					className={css.txt}
				/>
			</div>
			<button
				className={css.save}
				onClick={evt => saveFile(evt)}
			>
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
