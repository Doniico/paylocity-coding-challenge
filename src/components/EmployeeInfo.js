import { useState } from 'react';

export default function EmployeeInfo({ employee, updateEmployee, removeEmployee }){
    const [showEdit, setShowEdit] = useState(false);

    let annualDeductions = CalcDeductions();

    function CalcDeductions(){
        var totalDeductions = 0;
        if(employee.Elected)
        {

            totalDeductions += (employee.Name.toLowerCase().charAt(0) === 'a' ? 1000*0.9 : 1000);
            for(let i = 0; i < employee.Dependents.length; i++)
            {
                let dependent = employee.Dependents[i];
                totalDeductions += CalcDependentAnnualCosts(dependent);
            }
        }
        return totalDeductions;
    }

    function CalcDependentAnnualCosts(dependent){

        if(!dependent.Elected)
        {
            return 0;
        }
        else
        {
            return dependent.Name.toLowerCase().charAt(0) === 'a' ? 500*0.9 : 500;
        }
    }

    function CalcEmployeeAnnualCosts(employee){
        if(!employee.Elected)
        {
            return 0;
        }
        else
        {
            return employee.Name.toLowerCase().charAt(0) === 'a' ? 1000*0.9 : 1000;
        }
    }

    function handleElectedChanged(){
        const nextEmployee = {
            ...employee, 
            Elected: !employee.Elected
        };
        updateEmployee(nextEmployee);
    }

    function handleNameChanged(name){
        updateEmployee({
            ...employee,
            Name: name
        });
    }


    function handleDependentElectChanged(dependentId){
        const nextDependents = employee.Dependents.map(dependent => {
            if(dependent.Id === dependentId)
            {
                return {
                    ...dependent,
                    Elected: !dependent.Elected
                }
            } else {
                return dependent;
            }
        });

        const nextEmployee = {
            ...employee,
            Dependents: nextDependents
        };
        updateEmployee(nextEmployee);
    }

    function handleDependentNameChanged(name, dependentId){
        const nextDependents = employee.Dependents.map(dependent => {
            if(dependent.Id === dependentId)
            {
                return {
                    ...dependent,
                    Name: name
                }
            } else {
                return dependent;
            }
        });

        const nextEmployee = {
            ...employee,
            Dependents: nextDependents
        };
        updateEmployee(nextEmployee);
    }

    function handleDeleteDependent(dependentId){
        const nextDependents = employee.Dependents.filter(dependent => dependent.Id !== dependentId);
        const nextEmployee = {
            ...employee,
            Dependents: nextDependents
        };
        updateEmployee(nextEmployee);
    }

    function handleAddDependent(){
        const nextDependents = [
            ...employee.Dependents,
            {
                "Id" : crypto.randomUUID(),
                "Name": "",
                "Elected": false
            }
        ];
        const nextEmployee = {
            ...employee,
            Dependents: nextDependents
        };
        updateEmployee(nextEmployee);
    }

    return (
        <div className="container-fluid my-0">
            <div className="row mt-2 mb-4">
                <div className="col-2">
                    <h4>{employee.Name}</h4>
                </div>
                    {showEdit ?
                        (<div className="col-1">
                            <button className="btn btn-success btn-lg" onClick={() => { setShowEdit(false)}}>Submit</button>
                        </div>)
                        :
                        (<div className="col-1">
                            <button className="btn btn-secondary btn-lg" onClick={() => setShowEdit(true)}>Edit</button>
                        </div>)
                    }
                <div className="col">
                    <h4>Paycheck Amount: ${(2000-annualDeductions/26).toFixed(2)}</h4>
                </div>
                <div className="col">
                    <h4>Deductions / Paycheck: ${(annualDeductions/26).toFixed(2)}</h4>
                </div>
                <div className="col">
                    <h4>Deductions / Year: ${annualDeductions}</h4>
                </div>
                {showEdit &&
                    <div className="col-1">
                        <button className="btn btn-danger btn-lg" onClick={() => removeEmployee(employee.Id)}>X</button>
                    </div> 
                }
            </div>
            <div className="row">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    {showEdit ?
                                        <input className="form-control form-control-lg" type="text" value={employee.Name} onChange={e => handleNameChanged(e.target.value)} placeholder="Name"/> :
                                        <h5><b>{employee.Name}</b></h5> 
                                    }
                                </div>
                                <div className="col-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" onChange={() => handleElectedChanged(employee.Id)} id="elect" checked={employee.Elected ? true : false} disabled={!showEdit}/>
                                        <label className="form-check-label" htmlFor="elect">
                                            Elected for Benefits
                                        </label>
                                    </div>
                                </div>
                                <div className="col-2 text-end">
                                    <h5>Costs / Paycheck: </h5>
                                </div>
                                <div className="col-1">
                                    <h5>${(CalcEmployeeAnnualCosts(employee)/26).toFixed(2)}</h5>
                                </div>
                                <div className="col-2 text-end">
                                    <h5>Costs / Year: </h5>
                                </div>
                                <div className="col-1">
                                    <h5>${CalcEmployeeAnnualCosts(employee)}</h5>
                                </div>
                                {showEdit &&
                                    <div className="col-1">
                                        <button className="btn btn-primary btn-lg" onClick={() => handleAddDependent()}>Add</button>
                                    </div> 
                                }
                            </div>
                        </div>
                    </li>
                    {employee.Dependents.map((dependent) => (
                        <li key={dependent.Id} className="list-group-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-3">
                                        {showEdit ?
                                            <input className="form-control form-control-lg" type="text" value={dependent.Name} onChange={e => handleDependentNameChanged(e.target.value,dependent.Id)} placeholder="Name"/> :
                                            <h5>{dependent.Name}</h5>
                                        }
                                    </div>
                                    <div className="col-2">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={() => handleDependentElectChanged(dependent.Id)} id="elect" checked={dependent.Elected ? true : false} disabled={!showEdit}/>
                                            <label className="form-check-label" htmlFor="elect">
                                                Elected for Benefits
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2 text-end">
                                        <h5>Costs / Paycheck: </h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>${(CalcDependentAnnualCosts(dependent)/26).toFixed(2)}</h5>
                                    </div>
                                    <div className="col-2 text-end">
                                        <h5>Costs / Year: </h5>
                                    </div>
                                    <div className="col-1">
                                        <h5>${CalcDependentAnnualCosts(dependent)}</h5>
                                    </div>
                                    {showEdit &&
                                        <div className="col-1">
                                            <button className="btn btn-danger btn-lg" onClick={() => handleDeleteDependent(dependent.Id)}>X</button>
                                        </div> 
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}