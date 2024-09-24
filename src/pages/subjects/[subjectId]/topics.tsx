/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from "../../../component/modal";
import AddTopicModal from "../../../component/AddTopic";
import StudentCourseProfile from "../../../component/StudentCourseProfile";
import TopicList from "../../../component/TopicList";
import { toast } from 'react-toastify';
import { Topic } from "../../../types";

const Topics: React.FC = () => {
  const router = useRouter();
  const { subjectId } = router.query;
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [learnerDetails, setLearnerDetails] = useState<Topic | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://e-tap-learning.vercel.app/api/topics/${subjectId}/topics`);
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTopics(data);
      } catch (error: any) {
        toast.error(error.message || 'Error fetching topics');
      } finally {
        setLoading(false);
      }
    };
    if (subjectId) fetchTopics();
  }, [subjectId]);

  const handleAddTopic = async (newTopic: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://e-tap-learning.vercel.app/api/topics/${subjectId}/addTopicWithUploader`, {
        method: 'POST',
        body: newTopic, // Send form data directly (no JSON.stringify)
      });

      if (!response.ok) {
        throw new Error('Failed to add topic');
      }

      const addedTopic = await response.json();
      toast.success("Topic added successfully");
      setTopics((prevTopics) => [...prevTopics, addedTopic]);
      setShowModal(false);
    } catch (err: any) {
      toast.error(err?.message || "Error adding topic");
    } finally {
      setLoading(false);
    }
  };

  const handleViewTopic = (topic: Topic) => {
    setLearnerDetails(topic);
    setShowProfileModal(true);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Topics</h1>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Add Topic'}
      </button>
      <TopicList topics={topics} handleViewTopics={handleViewTopic} />
     
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={"Add Topic"}>
        <AddTopicModal onAdd={handleAddTopic} loading={loading} />
      </Modal>

      <Modal
        isOpen={showProfileModal}
        showCloseBtn={true}
        onClose={() => setShowProfileModal(false)}
        title={"Ranking"}
      >
        <StudentCourseProfile learnerDetails={learnerDetails} />
      </Modal>
    </div>
  );
};

export default Topics;
