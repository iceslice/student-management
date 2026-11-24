import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const STORAGE_KEY = "students";

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  // Bonus: persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const saveStudent = (data) => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s)));
      setEditingStudent(null);
    } else {
      setStudents([...students, { id: Date.now(), ...data }]);
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    if (editingStudent?.id === id) setEditingStudent(null);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student Management App</h1>

      <StudentForm
        onSave={saveStudent}
        editingStudent={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />

      <div className="list-header">
        <h2>Students ({students.length})</h2>
        <input
          type="text"
          className="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StudentList
        students={filtered}
        onDelete={deleteStudent}
        onEdit={setEditingStudent}
      />
    </div>
  );
}

export default App;
