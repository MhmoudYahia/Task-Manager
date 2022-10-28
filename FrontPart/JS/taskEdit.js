//get id  search params
const params = location.search;
const id = new URLSearchParams(params).get("id");

//select elements
const idTaskSpan = document.querySelector("span.id");
const inputName = document.querySelector('.field input[type="text"]');
const inputCompleted = document.querySelector('.field input[type="checkbox"]');
const editBtn = document.querySelector("Button");
const editStatus = document.querySelector(".editTask .editStatus ");
const returnBtn = document.querySelector(".fa-circle-arrow-left");

//set id
idTaskSpan.innerHTML = id;

//get Task

const showTask = async () => {
  try {
    const taskRes = await fetch(`/api/v1/tasks/${id}`);
    const task = await taskRes.json();
    const { name, completed } = task;
    console.log(task);
    inputName.value = name;
    // console.log(completed);
    if (completed) {
      inputCompleted.checked = true;
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

showTask();

inputCompleted.addEventListener("click", () => {
  if (inputCompleted.checked) {
    inputCompleted.classList.add("active");
  } else {
    inputCompleted.classList.remove("active");
  }
});
//update task
editBtn.addEventListener("click", async () => {
  try {
    const taskRes = await fetch(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        name: inputName.value,
        completed: inputCompleted.checked,
      }),
    });
    editStatus.innerHTML = `<span>Edited Successfully</span><i class="fa-regular fa-circle-check"></i>`;
  } catch (error) {
    res.status(500).send({ msg: error });
    editStatus.innerHTML = `<span>Error</span><i class="fa-regular fa-triangle-exclamation"></i>`;
  }
  showTask();
  setTimeout(() => {
    editStatus.innerHTML = ``;
  }, 3000);
});

//return to main page
returnBtn.addEventListener("click", () => {
  window.location.href = `../index.html`;
});
