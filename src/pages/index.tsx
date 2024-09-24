import { useEffect, useState } from 'react';
import axios from 'axios';

type Subject = {
  id: number;
  title: string;
};

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/subjects')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Subjects</h1>
      <ul className="mt-4 space-y-2">
        {subjects.map((subject) => (
          <li key={subject.id} className="p-2 border rounded hover:bg-gray-100">
            <a href={`/subjects/${subject.id}/topics`} className="text-blue-500">{subject.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
