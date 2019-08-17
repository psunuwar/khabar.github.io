import React from 'react'
import { RouteComponentProps } from 'react-router'
import {
  IonSpinner,
  IonContent,
  IonHeader,
  IonTitle,
  IonItem,
  IonLabel,
  IonToolbar,
  IonAvatar,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButtons,
  IonMenuButton,
} from '@ionic/react'
import { arrowDropup, chatboxes } from 'ionicons/icons'

import { useGlobalState } from '../state'
import timeAgo from '../utils/timeAgo'

type Props = RouteComponentProps<{}> & {
  path: any
  title: string
}

const TabContent: React.FunctionComponent<Props> = ({ path, title }) => {
  const [data] = useGlobalState(path)
  const [loading] = useGlobalState('loading')
  type Entry = typeof data[0]
  return (
    <>
      <IonHeader>
        <IonToolbar className={path}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          {loading && <IonSpinner name="dots" slot="end" duration={30} />}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.map((x: Entry) => (
          <IonCard key={x._id} className={path}>
            <IonCardHeader className="p-0">
              <IonItem
                button
                onClick={() => window.open(x.source.targetUrl, '_system')}
                lines="none"
              >
                <IonAvatar className="favicon" slot="start">
                  <img
                    alt={x.source.displayName}
                    src={`https://www.google.com/s2/favicons?domain=${x.source.targetUrl}`}
                  />
                </IonAvatar>

                <IonLabel className="item-text">
                  <h2>{x.title}</h2>
                  {x.description && <p>{x.description}</p>}
                </IonLabel>
              </IonItem>
            </IonCardHeader>

            <IonCardContent className="item-footer">
              <a
                hidden={path === 'medium'}
                className="sub-link"
                href={x.source.sourceUrl}
                target="_system"
                rel="noopener noreferrer"
              >
                {x.source.likesCount}
                <IonIcon icon={arrowDropup.md} className="up-arrow" />
                {x.source.commentsCount}
                <IonIcon style={{ marginLeft: '.15em' }} icon={chatboxes.md} />
              </a>
              {` ${timeAgo(x.source.createdAt)} by `}
              <a
                className="sub-link"
                href={
                  path === 'reddit'
                    ? `https://reddit.com/u/${x.source.username}`
                    : x.source.authorUrl
                }
                target="_system"
                rel="noopener noreferrer"
              >
                {x.source.authorName || x.source.username}
              </a>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </>
  )
}

export default React.memo(TabContent)