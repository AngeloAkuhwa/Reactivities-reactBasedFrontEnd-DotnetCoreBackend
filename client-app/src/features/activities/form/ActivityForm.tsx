import { observer } from 'mobx-react-lite';
import React, { useState, useEffect} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/loadingComponents';
import { useStore } from './../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './../../../app/common/form/MyTextInputs';
import MyTextArea from './../../../app/common/form/MyTextArea';
import MySelectInput from './../../../app/common/form/MySelectInput';
import { categoryOptions } from './../../../app/common/options/CategoryOptions';
import MyDateInput from './../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/Models/activity';



export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const {  createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: '',
    });
    const validationSchema = Yup.object({
        title: Yup.string().required('the activity title is required'),
        description: Yup.string().required('the activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required()       
    })

useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
}, [id, loadActivity])


    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`) )
        }
        else {
            updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
        }
       
    }

    // function handleChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value });
    // }

if(loadingInitial) return <LoadingComponent content='loading activity...'/>
    return (
        <Segment clearing>
            <Header sub content='Activity Details' color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({  handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                       <MyTextInput name='title' placeHolder='Title'/>
                        <MyTextArea rows={3} placeHolder='Description'name='description'/>
                        <MySelectInput options={categoryOptions} placeHolder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMm d, yyyy h:mm aa'
                        />

                        <Header sub content='Location Details' color='teal' />
                        
                        <MyTextInput placeHolder='City' name='city'/>
                        <MyTextInput placeHolder='Venue' name='venue'/>
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})