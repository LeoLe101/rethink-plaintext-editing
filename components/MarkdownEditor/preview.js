import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import css from './style.css';
import { getFileContent } from '../../utils/fileUtil';

function MarkdownPreview({ file }) {
  const [fileContent] = getFileContent(file);

  return (
    <div className={css.previewer}>
      <ReactMarkdown
        source={fileContent}
        className={css.highlighter}
      />
    </div>
  );
}

MarkdownPreview.propTypes = {
  file: PropTypes.object
};

export default MarkdownPreview;
