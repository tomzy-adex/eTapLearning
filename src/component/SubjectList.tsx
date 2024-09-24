import { useRouter } from 'next/router';
import { Subject } from "../types";

interface SubjectListProps {
  subjects: Subject[];
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects }) => {
  const router = useRouter();

  const handleViewTopics = (subjectId: number) => {
    router.push(`/subjects/${subjectId}/topics`);
  };

  return (
    <div>
      {subjects.length > 0 ? (
        <table className="min-w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject: Subject, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{subject.title}</td>
                <td className="py-2 px-4 border-b text-center">{subject.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (subject.id !== undefined) {
                        handleViewTopics(subject.id);
                      } else {
                        console.error("Subject ID is undefined.");
                      }
                    }}
                  >
                    View Topics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No subjects available.</p>
      )}
    </div>
  );
};

export default SubjectList;
