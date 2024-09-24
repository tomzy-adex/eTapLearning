import { useState } from "react";
// import { SaveTopic } from "../types";

interface AddTopicModalProps {
  onAdd: (topic: FormData) => void;
  loading: boolean;
}

const AddTopicModal: React.FC<AddTopicModalProps> = ({ onAdd, loading }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null); // Video file upload

  // Handle video file change
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (videoFile) {
      formData.append("video", videoFile); // Attach the video file to formData
    }

    onAdd(formData); // Send formData to parent component for API call
    setTitle("");
    setDescription("");
    setVideoFile(null);
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
      <div className="mt-4">
        <label className="block mb-2">Upload Video (Optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          // disabled={!!videoUrl} // Disable file input if a URL is provided
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          disabled={loading}
        >
          {loading ? "process..." : "Add Topic"}
        </button>
      </div>
    </div>
  );
};

export default AddTopicModal;
