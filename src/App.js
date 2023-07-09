import './App.css';
import EmployeesDisplay from './components/EmployeesDisplay';

function App() {
  return (
    <div className="App">
        <div className="container-lg mt-4">
          <div className="row">
              <h1 className="display-1 text-left"><u>Employees</u></h1>
          </div>
          <div className="row">
            <EmployeesDisplay />
          </div>
        </div>
    </div>
  );
}

export default App;
