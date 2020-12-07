import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import './style.css';
import 'prismjs/themes/prism.css' 
import { getFileContent, getFileName, getFileType } from '../../utils/fileUtil';

function MarkdownEditor({ file, write }) {
	const [fileContent, setFileContent] = getFileContent(file);
	const fileName = getFileName(file);
	const fileType = getFileType(file);

	// Change the highlight when file content or type changes

	console.log(`MD EDITOR`);
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
		<div className="container__content">
			<div className="container_editor_area">
				<Editor
					placeholder="Type some code…"
					value={fileContent}
					onValueChange={code => setFileContent(code)}
					highlight={code => highlight(code, languages.markdown, 'markdown')}
					padding={10}
					className="container__editor"
				/>
			</div>
		</div>
	);
}

MarkdownEditor.propTypes = {
	file: PropTypes.object,
	write: PropTypes.func
};

export default MarkdownEditor;
