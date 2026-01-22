import React, { useEffect, useState } from "react";
import api from "./api/api";

export default function StudentsApp() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", course: "" });
  const [error, setError] = useState("");

  // GET students
  const loadStudents = () => {
    api.get("/cazoo/5122/list")
      .then(res => setStudents(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load students");
      });
  };

  // ADD student
  const addStudent = () => {
    if (!form.name.trim() || !form.course.trim()) {
      setError("All fields are required");
      return;
    }

    api.post("/cazoo/5122/list", form)
      .then(() => {
        setForm({ name: "", course: "" });
        loadStudents();
      })
      .catch(err => console.error(err));
  };

  // DELETE student
  const deleteStudent = (id) => {
    api.delete(`/cazoo/5122/list/${id}`)
      .then(() => loadStudents())
      .catch(err => console.error(err));
  };

  // UPDATE student
  const updateStudent = (id) => {
    if (!form.name.trim() || !form.course.trim()) {
      setError("All fields required to update");
      return;
    }

    api.put(`/cazoo/5122/list/${id}`, form)
      .then(() => {
        setForm({ name: "", course: "" });
        loadStudents();
      })
      .catch(err => console.error(err));
  };

  const fillForm = (student) => {
    setForm({ name: student.name, course: student.course });
    setError("");
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // 2201
  useEffect(() => {
  getStudents().then(data => setStudents(data));
}, []);


  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">Students API + MySQL</h1>

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

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border px-3">ID</th>
            <th className="border px-3">Name</th>
            <th className="border px-3">Course</th>
            <th className="border px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td className="border px-3">{s.id}</td>
              <td className="border px-3">{s.name}</td>
              <td className="border px-3">{s.course}</td>
              <td className="border px-3 flex gap-2">
                <button onClick={() => fillForm(s)} className="border px-2">Edt</button>
                <button onClick={() => deleteStudent(s.id)} className="border px-2">Delete</button>
                <button onClick={() => updateStudent(s.id)} className="border px-2">Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && <p>No students found</p>}
    </div>
  );
}
