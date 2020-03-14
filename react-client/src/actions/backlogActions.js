import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';

export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {
    try {        
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`) 
        dispatch({
            type: GET_ERRORS,
            payload:{}
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const getBacklog = backlog_id => async dispatch => {
    try {        
        const response = await axios.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const getProjectTask = (backlog_id, pt_sequence, history) => async dispatch =>{
    try {
        const response = await axios.get(`/api/backlog/${backlog_id}/${pt_sequence}`)
        dispatch({
            type: GET_PROJECT_TASK,
            payload: response.data
        })
    } catch (error) {
        history.push("/dashboard");
    }
}

export const updateProjectTask = (backlog_id, pt_sequence, project_task, history)=>async dispatch=>{
    try {
        await axios.patch(`/api/backlog/${backlog_id}/${pt_sequence}`, project_task)
        history.push( `/projectBoard/${backlog_id}`)
        dispatch({
            type:GET_ERRORS,
            payload:{}
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        }) 
    }
}

export const deleteProjectTask = (backlog_id, pt_sequence) =>async dispatch=>{
    if (window.confirm(`You are deleting project task ${pt_sequence}, this action cannot be undone`)) {
        await axios.delete(`/api/backlog/${backlog_id}/${pt_sequence}`)
        dispatch({
            type:DELETE_PROJECT_TASK,
            payload:pt_sequence
        })
    }
}