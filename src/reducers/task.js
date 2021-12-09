const initialState = {
  allTasks: [],
};
const getTasks = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      //   const { allTasks } = payload;
      return payload;

    case "DELETE":
      const { taskId } = payload;
      return {
        allTasks: state.allTasks.filter((item) => item._id !== taskId),
      };

    case "ADD":
      const { task } = payload;
      return {
        allTasks: [...state.allTasks, task],
      };

    case "UPDATE":
      const { newTask } = payload;
      return {
        ...state,
        allTasks: state.allTasks.map((ele) =>
          ele._id == newTask[0]._id ? { ...ele, name: newTask[0].name } : ele
        ),
      };

    case "COMPLETE":
      const { taskID } = payload;
      return {
        ...state,
        allTasks: state.allTasks.map((ele) =>
          ele._id == taskID ? { ...ele, isCompleted: true } : ele
        ),
      };

    case "UNCOMPLETE":
      const { TaskId } = payload;
      return {
        ...state,
        allTasks: state.allTasks.map((ele) =>
          ele._id == TaskId ? { ...ele, isCompleted: false } : ele
        ),
      };

    default:
      return state;
  }
};

export default getTasks;

export const taskss = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};

export const deletee = (data) => {
  return {
    type: "DELETE",
    payload: data,
  };
};

export const add = (data) => {
  return {
    type: "ADD",
    payload: data,
  };
};

export const update = (data) => {
  return {
    type: "UPDATE",
    payload: data,
  };
};
export const completeRedu = (data) => {
  return {
    type: "COMPLETE",
    payload: data,
  };
};

export const unCompleteRedu = (data) => {
  return {
    type: "UNCOMPLETE",
    payload: data,
  };
};
