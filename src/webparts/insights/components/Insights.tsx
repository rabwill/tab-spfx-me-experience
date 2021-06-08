import * as React from 'react';
import styles from './Insights.module.scss';
import { IInsightsProps } from './IInsightsProps';
import { FileList } from '@microsoft/mgt-react/dist/es6/spfx';
import { Customizer } from 'office-ui-fabric-react';

export interface IInsightsState {
  
}
export default class Insights extends React.Component<IInsightsProps,IInsightsState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
    public render(): React.ReactElement<IInsightsProps> {  
    const { displayName, loginName } = this.props;
    return (
      <Customizer settings={{ theme: this.props.themeVariant }}>
      <div className={styles.insights}>              
        <div  className={styles.felxColumn}>
          <div className={styles.webpartTitle}>Trending around me</div>
         
          <FileList  file-list-query="/me/insights/trending" />
         
        </div>

        <div className={styles.felxColumn}>
          <div className={styles.webpartTitle} >Shared with me</div>
         
          <FileList  file-list-query="/me/insights/shared" />
        </div>
        <div className={styles.felxColumn}>
          <div  className={styles.webpartTitle}>Viewed and modified by me</div>
        
          <FileList  file-list-query="/me/insights/used" />
         
        </div>
      </div>
      </Customizer>
    );
  }
}
