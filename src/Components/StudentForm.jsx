import React, { useState, useEffect } from "react";
import { MYAXIOS } from "../Service/Helper";
const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    marks: "",
  });

  useEffect(() => {
    // Fetch students data when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await MYAXIOS.get("/api/students"); // Replace with your API endpoint
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    console.log("name :" + e.target.name);
    console.log("value :" + e.target.value);

    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        // Update existing student
        await MYAXIOS.put(`/api/students/${formData.id}`, formData);
      } else {
        // Create new student
        await MYAXIOS.post("/api/students", formData);
      }

      // Reset the form and fetch updated data
      setFormData({ id: null, name: "", email: "", marks: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleEdit = (student) => {
    // Set form data for editing
    setFormData({ ...student });
    // setFormData({ id: student.id, name: student.name, email: student.email, marks: student.marks});
  };

  const handleDelete = async (id) => {
    try {
      await MYAXIOS.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  // ... (Previous code remains unchanged)

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marks" className="form-label">
            Marks
          </label>
          <input
            type="text"
            className="form-control"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Marks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.marks}</td>

              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentForm;
