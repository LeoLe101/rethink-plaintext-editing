// Register Editor and Preview
import CodeEditor from '../components/CodeEditor';
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';

// Icon
import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
    "text/plain": PlaintextEditor,
    "text/markdown": MarkdownEditor,
    "text/javascript": PlaintextEditor,
    "application/json": CodeEditor
};

const TYPE_TO_ICON = {
    'text/plain': IconPlaintextSVG,
    'text/markdown': IconMarkdownSVG,
    'text/javascript': IconJavaScriptSVG,
    'application/json': IconJSONSVG
};

export {
    REGISTERED_EDITORS,
    TYPE_TO_ICON
}


