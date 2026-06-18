import {useEffect, useState} from "react";
import { getEmployeeById } from "../services/employeeService";
import { useParams , Link } from "react-router-dom";
function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    useEffect(() => {
        loadEmployee();
    }, []);
    const loadEmployee = async () => {
        const response = await getEmployeeById(id);
        setEmployee(response);
    };
    if (!employee) {
        return <div className="center muted">Loading...</div>;
    }
    return (
        <div className="container">
            <div className="header-row">
                <h2 className="card-title">Employee Details</h2>
                <div>
                    <Link to={`/edit/${id}`}><button className="btn">Edit</button></Link>
                    <Link to="/"><button className="btn secondary" style={{marginLeft:8}}>Back</button></Link>
                </div>
            </div>
            <div className="liquid-card form-card">
                <p className="field"><span className="detail-label">Name:</span> <span className="muted">{employee.name}</span></p>
                <p className="field"><span className="detail-label">Department:</span> <span className="muted">{employee.department}</span></p>
                <p className="field"><span className="detail-label">Salary:</span> <span className="muted">{employee.salary}</span></p>
            </div>
        </div>
    )
}
export default EmployeeDetails;