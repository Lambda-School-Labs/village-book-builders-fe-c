// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import { axiosWithAuth } from '../../utils/axiosWithAuth';

import * as actionTypes from './actionTypes';

export const checkToken = data => dispatch => {
  dispatch({
    type: actionTypes.AUTH_SUCCESS,
    payload: window.localStorage.getItem('token'),
  });
};

// -------------------------
// AUTHORIZATION
// -------------------------
export const login = data => dispatch => {
  axiosWithAuth()
    // will need to update this to baseURL, there seems to be a link issue with the .env file
    .post('/login', data)
    .then(res => {
      // console.log('LOGIN ACTION SUCCESS --> token', res.data);
      window.localStorage.setItem('token', res.data.accessToken);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.accessToken,
      });
    })
    .catch(err => {
      console.log('LOGIN ACTION FAILURE--> with this data:', data);
      console.dir(err);
    });
};

export const logout = () => dispatch => {
  dispatch({ type: actionTypes.AUTH_LOGOUT });
  window.localStorage.removeItem('token');
};

// -----------------------
// HEADMASTER
// -----------------------

export const editHeadmasterProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/headmasters/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replace's so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};
export const fetchHeadmasterProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/headmasters/${id}`) // change this later
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

export const fetchVillage = id => dispatch => {
  axiosWithAuth()
    .get(`/villages/${id}`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
    })
    .catch(err => console.dir(err));
};

export const fetchCalendar = (start, end) => dispatch => {
  dispatch({ type: actionTypes.FETCH_CALENDAR_START });
  axiosWithAuth()
    .get(
      `/sessions?start_gte=${start}&end_lte=${end}&expand=mentee&expand=mentor&expand=village&expand=library`
    )
    .then(res => {
      dispatch({ type: actionTypes.FETCH_CALENDAR_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_CALENDAR_FAILURE, payload: err })
    );
};

export const createCalendarEvent = event => dispatch => {
  dispatch({ type: actionTypes.CREATE_CALENDAR_EVENT, payload: event });
};

export const editCalendarEvent = event => dispatch => {
  dispatch({ type: actionTypes.EDIT_CALENDAR_EVENT, payload: event });
};

export const removeCalendarEvent = id => dispatch => {
  dispatch({ type: actionTypes.REMOVE_CALENDAR_EVENT, payload: id });
};

export const addCalendarSession = eventId => dispatch => {
  dispatch({ type: actionTypes.ADD_CALENDAR_SESSION, payload: eventId });
};

export const editVillage = (id, data) => () => {
  axiosWithAuth()
    .put(`/villages/${id}`, data)
    .then(() => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

// ----------------
// MENTEE
// ----------------

export const fetchMentees = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_START });
  axiosWithAuth()
    .get(`/mentees`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTEE_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_FAILURE, payload: err })
    );
};

export const addMentee = values => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_START });
  axiosWithAuth()
    .post(`/mentees`, values)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_AFTER_POST_SUCCESS,
        payload: { mentee: res.data, message: 'Successfully added mentee.' },
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_FAILURE, payload: err })
    );
};

export const deleteMentee = id => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_START });
  axiosWithAuth()
    .delete(`/mentees/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_AFTER_DELETE_SUCCESS,
        payload: {
          mentee: parseInt(id),
          message: 'Successfully deleted mentee.',
        },
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_FAILURE, payload: err })
    );
};

export const fetchMenteesByDateSearch = search => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_BY_DOB_START });
  axiosWithAuth()
    .get(`/mentees?dob=${search}`)
    .then(res => {
      console.log('inside the action', res.data);
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_DOB_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_DOB_FAILURE,
        payload: err,
      })
    );
};

export const editMenteeProfile = (id, data) => dispatch => {
  dispatch({ type: actionTypes.EDIT_MENTEE_PROFILE_START });
  axiosWithAuth()
    .put(`/mentees/${id}`, data)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_MENTEE_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.EDIT_MENTEE_PROFILE_FAILURE, payload: err })
    );
};

export const fetchMenteeProfile = id => dispatch => {
  //console.log('hols');
  dispatch({ type: actionTypes.FETCH_MENTEE_PROFILE_START });
  axiosWithAuth()
    .get(`/mentees/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_PROFILE_FAILURE, payload: err })
    );
};

export const fetchMenteesBySearch = search => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_START });
  axiosWithAuth()
    .get(`/mentees?last_name=${search}`)
    .then(res => {
      console.log('inside the action', res.data);
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_FAILURE,
        payload: err,
      })
    );
};

export const fetchStudentResources = () => dispatch => {
  axiosWithAuth()
    .get(`/resources`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_STUDENT_RESOURCES,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchSchools = () => dispatch => {
  axiosWithAuth()
    .get(`/schools`)
    .then(res => {
      // console.log("FETCH SCHOOLS:", res.data);
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_SCHOOLS,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log("FETCHSCHOOLS Failed")
      console.dir(err);
    });
};

export const fetchSchool = id => dispatch => {
  axiosWithAuth()
    .get(`/schools/${id}`)
    .then(res => {
      // console.log(res.data);
    })
    .catch(err => console.dir(err));
};

export const editSchool = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/schools/${id}`, data)
    .then(res => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchMentors = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTOR_START });
  axiosWithAuth()
    .get(`/mentors`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTOR_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTOR_FAILURE, payload: err })
    );
};

// ----------------
// ADMIN
// ----------------

export const editLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/libraries/${id}`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

export const addLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .post(`/libraries`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

// -----------------------
// TEACHER
// -----------------------

export const editTeacherProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/teachers/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replaces so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};

export const fetchTeacherProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/teachers/${id}`) // change this later
    .then(res => {
      console.log('fetchTeacherProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_TEACHER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

// -----------------------
// PROGRAM
// -----------------------

export const editProgramProfile = (id, data) => dispatch => {
  dispatch({ type: actionTypes.EDIT_PROGRAM_PROFILE_START });
  axiosWithAuth()
    .put(`/programs/${id}`, data)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_PROGRAM_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.EDIT_PROGRAM_PROFILE_FAILURE, payload: err })
    );
};

export const fetchProgramProfile = id => dispatch => {
  dispatch({ type: actionTypes.FETCH_PROGRAM_PROFILE_START });
  axiosWithAuth()
    .get(`/programs/${id}`) // change this later
    .then(res => {
      console.log('fetchProgramProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_PROGRAM_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_PROGRAM_PROFILE_FAILURE,
        payload: err,
      })
    );
};

export const hideModal = () => dispatch => {
  dispatch({ type: actionTypes.HIDE_MODAL });
};

export const showModal = () => dispatch => {
  dispatch({ type: actionTypes.SHOW_MODAL });
};
