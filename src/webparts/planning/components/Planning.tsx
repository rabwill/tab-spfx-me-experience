import * as React from 'react';
import styles from './Planning.module.scss';
import { IPlanningProps } from './IPlanningProps';
import { Agenda, Todo ,FileList} from '@microsoft/mgt-react/dist/es6/spfx';
import { Customizer } from 'office-ui-fabric-react';
import MgtEvent from '../../../common/components/Event';


export interface IPlanningState {
  days: string;
}

export default class Planning extends React.Component<IPlanningProps, IPlanningState> {
  constructor(props) {
    super(props);
    this.state = {
    days:""
    };
  }
  public componentDidMount() {
    // Initial data load
    this.props.graphService._getSchemaExtension("MeSettings")
      .then((value: any) => {
       
              this.setState({
          days:value.Settings.agendaDays?value.Settings.agendaDays:null
        });
      });
    }
  public render(): React.ReactElement<IPlanningProps> {
    const { displayName, loginName } = this.props;
    const days=this.state.days?parseInt(this.state.days):10;
    return (
      <Customizer settings={{ theme: this.props.themeVariant }}>
      <div className={styles.planning}>
        <div className={styles.felxColumn} >
        <div className={styles.webpartTitle}>My upcoming events for {days} days</div>
          <Agenda showMax={7} days={days}>
            <MgtEvent template="event" />
          </Agenda>
        </div>

        <div className={styles.felxColumn} >
        <div className={styles.webpartTitle}>My todos</div>
          <Todo data-source="me/todo/lists/tasks/tasks"></Todo>
        </div>

        <div className={styles.felxColumn}>
        <div className={styles.webpartTitle}>My recently used documents</div>
        <FileList  file-list-query="me/insights/used?filter=resourceVisualization/containerType eq 'Site'" />
         
        </div>
      </div>
      </Customizer>
    );
  }
}
