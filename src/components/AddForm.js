import { useState } from 'react';

export default function AddForm({ isActive, onSubmit }){
    const [employee, setEmployee] = useState({
        "Id": crypto.randomUUID(),
        "Name": "",
        "Elected": false,
        "Dependents": [] 
    });
    const [hasDependents, setHasDependents] = useState(false);


    function GenerateNewDependent()
    {
        return {
            "Id": crypto.randomUUID(),
            "Name": "",
            "Elected": false
        }
    };

    function handleNameChange(name){
        setEmployee({...employee, Name: name});
    }

    function handleElectedChange(elected){
        setEmployee({...employee, Elected: elected});
    }

    function addDependent(){
        setEmployee({
            ...employee,
            Dependents: [
                ...employee.Dependents,
                GenerateNewDependent()
            ]
        });
        setHasDependents(true);
    }

    function handleDependentElectedChange(elected, dependentId)
    {
        const nextDependents = employee.Dependents.map(dependent => {
            if(dependent.Id === dependentId)
            {
                return {
                    ...dependent,
                    Elected: elected
                }
            } else {
                return dependent;
            }
        });

        setEmployee({
            ...employee,
            Dependents: nextDependents
        })
    }

    function handleDependentNameChange(name, dependentId){
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

        setEmployee({
            ...employee,
            Dependents: nextDependents
        })
    }

    return (
        <>
            {isActive ? 
                (
                    <div className="container=fluid my-3">
                        <div className="row">
                            <div className="col">
                                <input className="form-control form-control-lg" type="text" value={employee.Name} onChange={e => handleNameChange(e.target.value)} placeholder="Name"/>
                            </div>
                            <div className="col">
                                <div className="form-check form-control-lg">
                                    <input className="form-check-input" type="checkbox" value={employee.Elected} onChange={e => handleElectedChange(e.target.value)} id="elect"/>
                                    <label className="form-check-label" htmlFor="elect">
                                        Elect for Benefits
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-lg btn-primary" onClick={addDependent}>Add Dependent</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-lg btn-success" onClick={() => onSubmit(employee)}>Submit</button>
                            </div>
                        </div>
                        {hasDependents ? 
                            employee.Dependents.map((dependent) => (
                                <div key={dependent.Id} className="row my-2">
                                    <div className="col-3">
                                        <input className="form-control form-control-lg" type="text" value={dependent.Name} onChange={e => handleDependentNameChange(e.target.value,dependent.Id)} placeholder="Dependent"/>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-check form-control-lg">
                                            <input className="form-check-input" type="checkbox" value={dependent.Elected} onChange={e => handleDependentElectedChange(e.target.value,dependent.Id)} id="elect"/>
                                            <label className="form-check-label" htmlFor="elect">
                                                Elect for Benefits
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <></>
                        }
                    </div>
                )
            : <></>}
        </>
    );
}