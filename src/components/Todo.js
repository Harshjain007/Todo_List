import React, { useState } from 'react'
import '../styles.css'
import TodoTasks from './TodoTasks'
import { useDispatch } from 'react-redux'
import { addParentList } from '../actions/list'
import { Box, Button, TextField, Tooltip } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
const Todo = () => {
  const [task, setTask] = useState('')
  const dispatch = useDispatch()

  return (
    <>
      <div style={{ paddingBottom: '20px' }}>
        {/* Main Tasks form */}
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(addParentList({ name: task }), setTask(''))
          }}
        >
          <Tooltip
            title="Tasks Should be of 30 Characters Only!"
            placement="top"
          >
            <TextField
              id="outlined-name"
              color="success"
              label="Tasks"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Tooltip>

          <br />

          <Button
            type="submit"
            variant="contained"
            color="success"
            size="small"
            disabled={!task}
          >
            Add
            <FontAwesomeIcon
              icon={faPlus}
              style={{ maxWidth: '25px', paddingLeft: '5px' }}
            />
          </Button>
        </Box>
      </div>
      <TodoTasks />
    </>
  )
}
export default Todo
