export type Subject = {
    id?: number; 
    title: string;
    description: string;
  };
export type Student = {
    id?: number; 
    name: string;
    email: string;
  };
  
export type Topic = {
    id?: number; 
    title: string;
    description: string;
  };
export type SaveTopic = {
    id?: number; 
    title: string;
    description: string;
    video_url: string;
  };
export type SaveTopicProgress = {
    id: number; 
    title: string;
    description: string;
    video_url: string;
    progress: number;
  };

export type TopicData = {
    id: number;
    title: string;
    description: string;
    video_url: string;
    isOffering: number;
  };
  
  export type SubjectData = {
    id: number;
    title: string;
    description: string;
    topics: Topic[];
  };
  export type UserOfferingTopic = {
    learner_id: number;
    learner_name: string;
    learner_email: string;
    progress: number;
    completed: boolean;
    subject: {
      subject_id: number;
      subject_title: string;
    };
    topic: {
      topic_id: number;
      topic_title: string;
    };
  };
  export type UserOfferingTopicList = UserOfferingTopic[]
  
  