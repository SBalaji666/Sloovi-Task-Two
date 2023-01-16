import Task from './features/taskslist/Task';

function App() {
  return (
    <>
      <div style={{ height: '100vh', overflowX: 'hidden' }}>
        <div className="row h-100">
          <div className="col-sm-2 bg-secondary d-none d-sm-block"></div>

          <div className="col-sm-10 d-flex align-items-center justify-content-center justify-content-sm-start">
            <Task />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
