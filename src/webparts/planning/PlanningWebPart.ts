import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from "@microsoft/decorators";
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PlanningWebPartStrings';
import Planning from './components/Planning';
import { IPlanningProps } from './components/IPlanningProps';
import { Providers, SharePointProvider } from '@microsoft/mgt';
export interface IPlanningWebPartProps {
  description: string;
}

export default class PlanningWebPart extends BaseClientSideWebPart<IPlanningWebPartProps> {


  protected async  onInit(): Promise<void> {
    Providers.globalProvider = new SharePointProvider(this.context);
  
  }
  
  public render(): void {
    const element: React.ReactElement<IPlanningProps> = React.createElement(
      Planning,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
