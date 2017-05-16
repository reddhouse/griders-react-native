import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  // const currentUser = firebase.auth().currentUser;
  const { currentUser } = firebase.auth();


  // In the first version of this action creator, we didn't even really need to
  // create or return an action object because Firebase is a real-time database,
  // and there is nothing left to do after pushing to it. So, we could use
  // redux-thunk to fade into nothingness
  // return () => {
  //   firebase.database().ref(`/users/${currentUser.uid}/employees`)
  //     .push({ name, phone, shift });
  // };

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        // Dispatch an action that will reset all of the fields in our form
        dispatch({ type: EMPLOYEE_CREATE });
        // Navigate back to employee list
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
      // Note, the on value action creator is "persistent", we only need to call
      // employeesFetch one time, and for the rest of this application it will
      // call the snapshot fat arrow function, anytime new data comes across.
      // Firebase and Redux play very nicely in this regard.
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
