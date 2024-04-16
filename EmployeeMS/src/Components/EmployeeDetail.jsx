import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams , Outlet} from 'react-router-dom'


const EmployeeDetail = () => {
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
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/dashboard"
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                SharePoint Empower
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to={`/employee_detail/${id}/dashboard`}
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="Leave"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                    Leave
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/category"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Category</span>
                                </Link>
                            </li>

                            <li className="w-100" onClick={handleLogout}>
                                <Link
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>Emoployee Management System</h4>
                    </div>
                    <div>
                       
                        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                            <img src={`http://localhost:3000/Images/` + employee.image} className='emp_det_image' />
                            <div className='d-flex align-items-center flex-column mt-5'>
                                <h3>Name: {employee.name}</h3>
                                <h3>Email: {employee.email}</h3>
                                <h3>Salary: ${employee.salary}</h3>
                            </div>
                            <div> */}
                                {/* <Link to={'/dashboard/edit_employee/' + employee.id} className='btn btn-primary me-2'>Edit</Link> */}
                                {/* <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                    <Outlet />
                     {/* <Switch> */}
        {/* <Route path={`${match.path}/story`}>
          <Story />
        </Route> */}
        {/* <Route path={`${match.path}/reel`}>
          <Reel />
        // </Route> */}
      {/* </Switch> */}
                </div>
            </div>
        // </div>
        // <div>
        //     <div className="p-2 d-flex justify-content-center shadow">
        //         <h4>Emoployee Management System</h4>
        //     </div>
        //     <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        //         <img src={`http://localhost:3000/Images/` + employee.image} className='emp_det_image' />
        //         <div className='d-flex align-items-center flex-column mt-5'>
        //             <h3>Name: {employee.name}</h3>
        //             <h3>Email: {employee.email}</h3>
        //             <h3>Salary: ${employee.salary}</h3>
        //         </div>
        //         <div>
        //             <Link to={'/dashboard/edit_employee/' + employee.id} className='btn btn-primary me-2'>Edit</Link>
        //             <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default EmployeeDetail