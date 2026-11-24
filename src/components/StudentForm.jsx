import { useEffect, useState } from "react";

const emptyForm = { name: "", email: "", phone: "", department: "" };

function StudentForm({ onSave, editingStudent, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingStudent ? editingStudent : emptyForm);
  }, [editingStudent]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, department } = form;
    onSave({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department: department.trim(),
    });
    setForm(emptyForm);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
      <div className="form-grid">
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn primary">
          {editingStudent ? "Update" : "Submit"}
        </button>
        {editingStudent && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
