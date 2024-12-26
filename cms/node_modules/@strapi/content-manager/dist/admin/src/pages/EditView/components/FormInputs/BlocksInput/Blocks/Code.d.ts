import { BaseRange, NodeEntry } from 'slate';
import { type BlocksStore } from '../BlocksEditor';
import 'prismjs/themes/prism-solarizedlight.css';
import './utils/prismLanguages';
type BaseRangeCustom = BaseRange & {
    className: string;
};
export declare const decorateCode: ([node, path]: NodeEntry) => BaseRangeCustom[];
declare const codeBlocks: Pick<BlocksStore, 'code'>;
export { codeBlocks };
