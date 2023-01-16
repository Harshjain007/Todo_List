import {
  GET_LISTS,
  ADD_PARENT_LIST,
  ADD_CHILD_LIST,
  DELETE_TASK,
  DELETE_CHILD_TASK,
  ADD_ACTION_COMPLETE,
  ADD_ACTION_INCOMPLETE,
  ADD_CHILD_ACTION_COMPLETE,
  ADD_CHILD_ACTION_INCOMPLETE,
  EDIT_PARENT_TASK,
  EDIT_CHILD_TASK,
} from '../const'

export const getLists = () => {
  return { type: GET_LISTS }
}

export const addParentList = ({ name }) => {
  return { type: ADD_PARENT_LIST, payload: { name } }
}
export const deleteTask = ({ parentId }) => {
  return {
    type: DELETE_TASK,
    payload: { parentId },
  }
}
export const addChildList = ({ parentId, name }) => {
  return { type: ADD_CHILD_LIST, payload: { parentId, name } }
}
export const deleteChildTask = ({ parentId, childId }) => {
  return {
    type: DELETE_CHILD_TASK,
    payload: {
      parentId,
      childId,
    },
  }
}

export const addActionComplete = ({ parentId }) => {
  return { type: ADD_ACTION_COMPLETE, payload: { parentId } }
}

export const addActionInComplete = ({ parentId }) => {
  return { type: ADD_ACTION_INCOMPLETE, payload: { parentId } }
}

export const addChildActionComplete = ({ parentId, childId }) => {
  return { type: ADD_CHILD_ACTION_COMPLETE, payload: { parentId, childId } }
}

export const addChildActionInComplete = ({ parentId, childId }) => {
  return { type: ADD_CHILD_ACTION_INCOMPLETE, payload: { parentId, childId } }
}
export const editParentTask = ({parentId, newTaskName }) => {
  return { type: EDIT_PARENT_TASK, payload: {parentId, newTaskName}}
}
export const editChildTask = ({parentId, childId, newTaskName }) => {
  return { type: EDIT_CHILD_TASK, payload: {parentId, childId, newTaskName}}
}