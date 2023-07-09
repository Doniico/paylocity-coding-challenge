import EmployeeInfo from "./EmployeeInfo";
import AddForm from "./AddForm";
import { useState } from 'react';

export default function EmployeesDisplay(){
    const [displayAddForm, setDisplayAddForm] = useState(false);
    const [employees, setEmployees] = useState([
        {
            "Id": crypto.randomUUID(),
            "Name": "Bob Joe",
            "Elected": true,
            "Dependents": [
                {
                    "Id": crypto.randomUUID(),
                    "Name": "Adam Joe",
                    "Elected": true,
                },
                {
                    "Id": crypto.randomUUID(),
                    "Name": "Eve Joe",
                    "Elected": true
                }
            ]
        },
        {
            "Id": crypto.randomUUID(),
            "Name": "Jon Doe",
            "Elected": false,
            "Dependents": []
        },
        {
            "Id": crypto.randomUUID(),
            "Name": "Jane Doe",
            "Elected": false,
            "Dependents": [
                {
                    "Id": crypto.randomUUID(),
                    "Name": "Mary Doe",
                    "Elected": true,
                }
            ]
        }
    ]);

    function AddEmployee(employee){
        setEmployees([...employees, employee]);
        setDisplayAddForm(false);
    }

    return (
        <div className="container-fluid">
            <div className="row  my-4">
                <div className="col-sm">
                    <button type="button" className="btn btn-success" onClick={() => setDisplayAddForm(true)}><h3>Add New</h3></button>
                </div>
            </div>
            <AddForm isActive={displayAddForm} onSubmit={AddEmployee}/>
            <div className="row">
                <ul className="list-group">
                    {employees.map((employee) => (
                        <li key={employee.Id} className="list-group-item"><EmployeeInfo employee={employee}/></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
