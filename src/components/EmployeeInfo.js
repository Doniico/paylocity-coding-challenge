export default function EmployeeInfo({ employee }){
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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4>{employee.Name}</h4>
                </div>
                <div className="col">
                    <div className="form-check form-control-lg">
                        <input className="form-check-input" type="checkbox" value={employee.Elected} id="elect" defaultChecked={employee.Elected}/>
                        <label className="form-check-label" htmlFor="elect">
                            Elect for Benefits
                        </label>
                    </div>
                </div>
                <div className="col">
                    <h4>Paycheck Amount: ${(2000-annualDeductions/26).toFixed(2)}</h4>
                </div>
                <div className="col">
                    <h4>Deductions / Paycheck: ${(annualDeductions/26).toFixed(2)}</h4>
                </div>
                <div className="col">
                    <h4>Deductions / Year: ${annualDeductions}</h4>
                </div>
            </div>
            <div className="row">
                <ul className="list-group">
                    {employee.Dependents.map((dependent) => (
                        <li key={dependent.Id} className="list-group-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-3">
                                        <h5>{dependent.Name}</h5>
                                    </div>
                                    <div className="col-2">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value={dependent.Elected} id="elect" defaultChecked={dependent.Elected}/>
                                            <label className="form-check-label" htmlFor="elect">
                                                Elect for Benefits
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
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}