/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SubjectData } from "../types";
interface AssignSubjectModalProps {
  learner_id: number;
}

const AssignSubjectModal: React.FC<AssignSubjectModalProps> = ({
  learner_id,
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://e-tap-learning.vercel.app/api/subjects/${learner_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data: SubjectData[] = await response.json(); 
        setSubjects(data);
      } catch (error:any) {
        toast.error(error?.message || "Error fetching subjects");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const toggleSubject = (id: number) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedSubjects((prev) => [...prev, id]);
    }
  };

  console.log({selectedSubjects});
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subjects List</h2>
      {subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        subjects.map((subject: SubjectData, index: number) => (
          <div key={index} className="border-b border-gray-300 mb-2">
            <p className="semi-bold text-[13px]">{subject.title}</p>
            {subject?.topics.map((topicItem: any, index2: number) => (
              <div
                key={index2}
                className="flex items-center mb-2 text-[#797A7B]"
              >
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(topicItem?.id)}
                  onChange={() => toggleSubject(topicItem?.id)}
                />
                <label className="ml-2 text-[11px]">{topicItem.title}</label>
              </div>
            ))}
          </div>
        ))
      )}
      <div className="flex justify-center items-center">
        <button
          // onClick={handleAssign}
          className="bg-green-500 text-white px-4 py-2 mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Assign Selected"}
        </button>
      </div>
    </div>
  );
};

export default AssignSubjectModal;
