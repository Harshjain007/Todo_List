import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTask,
  addChildList,
  deleteChildTask,
  addActionComplete,
  addActionInComplete,
  addChildActionComplete,
  addChildActionInComplete,
  editParentTask,
  editChildTask,
} from '../actions/list'
import { styled } from '@mui/material/styles'

import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faEdit, faExchangeAlt, faTrash, faWindowClose, 
} from '@fortawesome/fontawesome-free-solid'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}
export const useStyles = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));


const EditTasks = () => {
  const [newTask, setNewTask] = useState('')
  const [newId, setNewId] = useState('')
  const [newChildId, setNewChildId] = useState('')
  const dispatch = useDispatch()
  const lists = useSelector((state) => state.rootReducers.reducer.lists)

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
      setOpen(false);
  };

  const [expanded, setExpanded] = useState()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <>
    {lists.map((parentTaskList) => {
      return (
        <>
    <IconButton aria-label="edit" 
    onClick={(e) => {
      console.log(parentTaskList.id)
      setNewTask(parentTaskList.name)
      setNewId(parentTaskList.id)
      setOpen(true)
      }} >
      <FontAwesomeIcon icon={faEdit} style={{ maxWidth: '18px' }} />
    </IconButton>
    <IconButton
      aria-label="delete"
      onClick={() => {
        console.log(parentTaskList.id)
        dispatch(deleteTask({ parentId: parentTaskList.id }))
      }}
    >
    <FontAwesomeIcon
            icon={faTrash}
            style={{ maxWidth: '15px' }}
          />
    </IconButton>
    
  {/* Modal for editing Parents Tasks   */}

  <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
  >
      <div style={modalStyle} className={classes.paper}>
        
        <TextField
          value={newTask}
          onChange={(e) => {
            console.log(newId)
            setNewTask(e.target.value);
          }} 
        />
        <br/>
        {/* Update Button  */}
      <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="small"
          onClick={(e) =>
          {
          e.preventDefault()
          handleClose()
          dispatch(editParentTask({
          parentId: newId,
          newTaskName: newTask}))
          
          }
          }
        >
          Update
          <FontAwesomeIcon
            icon={faExchangeAlt}
            style={{ maxWidth: '25px', paddingLeft: '5px' }}
          />
        </Button>
        {/* Cancel Button  */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="small"
          onClick={handleClose}
        >
          Cancel
          <FontAwesomeIcon
            icon={faWindowClose}
            style={{ maxWidth: '25px', paddingLeft: '5px' }}
          />
        </Button>
  </div>
  </Modal>
  </>
      )
      })}
  </>
  )
}

export default EditTasks