// Register Editor and Preview
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';
import CodeEditor from '../components/CodeEditor';

// Icon
import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

const TYPE_TO_ICON = {
	'txt': IconPlaintextSVG,
	'md': IconMarkdownSVG,
	'js': IconJavaScriptSVG,
	'json': IconJSONSVG
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
    "text/plain": PlaintextEditor,
    "text/markdown": MarkdownEditor,
    "text/javascript": CodeEditor,
    "application/json": PlaintextEditor
};

export {
    REGISTERED_EDITORS,
    TYPE_TO_ICON
}


