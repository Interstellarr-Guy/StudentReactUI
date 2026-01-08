import React, { useEffect, useState } from "react";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", course: "" });
  const [error, setError] = useState("");

  const API = "http://localhost:8080/cazoo/5122/list";

  // GET students list
  const loadStudents = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Load error:", err));
  };

  const fillForm = (student) => {
  setForm({ id: student.id, name: student.name, course: student.course });
  setError("");
};



  useEffect(() => {
    loadStudents(); 
    
// Load old list when page opens
  }, []);

  // POST add student
  const addStudent = () => {
    if (!form.name.trim() || !form.course.trim()) {
      setError("All fields are required!");
      return;
    }
    setError("");

    fetch("http://localhost:8080/cazoo/5122/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setForm({ name: "", course: "" });
        loadStudents(); // Auto refresh list after post
      });
  };            

  const deleteStudent = (id) => {
    fetch(`http://localhost:8080/cazoo/5122/list/${id}`, { method: "DELETE" })
      .then(() => loadStudents());
  };

  const updateStudent = (id) => {
  if (!form.name.trim() || !form.course.trim()) {
    setError("All fields required to update!");
    return;
  }
  setError("");

  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  }).then(() => {
    setForm({ name: "", course: "" }); // clear after update
    loadStudents();
  });
};



  return (
    <div className="p-6">
      <div className="head ">
      <h1 className="text-4xl font-semibold mb-4 head2">Students API + MySQL</h1>
      </div>
      

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Name"
          className="border p-2 rounded w-40"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Course"
          className="border p-2 rounded w-40"
          value={form.course}
          onChange={e => setForm({ ...form, course: e.target.value })}
        />
        <button onClick={addStudent} className="px-3 py-2 border rounded">
          Add Student
        </button> 
      </div>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

<div className="mt-4">
  <h5></h5>
</div>
      <div className="mt-4">
      <table className="border border-gray-600 border-separate w-full ">
        <thead>
          <tr className="border gap-4">
            <th className="border px-3 py-1">ID</th>
            <th className="border px-3 py-1" >Name</th>
            <th className="border px-3 py-1">Course</th>
            <th className="border px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="border hover:bg-gray-800 transition-all">
              <td className="border px-3 gap-2">{s.id}</td>
              <td className="border px-3 gap-2 ml-3">{s.name}</td>
              <td className="border px-3">{s.course}</td>
              <td className="border px-3 py-1">
                 <div className="flex gap-4 space-x-2">  {/* 👈 4px/4 unit gap between buttons */}
                  <button onClick={() => fillForm(s)}         className="border px-2 rounded">Update</button>
                  <button onClick={() => deleteStudent(s.id)} className="border px-2 rounded">Delete</button>
                  <button onClick={() => updateStudent(s.id)} className="border px-2 rounded">Save Changes</button>
                 </div>
                </td>
             </tr>
          ))}
        </tbody>
      </table>
     </div>
      {students.length === 0 && <p className="mt-3 text-gray-500 text-sm">No Cars found</p>}
    </div>
  );
}
