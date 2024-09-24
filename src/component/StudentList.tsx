import { Student } from "../types";

interface StudentListProps {
  students: Student[];
  onViewClicked: (student: Student) => void;
  onAssignClicked: (studentId: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onViewClicked,
  onAssignClicked,
}) => {
  return (
    <div>
      {students.length > 0 ? (
        <table className="min-w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: Student, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{student.name}</td>
                <td className="py-2 px-4 border-b text-center">{student.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex gap-1 justify-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => onViewClicked(student)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => onAssignClicked(student?.id || 1)}
                    >
                      Assign Subject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default StudentList;
