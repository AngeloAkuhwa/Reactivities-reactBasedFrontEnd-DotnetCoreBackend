import { Container } from 'semantic-ui-react';
import NavBar from './navBar';
import ActivitiesDashBoard from './../../features/activities/dashboard/ActivitiesDashBoard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import './style.css';
import HomePage from './../../features/home/Hompage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from './../../features/activities/details/ActivityDetails';


function App() {

  const location = useLocation();
    return (
      <>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Route exact path='/activities' component={ActivitiesDashBoard}/>
                <Route exact path='/activities/:id' component={ActivityDetails}/>
                <Route key={location.key} exact path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
              </Container>
            </>
          )}
        />
     
    </>
  );
}

export default observer(App);
