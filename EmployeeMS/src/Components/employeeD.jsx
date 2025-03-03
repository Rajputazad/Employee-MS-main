import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams , Outlet} from 'react-router-dom'


const EmployeeD = () => {
    const [employee, setEmployee] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        console.log("dd");
        axios.get('http://localhost:3000/employee/detail/' + id)
            .then(result => {
                setEmployee(result.data[0])
                console.log(result.data[0]);
                localStorage.setItem("id", result.data[0].id)
                localStorage.setItem("name", result.data[0].name)

            })
            .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }
    return (
      
        
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Emoployee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`http://localhost:3000/Images/` + employee.image} className='emp_det_image' />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div>
                    <Link to={'/dashboard/edit_employee/' + employee.id} className='btn btn-primary me-2'>Edit</Link>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeD