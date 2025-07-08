let taskList = [];

const hoursPerWeek = 24 * 7;

const handleOnFormSubmit = (e) => {
  // const elm = document.getElementById("task");

  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hr = +newForm.get("hr");
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  //check if there is enough hours left
  const existingTotalHrs = taskTotal();

  if (existingTotalHrs + hr > hoursPerWeek) {
    return alert("Sorry Boss! not enough time to fit this task from last week");
  }

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";

  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, index) => {
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr} hrs</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="handleOnDelete('${
                      item.id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success" onclick="switchTask('${
                      item.id
                    }', 'bad')">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  entryElm.innerHTML = str;
  taskTotal();
};

const displayBadList = () => {
  let str = "";

  const badElm = document.getElementById("badList");

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, index) => {
    str += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr} hrs</td>
                  <td class="text-end">
                    <button class="btn btn-warning" onclick="switchTask('${
                      item.id
                    }', 'entry')">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button class="btn btn-danger" onclick="handleOnDelete('${
                      item.id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });

  badElm.innerHTML = str;

  document.getElementById("savedHrsElm").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};

const randomIdGenerator = (length = 6) => {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }

  return id;
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displayBadList();
  }
};

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });

  displayEntryList();
  displayBadList();
};

const taskTotal = () => {
  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  document.getElementById("ttlHrs").innerText = totalHrs;
  return totalHrs;
};
