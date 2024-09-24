/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SubjectData } from "../types";

interface AssignSubjectModalProps {
  learner_id: number;
  processCloseModal: any;
}

interface SelectedSubject {
  topicId: number;
  subjectId: number;
 
}

const AssignSubjectModal: React.FC<AssignSubjectModalProps> = ({
  learner_id, processCloseModal
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/subjects/${learner_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data: SubjectData[] = await response.json();
        setSubjects(data);
      } catch (error: any) {
        toast.error(error?.message || "Error fetching subjects");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [learner_id]);

  // Toggle the selected subject/topic combo
  const toggleSubject = (topicId: number, subjectId: number) => {
    const existing = selectedSubjects.find(
      (sub) => sub.topicId === topicId && sub.subjectId === subjectId
    );

    if (existing) {
      // Remove if already selected
      setSelectedSubjects((prev) =>
        prev.filter(
          (sub) => !(sub.topicId === topicId && sub.subjectId === subjectId)
        )
      );
    } else {
      // Add to selected subjects
      setSelectedSubjects((prev) => [...prev, { topicId, subjectId }]);
    }
  };

  const handleAddSubject = async () => {
    
    if(selectedSubjects?.length < 1){
        toast.error("No topic is selected");
        return
        
    }
    setLoading(true);

    const payload = {
        selectedSubjects : selectedSubjects,
        learner_id: learner_id
    }
    try {
      const response = await fetch('http://localhost:4000/api/topics/assignLessonToUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add subject');
      }

    //   const addedSubject = await response.json();
      toast.success("Lesson assign successfully");
    //   setSubjects((prevSubjects) => [...prevSubjects, addedSubject]); // Update the subject list with the newly added one
    //   setShowModal(false); // Close modal after success
    } catch (err: any) {
      toast.error(err?.message || "Error adding subject");
    } finally {
      setLoading(false);
    }
  };

  console.log({ selectedSubjects });

  return (
    <div>
        <button className="absolute top-1 right-1" onClick={processCloseModal}>X</button>
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
                className="flex items-center justify-between mb-2 text-[#797A7B]"
              >
                <div className="flex items-center">
                <input
                  type="checkbox"
                  disabled={topicItem?.isOffering === 1 && true}
                  checked={selectedSubjects.some(
                    (sub) =>
                      sub.topicId === topicItem?.id &&
                      sub.subjectId === subject?.id
                  )}
                  onChange={() => toggleSubject(topicItem?.id, subject?.id)}
                />
                <label className="ml-2 text-[11px]">{topicItem.title}</label>
              </div>
              {topicItem?.isOffering === 1 && <p className="m-o text-[10px] text-[#22C55F]">Offering</p>}
              <div></div>
              </div>
            ))}
          </div>
        ))
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={handleAddSubject}
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
