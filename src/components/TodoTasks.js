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

const TodoTasks = () => {
  const [newTask, setNewTask] = useState('')
  const [newId, setNewId] = useState('')
  const [newChildId, setNewChildId] = useState('')
  const dispatch = useDispatch()
  const [subTask, setSubTask] = useState('')
  const [completed, setCompleted] = useState(false)
  const [childCompleted, setChildCompleted] = useState(false)
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
    <div>
      {/* Main Tasks Display  */}
      {lists.map((parentTaskList) => {
        return (
          <>
            <Card key={parentTaskList.id} sx={{ width: 300, minHeight: 20 }}>
              <CardContent>
                <FormControlLabel
                  label={parentTaskList.name}
                  control={
                    <Checkbox
                      checked={parentTaskList.completed}
                      onClick={(e) => {
                        e.preventDefault()
                        setCompleted(!completed)
                        !parentTaskList.completed
                          ? dispatch(
                              addActionComplete({
                                parentId: parentTaskList.id,
                              })
                            )
                          : dispatch(
                              addActionInComplete({
                                parentId: parentTaskList.id,
                              })
                            )
                      }}
                    />
                  }
                />
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
                
              </CardContent>
              {/* Child Tasks Sections */}
              <CardActions disableSpacing>
                <Typography paragraph className="fclass">
                  {/* {complete} of {count} completed{' '} */}
                  Sub-Tasks
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {parentTaskList.sublist.map((childTaskList) => {
                  return (
                    <CardContent>
                      <FormControlLabel
                        label={childTaskList.name}
                        control={
                          <Checkbox
                            checked={childTaskList.completed}
                            onClick={(e) => {
                              e.preventDefault()
                              setChildCompleted(!childCompleted)
                              !childTaskList.completed
                                ? dispatch(
                                    addChildActionComplete({
                                      parentId: parentTaskList.id,
                                      childId: childTaskList.id,
                                    })
                                  )
                                : dispatch(
                                    addChildActionInComplete({
                                      parentId: parentTaskList.id,
                                      childId: childTaskList.id,
                                    })
                                  )
                            }}
                          />
                        }
                      />
          {/* Edit child button  */}
          <IconButton aria-label="edit" 
            onClick={(e) => {
             
              console.log(childTaskList.id)
              console.log(childTaskList.name)
              console.log(parentTaskList.id)
              setNewTask(childTaskList.name)
              setNewId(parentTaskList.id)
              setNewChildId(childTaskList.id)
              setOpen(true)
              }} >
              <FontAwesomeIcon icon={faEdit} style={{ maxWidth: '18px' }} />
            </IconButton>

            {/* Delete child button  */}
            <IconButton
              aria-label="delete"
              onClick={() => {
                dispatch(
                  deleteChildTask({
                    parentId: parentTaskList.id,
                    childId: childTaskList.id,
                  })
                )
              }}
            >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ maxWidth: '15px' }}
            />
            </IconButton>
            
          {/* Modal for editing Child Tasks   */}

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
                  dispatch(editChildTask({
                    parentId:newId,
                    childId: newChildId,
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
 
          </CardContent>
                  )
                })}
                <CardContent>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '18ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault()
                      dispatch(
                        addChildList({
                          parentId: parentTaskList.id,
                          name: subTask,
                        }),
                        setSubTask('')
                      )
                    }}
                  >
                    <Tooltip
                      title="Tasks Should be of 30 Characters Only!"
                      placement="top"
                    >
                      <TextField
                        id="outlined-name"
                        color="success"
                        label="Sub-Tasks"
                        value={subTask}
                        onChange={(e) => setSubTask(e.target.value)}
                      />
                    </Tooltip>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </>
        )
      })}
    </div>
  )
}

export default TodoTasks
