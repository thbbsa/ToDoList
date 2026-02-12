import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');


  const hadleAddTask = () => {
    if (task.trim() === '') return;

    console.log('Task added:', task);
    setTasks([...tasks, task]);
    setTask('');
  }

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
    setTask(''); 
  }

  const handleSaveEdit = () => {
    if (editValue.trim() === '') return;

    const updatedTasks = tasks.map((t, i) => (i === editIndex ? editValue : t));
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue('');
  }

  const hadleRemTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className='container d-flex flex-column align-items-center mt-5'>
      <h1 className='text-center mb-4'>Task Manager</h1>

      <div className='d-flex flex-column justify-content-start align-items-center mb-4 border p-2 rounded overflow-hidden overflow-y-scroll' style={{ width: '500px', height: '500px' }}>
        <div className="input-group mb-3 mx-auto">
          <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value={task} onChange={(e) => setTask(e.target.value)} />
          <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={hadleAddTask}>Adicionar</button>

          <ul className='list-group list-group-flush w-100 m-4'>
            {tasks.map((task, index) => {
              return (
                <li className='list-group-item container d-flex flex-row' key={index}>
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        className="form-control me-2"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button className='btn btn-sm btn-success' onClick={handleSaveEdit}>Salvar</button>
                    </>
                  ) : (
                    <>
                      <div className='container d-flex justify-content-end gap-2'>
                        <input type="checkbox" className="form-check-input me-2" style={{cursor:'pointer'}} />
                        <span className="me-auto">{task}</span>
                        <button style={{background: 'none', border: 'none'}} onClick={() => handleEditTask(index)}><i className="bi bi-pencil-square"></i></button>
                        <button style={{background: 'none', border: 'none'}} onClick={() => hadleRemTask(index)}><i className="bi bi-trash"></i></button>
                      </div>
                    </> 
                  )}

                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App;
