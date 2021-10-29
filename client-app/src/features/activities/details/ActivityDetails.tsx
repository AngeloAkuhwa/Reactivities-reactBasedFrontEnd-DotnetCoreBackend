import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/loadingComponents';
import { useStore } from '../../../app/stores/store';


export default function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;
    
    if (!activity) return <LoadingComponent/>;

    return (
        
  <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
            <Card.Header>{ activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button  basic onClick={()=> openForm(activity.id)} content='Edit' color='blue'/>
            <Button basic onClick={cancelSelectedActivity} content='Cancel' color='grey'/>
        </Card.Content>
  </Card>
    )
}