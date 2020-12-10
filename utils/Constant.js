// Register Editor and Preview
import PlaintextEditor from '../components/PlaintextEditor';
import CodeEditor from '../components/CodeEditor';

// Icon
import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';
import IconTeaSVG from '../public/icon-tea.svg';

const TYPE_TO_ICON = {
    'text/plain': IconPlaintextSVG,
    'text/markdown': IconMarkdownSVG,
    'text/javascript': IconJavaScriptSVG,
    'application/json': IconJSONSVG,
    'tea': IconTeaSVG,
};

const REGISTERED_EDITORS = {
    "text/plain": PlaintextEditor,
    "text/markdown": CodeEditor,
    "text/javascript": CodeEditor,
    "application/json": CodeEditor,
};

const API_BASE = 'http://localhost:8080/api';
const API_ROUTES = {
    Url: `${API_BASE}/url`,
    Search: `${API_BASE}/search`,
}

export {
    REGISTERED_EDITORS,
    TYPE_TO_ICON,
    API_ROUTES
}


