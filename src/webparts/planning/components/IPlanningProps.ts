import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IGraphServices } from '../../../services/IGraphServices';
export interface IPlanningProps {
  loginName: string;
  displayName:string;
  themeVariant: IReadonlyTheme | undefined;
  graphService:IGraphServices;
}
