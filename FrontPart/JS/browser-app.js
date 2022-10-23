//select elements
const tasksDiv = document.querySelector(".tasks");
const submitBtn = document.querySelector('.tasksForm input[type="submit"]');
const inputTaskName = document.querySelector('.tasksForm input[type="text"]');

//get tasks from database and show it
const showTasks = async () => {
  try {
    const tasksRes = await fetch("/api/v1/tasks");
    const { tasks } = await tasksRes.json();
    if (tasks.length < 1) {
      tasksDiv.innerHTML = `<div class="task no_tasks">NO TASKS</div> `;
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { _id: taskId, name, completed } = task;
        return ` <div class="task">
          <span> ${name}</span>
          <span>
            <a href="./task.html?id=${taskId}" 
              ><i class="fa-solid fa-pen-to-square"></i
            ></a>
            <i class="fa-solid fa-trash deleteTask"  data-id="${taskId}"></i
          ></span>
        </div>`;
      })
      .join("");
    tasksDiv.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
  }
};

showTasks();

//add tasks to database
submitBtn.addEventListener("click", async () => {
  const taskName = inputTaskName.value;

  const objTask = { name: taskName };

  try {
    const tasksRes = await fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objTask),
    });
    const task = await tasksRes.json();
  } catch (error) {
    res.status(404).send({ msg: error });
  }
  showTasks();
  inputTaskName.value = "";
});

// const deleteTask = () => {
//   const delIconList = document.querySelectorAll(".deleteTask");

//   delIconList.forEach((delIcon) => {
//     //delete task
//     if (delIcon) {
//       delIcon.addEventListener("click", async () => {
//         try {
//           await fetch(`api/v1/tasks/${delIcon.dataset.id}`, {
//             method: "DELETE",
//             headers: {
//               "content-type": "application/json",
//             },
//           });
//           showTasks();
//         } catch (error) {
//           res.send({ msg: error });
//         }
//       });
//     }
//   });
// };

// setTimeout(deleteTask, 2000);

tasksDiv.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteTask")) {
    try {
      await fetch(`api/v1/tasks/${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      showTasks();
    } catch (error) {
      res.send({ msg: error });
    }
  }
});
