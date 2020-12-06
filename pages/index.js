import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { listFiles } from '../files';

// Register Editor and Preview
import CodeEditor from '../components/CodeEditor';
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';
import CodePreview from '../components/CodeEditor/preview';
import MarkdownPreview from '../components/MarkdownEditor/preview';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';
import { getFileContent, getFileName } from '../utils/fileUtil';

const TYPE_TO_ICON = {
	'text/plain': IconPlaintextSVG,
	'text/markdown': IconMarkdownSVG,
	'text/javascript': IconJavaScriptSVG,
	'application/json': IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
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
							onClick={() => setActiveFile(file)}
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
	activeFile: PropTypes.object,
	setActiveFile: PropTypes.func
};

const REGISTERED_PREVIEWER = {
	"text/markdown": MarkdownPreview,
	"text/javascript": CodePreview,
	"application/json": CodePreview
}

function Previewer({ file }) {
	const [value] = getFileContent(file);
	const [activeFile, setActiveFile] = useState(null);

	// TODO: Remove Later
	//   useEffect(() => {
	//     (async () => {
	//       setValue(await file.text());
	//     })();
	//   }, [file]);

	const Preview = activeFile ? REGISTERED_PREVIEWER[activeFile.type] : value;

	const getPreviewer = () => {
		if (Preview !== value)
			return (<Preview file={file} />);
		else
			return value
	}

	return (
		<div className={css.preview}>
			<div className={css.title}>{getFileName(file)}</div>
			<div className={css.content}>
				{getPreviewer()}
			</div>
		</div>
	);
}

Previewer.propTypes = {
	file: PropTypes.object
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
	"text/plain": PlaintextEditor,
	"text/markdown": MarkdownEditor,
	"text/javascript": CodeEditor,
	"application/json": CodeEditor
};

function PlaintextFilesChallenge() {
	const [files, setFiles] = useState([]);
	const [editedFiles, editFiles] = useState([]);
	const [activeFile, setActiveFile] = useState(null);

	useEffect(() => {
		const files = listFiles();
		setFiles(files);
	}, []);

	const write = updatedFile => {
		const newFiles = [...files];
		// newFiles[indexOfCurrFile] = updatedFile; 

		console.log(`Writing File: ${newFiles}`);
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
					activeFile={activeFile}
					setActiveFile={setActiveFile}
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
						{Editor && <Editor file={activeFile} write={write} />}

						{!Editor && <Previewer file={activeFile} />}
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
