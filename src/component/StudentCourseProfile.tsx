/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Topic, UserOfferingTopicList, UserOfferingTopic } from "../types";
import { toast } from "react-toastify";

interface AddSubjectModalProps {
  learnerDetails: Topic | null;
}

const StudentCourseProfile: React.FC<AddSubjectModalProps> = ({
  learnerDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<UserOfferingTopicList>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://e-tap-learning.vercel.app/api/topics/${learnerDetails?.id}/users`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data: UserOfferingTopicList = await response.json();
        setSubjects(data);
      } catch (error: any) {
        toast.error(error?.message || "Error fetching subjects");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [learnerDetails]);

  console.log({ subjects });

  return (
    <div>
      
      {loading ? (
        "loading"
      ) : (
        <div className="mt-4">
          {subjects.length === 0 ? (
            <p>No record found</p>
          ) : (
            subjects.map((subject: UserOfferingTopic, index: number) => (
              <div key={index} className="border-b border-gray-300 mb-2">
                <div className="flex justify-between">
                <p className="semi-bold text-[13px]">{subject?.learner_name}</p>
                <p className="mb-0 text-xs text-[#666]">
                  {subject?.subject?.subject_title}
                </p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="mb-0 text-xs text-[#797A7B]">
                     Title: {subject?.topic?.topic_title}
                    </p>
                  </div>
                  <div>
                    <p className="mb-0 text-xs text-[#000]">
                      {subject?.progress}%
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCourseProfile;
