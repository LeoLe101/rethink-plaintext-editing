import React from 'react';
import css from './style.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TYPE_TO_ICON } from '../../utils/Constant';
import { getFileName } from '../../utils/fileUtil';

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
export default FilesTable;