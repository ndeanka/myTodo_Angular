export class TodoList {
  myTodoList = [
    {description: "Learn Javascript", status: ""},
    {description: "Learn DOM", status: ""},
    {description: "Learn Promises", status: ""},
    {description: "Learn Asncy", status: ""},

  ];

  addTodoList(description: string, status: string) {
    this.myTodoList.push({description: description, status: status})

  }
}
