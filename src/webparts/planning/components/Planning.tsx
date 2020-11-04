import * as React from 'react';
import styles from './Planning.module.scss';
import { IPlanningProps } from './IPlanningProps';
import { Agenda, Tasks, Get, MgtTemplateProps } from 'mgt-react';
import {
  DocumentCard,
  DocumentCardDetails,  
  DocumentCardTitle,
  
  DocumentCardType,
  IconButton,
  initializeIcons
} from 'office-ui-fabric-react';
import { Icon } from '@fluentui/react';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import Moment from 'react-moment';
initializeIcons();


const MyFiles = (props: MgtTemplateProps) => {
  const { value } = props.dataContext;  
  return (<div><ul>
    {value.map(f => {
      return (<div><li className={styles.documentList}>
        {f.name &&
          <DocumentCard className={styles.documentCard}
            aria-label={f.name}
            type={DocumentCardType.compact}
            onClickHref={f.webUrl}
          >
            <Icon {...getFileTypeIconProps({ extension: f.name.split('.')[1], size: 48, imageFileType: 'png' })} />
            <DocumentCardDetails>
              <DocumentCardTitle title={f.name.split('.')[0]} >              
              </DocumentCardTitle>
           
              <span className={styles.dateModified}>  
               <IconButton iconProps={{ iconName: 'DateTimeMirrored' }} title="Last modified" ariaLabel="Last modified" />
                 <Moment toNow>{f.fileSystemInfo.lastModifiedDateTime}</Moment></span>
            </DocumentCardDetails>
            <div className={styles.documentDivider}></div>
          </DocumentCard>
         
        }
      </li> </div>)
    })
    }
  </ul>
  </div>)
};

export default class Planning extends React.Component<IPlanningProps, {}> {
  public render(): React.ReactElement<IPlanningProps> {
    return (
      <div className={styles.planning}>
        <Agenda></Agenda>
        <Tasks data-source="todo"></Tasks>
        <Get resource="/me/drive/recent" maxPages={1} >
          <MyFiles template="default" />
        </Get>
      </div>
    );
  }
}
