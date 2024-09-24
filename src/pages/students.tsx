/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "../component/modal";
import AddStudent from "../component/AddStudent";
import StudentProfile from "../component/StudentProfile";
import AssignSubjectModal from "../component/AssignSubjectModal";
import StudentList from "../component/StudentList";
import { toast } from "react-toastify";
import { Student } from "../types";
const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAssignCourseModal, setShowAssignCourseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [learnerId, setLearnerId] = useState(0);
  const [learnerDetails, setLearnerDetails] = useState<Student>({
    id: 0, 
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:4000/api/students/getAllStudents"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error: any) {
        toast.error(error.message || "Error fetching students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async (newStudent: Student) => {
    if(newStudent?.email ==="" &&  newStudent?.name ===""){
      toast.error("All field are required");
      return
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/students/addStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const addedStudent = await response.json();
      toast.success("Student added successfully");
      setStudents((prevStudents) => [...prevStudents, addedStudent]);
      setShowModal(false);
    } catch (err: any) {
      toast.error(err?.message || "Error adding user");
    } finally {
      setLoading(false);
    }
  };
  const processAssignClicked = async (e: number) => {
    setLearnerId(e);
    setShowAssignCourseModal(!showAssignCourseModal);
  };
  const processViewClicked = async (e: Student) => {
    setLearnerDetails(e);
    setShowProfileModal(!showAssignCourseModal);
  };

  //   const viewStudentTopics = (subject: Student) => {
  //     alert(`Viewing topics for ${subject?.title}`);
  //   };

  return (
    <div>
      <h1 className="text-2xl mb-4">Students</h1>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Add Student"}
      </button>
      <StudentList
        students={students}
        onViewClicked={(e) => processViewClicked(e)}
        onAssignClicked={(e) => processAssignClicked(e)}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={"Add Student"}
      >
        <AddStudent onAdd={handleAddStudent} />
      </Modal>
      <Modal
        isOpen={showProfileModal}
        showCloseBtn={true}
        onClose={() => setShowProfileModal(!showProfileModal)}
        title={""}
      >
        <StudentProfile learnerDetails={learnerDetails} />
      </Modal>

      <Modal
        isOpen={showAssignCourseModal}
        onClose={() => setShowAssignCourseModal(!showAssignCourseModal)}
        title={"Assign Subject"}
      >
        <AssignSubjectModal learner_id={learnerId} processCloseModal={() => setShowAssignCourseModal(!showAssignCourseModal)} />
      </Modal>
    </div>
  );
};

export default Students;
