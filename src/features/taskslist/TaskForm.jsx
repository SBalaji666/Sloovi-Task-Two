import { useState } from 'react';
import { USERS } from '../../constants/consts';

import {
  useAddTodosMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../api/apiSlice';

const TaskForm = (props) => {
  const { hideForm, selectedTask, editForm, handleEdit, clearTask } = props;

  const [description, setDescription] = useState(selectedTask?.task_msg || '');
  const [date, setDate] = useState(selectedTask?.task_date || '');
  const [user, setUser] = useState(selectedTask?.assigned_user || '');
  const [time, setTime] = useState(
    selectedTask ? secondsToTime(selectedTask.task_time) : ''
  );

  const [addTodos, { isLoading }] = useAddTodosMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  function secondsToTime(seconds) {
    let date = new Date(seconds * 1000);
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();

    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;

    return `${hh}:${mm}`;
  }

  function timeToSeconds(time) {
    var a = time.split(':');
    let hh = +a[0] * 60 * 60;
    let mm = +a[1] * 60;

    return hh + mm;
  }

  function getTimeZone() {
    const date = new Date();
    const time = date.toTimeString().slice(0, 5);
    const timeZone = timeToSeconds(time);

    return timeZone;
  }

  const clearFields = () => {
    setDescription('');
    setDate('');
    setTime('');
    setUser('');
  };

  const handleClear = (e) => {
    e.preventDefault();

    clearFields();
    hideForm();
    clearTask();
    handleEdit(false);
  };

  const handleDelete = async () => {
    await deleteTodo(selectedTask);

    clearFields();
    hideForm();
    clearTask();
    handleEdit(false);
  };

  const canSave = [description, user, date, time].every(Boolean) && !isLoading;

  const handleFormSave = async () => {
    if (canSave) {
      const intialTask = {
        assigned_user: user,
        task_msg: description,
        task_date: date,
        task_time: timeToSeconds(time),
        is_completed: 0,
        time_zone: getTimeZone(),
      };

      if (!editForm) {
        const res = await addTodos(intialTask);
      } else {
        const res = await updateTodo({ id: selectedTask.id, task: intialTask });
      }

      clearFields();
      hideForm();
    } else {
      alert('please fill all the fields');
    }
  };

  return (
    <form
      className="text-dark p-3 "
      style={{ background: 'rgba(225 225 225)' }}
    >
      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">
          Task Description
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Follow up"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row mb-3">
        <div className="form-group col-6">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            className="form-control form-control-sm"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group col-6">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            className="form-control form-control-sm"
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user" className="form-label">
          Assign User
        </label>
        <select
          name="user"
          id="user"
          className="form-select form-select-sm"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="choose...">Choose...</option>
          {USERS.map((user) => (
            <option key={user.user_id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons d-flex justify-content-between">
        {editForm && (
          <span onClick={handleDelete} className="btn text-danger ">
            <i className="fas fa-trash "></i>
          </span>
        )}

        <div className="ms-auto">
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-transparent me-2"
          >
            cancel
          </button>

          <button
            type="button"
            onClick={handleFormSave}
            className="btn btn-success btn-sm px-4 add-save"
          >
            save
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
