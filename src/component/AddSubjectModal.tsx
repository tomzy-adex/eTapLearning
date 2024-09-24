import { useState } from 'react';

// Define the Subject type
type Subject = {
  title: string;
  description: string;
};

// Define the props type for AddSubjectModal
interface AddSubjectModalProps {
  onAdd: (subject: Subject) => void; // The onAdd function takes a Subject object and returns void
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = () => {
    onAdd({ title, description }); // Call the onAdd function with the new subject
    setTitle(''); // Reset the title input
    setDescription(''); // Reset the description input
  };

  return (
    <div>
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className='flex justify-center items-center'>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Add Subject
      </button>
      </div>
      
    </div>
  );
};

export default AddSubjectModal;
