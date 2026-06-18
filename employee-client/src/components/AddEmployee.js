import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { createEmployee } from '../services/employeeService';

function AddEmployee() {

    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const employee = { name, department, salary:Number(salary) };
        await createEmployee(employee);
        navigate('/'); 
    };
    return(
        <div className="container">
            <h1>Add Employee</h1>
            <div className="liquid-card form-card">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Department:</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="field">
                    <label>Salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div style={{display:'flex',gap:8}}>
                    <button type="submit" className="btn">Add Employee</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AddEmployee;