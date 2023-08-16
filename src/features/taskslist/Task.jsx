import React from "react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import { useGetTodosQuery } from "../api/apiSlice";

const Task = () => {
  const { data: tasks, isSuccess } = useGetTodosQuery();

  const [formState, setFormState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [select, setSelect] = useState(null);

  const handleForm = () => {
    setFormState((prevState) => !prevState);
  };

  const handleEdit = (state) => {
    setEditState(state);
  };

  const getSelectedTask = (task) => {
    setSelect(task);
  };

  const clearSelectedTask = () => {
    setSelect(null);
  };

  if (isSuccess) {
    return (
      <>
        <div className="rounded rounded-1 col-lg-5 col-sm-8 col-10 py-5">
          <h3 className="text-info">Todo List</h3>
          <div className="input-group ">
            <button
              type="button"
              className="form-control rounded-0 text-start "
            >
              {`Tasks ${tasks.results.length}`}
            </button>

            <button
              type="button"
              className="input-group-text  rounded-0"
              onClick={() => {
                setFormState(true);
                handleEdit(false);
              }}
            >
              <i className="fas fa-plus "></i>
            </button>
          </div>

          {formState && (
            <TaskForm
              tasks={tasks.results}
              selectedTask={select}
              editForm={editState}
              hideForm={handleForm}
              clearTask={clearSelectedTask}
              handleEdit={handleEdit}
            />
          )}

          <ul className="list-unstyled">
            {!formState && (
              <TaskList
                tasks={tasks.results}
                handleForm={handleForm}
                selectTask={getSelectedTask}
                handleEdit={handleEdit}
              />
            )}
          </ul>
        </div>
      </>
    );
  }
};

export default Task;
