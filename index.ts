enum Status{
    Pending="PENDING",
    Completed="COMPLETED"
}
interface Task{
    id: number;
    title: string;
    status: Status;
}

let tasks: Task[]=[];

function addTask(title:string): void{
    const newTask: Task={
        id: tasks.length + 1,
        title,
        status: Status.Pending
    };
    tasks.push(newTask);
    console.log(`Task added: ${title}`);

}
function listTasks(): void {
  if (tasks.length === 0) {
    console.log("No tasks yet.");
    return;
  }
  tasks.forEach(task => {
    const symbol = task.status === Status.Completed ? "✔" : "✘";
    console.log(`${task.id}. ${task.title} [${symbol}]`);
  });
}
function completeTask(id: number): void {
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.log("Task not found.");
    return;
  }

  task.status = Status.Completed;
  console.log(`🎉 Task "${task.title}" completed.`);
}
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    const title = args.join(" ");
    if (!title) {
      console.log("Please provide a task title.");
      break;
    }
    addTask(title);
    break;

  case "list":
    listTasks();
    break;

  case "complete":
    const id = Number(args[0]);
    if (isNaN(id)) {
      console.log("Provide valid task ID.");
      break;
    }
    completeTask(id);
    break;

  default:
    console.log("Commands:");
    console.log("  add <task>");
    console.log("  list");
    console.log("  complete <id>");
}