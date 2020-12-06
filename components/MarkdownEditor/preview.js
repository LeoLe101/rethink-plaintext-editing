import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import css from './style.css';
import { getFileContent } from '../../utils/fileUtil';

function MarkdownPreview({ file }) {
  const [fileContent] = getFileContent(file);

  console.log(`MD Preview: ${file}`);
  
  return (
    <div className={css.editor}>
      <ReactMarkdown source={fileContent} />
    </div>
  );
}

MarkdownPreview.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownPreview;
