/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { SubjectData, Student, SaveTopicProgress } from "../types";
import { toast } from "react-toastify";

interface AddSubjectModalProps {
  learnerDetails: Student;
}

const StudentProfile: React.FC<AddSubjectModalProps> = ({ learnerDetails }) => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [, setLessonProgress] = useState(0);
  const [lessonId, setLessonId] = useState(0);
  const [progressSkipper, setProgressSkipper] = useState(10);
  const [hideReader] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/subjects/getOfferingLesson/${learnerDetails?.id}`
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
  }, [learnerDetails]);

  // Function to handle progress updates
  const updateProgress = async (progress: any) => {
    const learnerId = learnerDetails?.id;
    const topicId = lessonId;

    try {
      const response = await fetch(
        "http://localhost:4000/api/topics/updateProgress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ learnerId, topicId, progress }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const updatedProgress = await response.json();
      const calcSkipper = updatedProgress?.progress + progress;
      setProgressSkipper(calcSkipper);
      toast.success("Progress updated successfully");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Function to handle when the video starts playing
  const handlePlay = (topicItem: SaveTopicProgress) => {
    setLessonProgress(topicItem?.progress);
    const calcSkipper = topicItem?.progress + progressSkipper;
    setProgressSkipper(calcSkipper);
    setLessonId(topicItem?.id);
  };

  // Function to handle time update (progress tracking)
  const handleTimeUpdate = (event: any) => {
    const videoElement = event.target;
    const progress = (videoElement.currentTime / videoElement.duration) * 100;

    // For example, update every 10% of video progress
    if (progress >= progressSkipper) {
      updateProgress(progress);
    }
  };

  // Function to handle when the video is paused
  const handlePause = () => {
    console.log("Video paused");
  };

  // Function to handle when the video ends
  const handleEnded = () => {
    console.log("Video ended");
    updateProgress(100); // Mark progress as 100% complete
  };

  console.log({ subjects });

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-1 w-full">
        <img
          className="w-[70px] h-[70px]"
          src="https://res.cloudinary.com/vaccinenudge/image/upload/v1693834787/Group_152_n0rhes.png"
          alt=""
        />
        <p className="block mb-0">{learnerDetails?.name}</p>
        <p className="block mb-2 text-xs text-[#797A7B]">
          {learnerDetails?.email}
        </p>
      </div>
      {loading ? (
        "loading"
      ) : (
        <div className="mt-4">
          {subjects.length === 0 ? (
            <p>No subjects found</p>
          ) : (
            subjects.map((subject: SubjectData, index: number) => (
              <div key={index} className="border-b border-gray-300 mb-2">
                <p className="semi-bold text-[13px]">{subject.title}</p>
                {subject?.topics.map((topicItem: any, index2: number) => (
                  <div key={index2} className="flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <p className="mb-0 text-xs text-[#797A7B]">
                          topic: {topicItem?.title}
                        </p>
                      </div>
                      <div>
                        {!hideReader && (
                          <p className="mb-0 text-xs text-[#797A7B]">
                            {/* {typeof topicItem?.progress === 'number' ? parseInt(topicItem.progress.toFixed(2)) : '0.00'}% */}
                            {parseInt(topicItem.progress)}%
                          </p>
                        )}
                      </div>
                    </div>
                    <video
                      id="video-player"
                      controls
                      src={topicItem?.video_url}
                      onPlay={() => handlePlay(topicItem)}
                      onTimeUpdate={handleTimeUpdate}
                      onPause={handlePause}
                      onEnded={handleEnded}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
