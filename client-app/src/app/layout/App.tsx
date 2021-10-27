import React, {useState, useEffect, Fragment} from 'react';
// import logo from './logo.svg';
import './style.css';
import { Container } from 'semantic-ui-react';
import { Activity } from './../Models/activity';
import NavBar from './navBar';
import ActivitiesDashBoard from './../../features/activities/dashboard/ActivitiesDashBoard';
import { v4 as uuid } from 'uuid';
import agent from './../api/agent';
import LoadingComponent from './loadingComponents';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
  }
    
  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }
  useEffect(() => {
agent.Activities.list().then(response => {
      console.log(response);
  let activities: Activity[] = [];
  response.forEach(activity => {
    activity.date = activity.date.split('T')[0];
    activities.push(activity);
  })
  setActivities(activities);
  setLoading(false);
    })
  }, []);

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      setActivities([...activities, activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
    }
   
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);

    })
  }

  if(loading) return <LoadingComponent content='loading app'/>
  return (
    <>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop:"7em"}}>
        <ActivitiesDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
        </Container>
    </>
  );
}

export default App;
