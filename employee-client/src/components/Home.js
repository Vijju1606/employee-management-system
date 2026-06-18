import {useEffect, useState} from 'react';
import {
    getEmployees,deleteEmployee
} from '../services/employeeService';
import { Link } from 'react-router-dom';

function Home() {

    const [employees, setEmployees] = useState([]); 
    const loadEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };
    const handleDelete = async (id) => {
        try {
            console.log('Deleting employee id:', id);
            if (!id) {
                alert('Invalid employee id');
                return;
            }
            const res = await deleteEmployee(id);
            console.log('Delete response:', res);
            await loadEmployees();
        } catch (err) {
            console.error('Error deleting employee:', err);
            const msg = err?.response?.data || err.message || 'Unknown error';
            alert('Delete failed: ' + msg);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return (
        <div className="container">
            <div className="header-row">
                <h1>Employee Management System</h1>
                <Link to="/add"><button className="btn">Add Employee</button></Link>
            </div>
            <div>
            {employees.map((employee) => {
                const empId = employee.id || employee._id || employee.Id || (employee?._id);
                return (
                <div key={empId} className="liquid-card list-item">
                    <div>
                        <div><strong>{employee.name}</strong></div>
                        <div className="muted">{employee.department} • ${employee.salary}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                        <Link to={`/details/${empId}`}><button className="btn secondary">View</button></Link>
                        <Link to={`/edit/${empId}`}><button className="btn secondary">Edit</button></Link>
                        <button className="btn" onClick={() => handleDelete(empId)}>Delete</button>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    );
}

export default Home;
