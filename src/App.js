import React, { Component } from 'react';
import './App.css';
// import List from './list';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Jules Todo List',
      tasks: []
    };
  }

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED');
    var that = this;
    fetch('http://localhost:3000/api/tasks')
      .then(function (response) {
        response.json()
        .then( function (data) {
          let tasks = that.state.tasks;
          tasks.concat(data);
          that.setState({
            tasks: data
          })
        })
      })
  }

  addTodo(event) {
    var that = this;
    event.preventDefault();
    let task_data = {
      title: this.refs.title.value,
      id: Math.floor(Math.random() * 150)
    };
    var request = new Request('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(task_data)
    });

    let tasks = that.state.tasks;
    tasks.push(task_data);
    that.setState({
      tasks: tasks
    });

    fetch(request)
      .then(function(response) {
        response.json()
          .then(function(data){
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  removeTodo(id) {
    var that = this;
    var tasks = this.state.tasks;
    let task = tasks.find(function(task) {
      return task.id === id
    });
    // console.log(task)
    var request = new Request('http://localhost:3000/api/remove/' + id, {
      method: 'DELETE'
    });

    fetch(request)
      .then(function(response) {
        tasks.splice(tasks.indexOf(task), 1);
        that.setState({
          tasks: tasks
        })
        response.json()
          .then(function(data){
          
          })
      })

  }
//   onChange = (event) => {
//     this.setState({ term: event.target.value });
//   }

//   onSubmit = (event) => {
//     event.preventDefault();
//     this.setState({
//       term: '',
//       items: [...this.state.items, this.state.term]
//     });
//   }

//   render() {
//     let title = this.state.title;
//     return (
//       <div>
//         <form className="App" onSubmit={this.onSubmit}>
//           <input value={this.state.term} onChange={this.onChange} />
//           <button>Submit</button>
//         </form>
//         <List items={this.state.items} />
//       </div>
//     );
//   }
// }
  render() {
    let title = this.state.title;
    let tasks = this.state.tasks;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="todoForm">
          <input type="text" ref="title" placeholder="What do you need to do?" />
          <button onClick={this.addTodo.bind(this)}>Add</button>
        </form>
        <ul>
          {tasks.map(task => <li key={task.id}> {task.title} <button onClick={this.removeTodo.bind(this, task.id)}>Delete</button> </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
