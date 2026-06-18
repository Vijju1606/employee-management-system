import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/employeeService';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        const response = await getEmployeeById(id);
        setName(response.name);
        setDepartment(response.department);
        setSalary(response.salary);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEmployee = { name, department, salary };
        await updateEmployee(id, updatedEmployee);
        navigate('/');
    };
    return (
        <div className="container">
            <h2>Edit Employee</h2>
            <div className="liquid-card form-card">
            <form onSubmit={handleSubmit}>  
                <div className="field">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />           
                </div>
                <div className="field">
                    <label>Department:</label>      
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                </div>
                <div className="field">
                    <label>Salary:</label>      
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </div>
                <div style={{display:'flex',gap:8}}>
                    <button type="submit" className="btn">Update Employee</button>
                </div>
            </form>
            </div>
        </div>
    );
}
export default EditEmployee;