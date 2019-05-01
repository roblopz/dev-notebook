/// <resources type="react" />
/// <resources type="draft-js" />

declare module "draft-js-plugins-editor" {
  export interface PluginsEditorProps extends Draft.EditorProps {
    plugins: Array<any>;
  }
  
  export default class PluginsEditor extends React.Component<PluginsEditorProps, Draft.EditorState> {}
  export function createEditorStateWithText(text: string): PluginsEditor;
  export function composeDecorators(...func: any[]): (...args: any[]) => any;
}