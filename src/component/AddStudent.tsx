import { useState } from "react";

type Subject = {
  name: string;
  email: string;
};

interface AddSubjectModalProps {
  onAdd: (subject: Subject) => void;
}

const AddStudent: React.FC<AddSubjectModalProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    onAdd({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
