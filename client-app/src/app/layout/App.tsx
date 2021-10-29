import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navBar';
import ActivitiesDashBoard from './../../features/activities/dashboard/ActivitiesDashBoard';
import LoadingComponent from './loadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import './style.css';


function App() {

  const { activityStore } = useStore();
  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


  if(activityStore.loadingInitial) return <LoadingComponent content='loading app'/>
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashBoard/>
        </Container>
    </>
  );
}

export default observer(App);
