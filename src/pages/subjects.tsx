/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Modal from "../component/modal";
import AddSubject from "../component/AddSubject";
import SubjectList from "../component/SubjectList";
import { toast } from 'react-toastify';
import { Subject } from "../types"; // Import the Subject type

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://etaplearningapi.onrender.com/api/subjects/getAllSubjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data); // Set subjects from the response
      } catch (error: any) {
        toast.error(error.message || 'Error fetching subjects');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleAddSubject = async (newSubject: Subject) => {
    setLoading(true);
    try {
      const response = await fetch('https://etaplearningapi.onrender.com/api/subjects/addSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        throw new Error('Failed to add subject');
      }

      const addedSubject = await response.json();
      toast.success("Subject added successfully");
      setSubjects((prevSubjects) => [...prevSubjects, addedSubject]); // Update the subject list with the newly added one
      setShowModal(false); // Close modal after success
    } catch (err: any) {
      toast.error(err?.message || "Error adding subject");
    } finally {
      setLoading(false);
    }
  };

//   const viewSubjectTopics = (subject: Subject) => {
//     alert(`Viewing topics for ${subject?.title}`);
//   };

  return (
    <div>
      <h1 className="text-2xl mb-4">Subjects</h1>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Add Subject'}
      </button>
      <SubjectList subjects={subjects}/>
     
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={"Add Subject"}>
        <AddSubject onAdd={handleAddSubject} />
      </Modal>
    </div>
  );
};

export default Subjects;
