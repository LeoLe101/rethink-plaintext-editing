import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import css from './style.css';
import { getFileContent, getFileName } from '../../utils/fileUtil';

function MarkdownPreview({ file }) {
  const [fileContent] = getFileContent(file);
  const fileName = getFileName(file);

  console.log(`MD Preview`);

  return (
    <div className={css.editor}>
      <div className={css.title}>{fileName}</div>

      {/* Editor */}
      <div className={css.content}>
        <ReactMarkdown source={fileContent} />
      </div>
    </div>
  );
}

MarkdownPreview.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownPreview;
