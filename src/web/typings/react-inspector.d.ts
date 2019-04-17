/// <resources type="react" />

declare module "react-inspector" {
  export interface InspectorProps {
    data: any;
    theme?: any;
  }

  export default class Inspector 
      extends React.Component<InspectorProps> {}
}