import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

function Exams() {
  const [exams, setExams] = useState([]);
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('http://localhost:5001/api/exams', { signal: controller.signal })
      .then(res => {
        setExams(res.data);
        setFlag(!flag)
      })
      .catch(err => console.log(err))
    return () => controller.abort();
  }, [flag]);

  return (
    <div>
      <Outlet context={{exams, flag, setFlag }} />
    </div>
  )
}
export default Exams;