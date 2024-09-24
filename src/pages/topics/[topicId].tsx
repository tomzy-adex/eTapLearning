
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Topic = {
  title: string;
  description: string;
  video_url: string;
};

export default function TopicDetails() {
  const router = useRouter();
  const { topicId } = router.query;
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    if (topicId) {
      axios.get(`https://e-tap-learning.vercel.app/api/topics/${topicId}`)
        .then((res) => setTopic(res.data))
        .catch((err) => console.error(err));
    }
  }, [topicId]);

  return (
    <div className="p-4">
      {topic && (
        <>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="mt-2">{topic.description}</p>
          <video controls className="mt-4">
            <source src={topic.video_url} type="video/mp4" />
          </video>
        </>
      )}
    </div>
  );
}
