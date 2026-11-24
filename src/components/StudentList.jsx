function StudentList({ students, onDelete, onEdit }) {
  if (students.length === 0) {
    return <p className="empty card">No students found.</p>;
  }

  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td data-label="Name">{s.name}</td>
              <td data-label="Email">{s.email}</td>
              <td data-label="Phone">{s.phone}</td>
              <td data-label="Department">{s.department}</td>
              <td data-label="Actions" className="actions">
                <button className="btn" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
