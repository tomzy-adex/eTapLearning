// import { useRouter } from 'next/router';
import { Topic } from "../types";


interface TopicListProps {
  topics: Topic[];
  handleViewTopics: (Topic: Topic) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, handleViewTopics }) => {
  // const router = useRouter();

  // const handleViewTopics = (topicId: number) => {
  //   router.push(`/subjects/${topicId}/topics`);
  // };

  return (
    <div>
      {topics.length > 0 ? (
        <table className="min-w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((subject: Topic, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{subject.title}</td>
                <td className="py-2 px-4 border-b text-center">{subject.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (subject.id !== undefined) {
                        handleViewTopics(subject);
                      } else {
                        console.error("Subject ID is undefined.");
                      }
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No topics available.</p>
      )}
    </div>
  );
};

export default TopicList;
