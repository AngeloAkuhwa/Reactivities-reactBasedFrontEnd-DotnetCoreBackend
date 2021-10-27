import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from './../../../app/Models/activity';

interface Props{
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}
export default function ActivityDetails({activity, cancelSelectActivity, openForm}:Props) {
    
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
            <Button basic onClick={cancelSelectActivity} content='Cancel' color='grey'/>
        </Card.Content>
  </Card>
    )
}