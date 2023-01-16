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
import { findParentIndex, findChildIndex } from '../utils/helper'
const initialStates = {
  lists: [],
}

const random = () => {
  return Math.random().toString(36).substr(2, 3)
}

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        lists: state.lists,
      }

    //Reducers for parents

    case ADD_PARENT_LIST:
      const item = {
        id: random(),
        name: action.payload.name,
        completed: false,
        sublist: [],
      }
      return {
        ...state,

        lists: [...state.lists, item],
      }

    case DELETE_TASK:
      const parentIdIndex = state.lists.findIndex(
        (data) => data.id === action.payload.parentId
      )
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, parentIdIndex),
          ...state.lists.slice(parentIdIndex + 1),
        ],
      }

    case ADD_ACTION_COMPLETE:
      const parentIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })

      state.lists[parentIndex] = {
        ...state.lists[parentIndex],
        completed: !state.lists[parentIndex].completed,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case ADD_ACTION_INCOMPLETE:
      const parentIndexIn = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })

      state.lists[parentIndexIn] = {
        ...state.lists[parentIndexIn],
        completed: false,
      }

      return {
        lists: state.lists,
      }

    // Reducers for sublist / child
    case ADD_CHILD_LIST:
      const parentOfChilIdIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      state.lists[parentOfChilIdIndex].sublist.push({
        id: random(),
        name: action.payload.name,
        completed: false,
      })
      return {
        lists: state.lists,
      }

    case DELETE_CHILD_TASK:
      const parentOfChildsIdIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      const childIndex = findChildIndex({
        lists: state.lists,
        parentIndex: parentOfChildsIdIndex,
        id: action.payload.childId,
      })
      state.lists[parentOfChildsIdIndex].sublist = {
        ...state.lists[parentOfChildsIdIndex].sublist.slice(0, childIndex),
        ...state.lists[parentOfChildsIdIndex].sublist.slice(childIndex + 1),
      }

      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_COMPLETE:
      const parentsChildIdsIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      const childIndexC = findChildIndex({
        lists: state.lists,
        parentIndex: parentsChildIdsIndex,
        id: action.payload.childId,
      })
      state.lists[parentsChildIdsIndex].sublist[childIndexC] = {
        ...state.lists[parentsChildIdsIndex].sublist[childIndexC],
        completed: true,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case ADD_CHILD_ACTION_INCOMPLETE:
      const parentsChildidIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      const childIndexI = findChildIndex({
        lists: state.lists,
        parentIndex: parentsChildidIndex,
        id: action.payload.childId,
      })
      state.lists[parentsChildidIndex].sublist[childIndexI] = {
        ...state.lists[parentsChildidIndex].sublist[childIndexI],
        completed: false,
      }
      return {
        ...state,
        lists: state.lists,
      }

    case EDIT_PARENT_TASK:
      console.log(action.payload.parentId)
      const parentidIndex = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      console.log(parentidIndex)
      state.lists[parentidIndex] = {
        ...state.lists[parentidIndex],
        name: action.payload.newTaskName,   
      }
      return{
        ...state,
        lists: state.lists,
      }

    case EDIT_CHILD_TASK:
      const parentidIndeC = findParentIndex({
        lists: state.lists,
        id: action.payload.parentId,
      })
      const childIndeC = findChildIndex({
        lists: state.lists,
        parentIndex: parentidIndeC,
        id: action.payload.childId,
      })
      
      console.log(childIndeC);

      console.log(action.payload.newTaskName)
      state.lists[parentidIndeC].sublist[childIndeC] = {
        ...state.lists[parentidIndeC].sublist[childIndeC],
        name: action.payload.newTaskName, 
      }
      return{
        ...state,
        lists: state.lists,
      }

      default:
      return state
  }
}
export default reducer
