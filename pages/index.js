import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { listFiles } from '../files';
import css from './style.module.css';
import { getFileContent, getFileName, getFileType } from '../utils/fileUtil';
import { REGISTERED_EDITORS, TYPE_TO_ICON } from '../utils/Constant';

// Previewer
import MarkdownPreview from '../components/MarkdownEditor/preview';
import CodePreview from '../components/CodeEditor/preview';

function FilesTable({ files, editFile, activeFile, setActiveFile, setEditFile }) {
	const switchFile = (evt, file) => {
		evt.preventDefault();
		evt.stopPropagation();

		if (editFile)
			setEditFile(false);

		setActiveFile(file);
	}

	return (
		<div className={css.files}>
			<table>
				<thead>
					<tr>
						<th>File</th>
						<th>Modified</th>
					</tr>
				</thead>
				<tbody>
					{files.map(file => (
						<tr
							key={file.name}
							className={classNames(
								css.row,
								activeFile && activeFile.name === file.name ? css.active : ''
							)}
							onClick={evt => switchFile(evt, file)}
						>
							<td className={css.file}>
								<div
									className={css.icon}
									dangerouslySetInnerHTML={{
										__html: TYPE_TO_ICON[file.type]
									}}
								></div>
								{getFileName(file)}
							</td>

							<td>
								{new Date(file.lastModified).toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

FilesTable.propTypes = {
	files: PropTypes.arrayOf(PropTypes.object),
	editFile: PropTypes.bool,
	activeFile: PropTypes.object,
	setActiveFile: PropTypes.func,
	setEditFile: PropTypes.func
};

function Previewer({ file, setEditFile }) {
	const [fileContent] = getFileContent(file);
	const fileName = getFileName(file);
	const fileType = getFileType(file);

	const renderPreviewer = () => {
		if (fileType === 'md') {
			return <MarkdownPreview file={file} />;

		}
		else if (fileType === 'txt') {
			return <div className={css.plainTxt}>{fileContent}</div>;
		}
		else {
			return <CodePreview file={file} />;
		}
	}

	return (
		<div className={css.preview}>
			<div className={css.title}>{fileName}</div>
			<div className={css.content}>
				{renderPreviewer()}
			</div>
			<button
				className={css.save}
				onClick={() => setEditFile(true)}>
				EDIT
			</button>
		</div>
	);
}

Previewer.propTypes = {
	file: PropTypes.object,
	setEditFile: PropTypes.func
};

function PlaintextFilesChallenge() {
	const [files, setFiles] = useState([]);
	const [editFile, setEditFile] = useState(false);
	const [activeFile, setActiveFile] = useState(null);

	useEffect(() => {
		const files = listFiles();
		setFiles(files);
	}, []);

	const write = updatedFile => {

		// Copy DataBase
		const newFiles = [...files];

		// Find index of updated file
		const updateFileIndx = newFiles.findIndex(currFile => currFile.name === updatedFile.name);

		// Update local files list
		newFiles[updateFileIndx] = updatedFile;

		// Set to original DataBase
		setFiles(newFiles);

		// TODO: Put the update into a LocalStorage to presist after page reload
	};

	const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

	return (
		<div className={css.page}>
			<Head>
				<title>Rethink Engineering Challenge</title>
			</Head>
			<aside>
				<header>
					<div className={css.tagline}>Rethink Engineering Challenge</div>
					<h1>Fun With Plaintext</h1>
					<div className={css.description}>
						Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
				</header>

				<FilesTable
					files={files}
					editFile={editFile}
					activeFile={activeFile}
					setActiveFile={setActiveFile}
					setEditFile={setEditFile}
				/>

				<div style={{ flex: 1 }}></div>

				<footer>
					<div className={css.link}>
						<a href="https://v3.rethink.software/jobs">Rethink Software</a>
						&nbsp;—&nbsp;Frontend Engineering Challenge
					</div>
					<div className={css.link}>
						Questions? Feedback? Email us at jobs@rethink.software
					</div>
				</footer>
			</aside>

			<main className={css.editorWindow}>
				{activeFile && (
					<>
						{editFile && <Editor file={activeFile} write={write} />}

						{!editFile && <Previewer file={activeFile} setEditFile={setEditFile} />}
					</>
				)}

				{!activeFile && (
					<div className={css.empty}>Select a file to view or edit</div>
				)}
			</main>
		</div>
	);
}

export default PlaintextFilesChallenge;
