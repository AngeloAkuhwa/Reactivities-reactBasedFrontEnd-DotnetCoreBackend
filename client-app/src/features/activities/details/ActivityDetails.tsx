import { observer } from 'mobx-react-lite';
import React, {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/loadingComponents';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    
    const { id } = useParams<{id:string}>();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent/>;

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
            <Button as={Link} to={`/manage/${activity.id}`}  basic content='Edit' color='blue'/>
            <Button as={Link} to='/activities' basic content='Cancel' color='grey'/>
        </Card.Content>
  </Card>
    )
})