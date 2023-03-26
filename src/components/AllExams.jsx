import {
  Link,
  useOutletContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function AllExams() {
  const { exams } = useOutletContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5001/api/exams/${id}`, {
        signal: controller.signal,
      })
      .then((res) => setExam(res.data))
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/api/exams/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/exams");
      })
      .catch((err) => console.log(err));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title:</th>
          <th>Artist:</th>
          <th>Owned?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams &&
          exams.map((exam) => {
            return (
              <tr key={exam._id}>
                <td>
                  <Link to={`/exams/${exam._id}`}>{exam.title}</Link>
                </td>
                <td>{exam.artist}</td>
                <td>{exam.isOwned ? "Yes" : "No"}</td>
                <td>
                  <Link className="btn btn-sm btn-warning me-2" to={`/exams/${exam._id}/edit`}>Edit</Link>{" "}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(exam._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
export default AllExams;
