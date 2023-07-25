// components/StudentsGrid.js
import { useState, useEffect } from 'react';

const StudentsGrid = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data.Students))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.Id}>
              <td>{student.Name}</td>
              {}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsGrid;
