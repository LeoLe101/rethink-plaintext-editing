import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { listFiles } from '../files';
import css from './style.module.css';
import { REGISTERED_EDITORS } from '../utils/Constant';

import FilesTable from '../components/FilesTable';
import Previewer from '../components/Previewer';
import DataTable from '../components/DataTable';

function PlaintextFilesChallenge() {
	const [files, setFiles] = useState([]);
	const [editFile, setEditFile] = useState(false);
	const [dataTable, setDataTable] = useState(false);
	const [activeFile, setActiveFile] = useState(null);

	useEffect(() => {
		const files = listFiles();
		setFiles(files);
	}, []);

	const openDataList = () => {
		// Disable current editing
		if (editFile)
			setEditFile(false);
		setActiveFile(null);
		setDataTable(true);
	}

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

				<div style={{ flex: 1 }}>
					<button
						className={css.dataButton}
						onClick={() => openDataList()}
					>
						Data List
					</button>
				</div>

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
					<>
						{!dataTable && <div className={css.empty}>Select a file to view or edit</div>}

						{dataTable && <DataTable />}
					</>
					
				)}
			</main>
		</div>
	);
}

export default PlaintextFilesChallenge;
