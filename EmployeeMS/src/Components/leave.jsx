import React, { useEffect, useState } from 'react'
import axios from "axios";
const Leave =()=>{
   
    const [formData, setFormData] = useState({
        emp_id: "",
        emp_name: "storedName",
        description: '',
        approval: ''
      });
      const [leave, setLeave] = useState([]);
      useEffect(() => {
        getDataFromLocalStorage();
        fatchleave()
      }, []);
const fatchleave=()=>{
    axios
    .get("http://localhost:3000/leave/leave_get")
    .then((result) => {
        if (result.data.Status) {
            setLeave(result.data.Result);
        } else {
            alert(result.data.Error);
        }
    })
    .catch((err) => console.log(err));
    
}

      const getDataFromLocalStorage = () => {
        const storedId = localStorage.getItem('id');
        const storedName = localStorage.getItem('name');
        if (storedId && storedName) {
            setFormData({
                ...formData,
                emp_id: storedId,
                emp_name: storedName,
                approval:"Approve"

              });
        }
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)

        console.log(formData);
        axios.post('http://localhost:3000/leave/leave_post', formData)
        .then(result => {
            if (result.data.Status) {
                alert("Leave sent")
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      };
    
      return (
        <div className="container">
          <h2>Employee Leave</h2>
          <form onSubmit={handleSubmit}>
           
           
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ width: '80%' }}
                />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className="mt-3">
            
                <h2>Leaves Status</h2>
      <table className="table" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Description</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {leave.map((l, index) => (
            <tr key={index}>
              <td>{l.emp_id}</td>
              <td>{l.emp_name}</td>
              <td>{l.description}</td>
              <td>{l.approval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      );
}

export default Leave;