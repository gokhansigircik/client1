import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function OneExam() {
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
    <div>
      <h2>Exam Details</h2>
      <div className="card mb-3">
        {exam && (
          <>
            {exam.cover && (
              <img src={exam.cover} alt={exam.title} className="card-img-top" />
            )}
            <div className="card-body"> 
              <h2>{exam.title}</h2>
              <h3>{exam.artist}</h3>
              {exam.type && <p>{exam.type}</p>}
              <p>{exam.description}</p>
              {exam.genre1 && (
                <span className="badge text-bg-primary me-2">
                  {exam.genre1}
                </span>
              )}
              {exam.genre2 && (
                <span className="badge text-bg-primary me-2">
                  {exam.genre2}
                </span>
              )}
              {exam.genre3 && (
                <span className="badge text-bg-primary">{exam.genre3}</span>
              )}
            </div>
          </>
        )}
        <div className="card-footer d-flex justify-content-end">
          <Link
            to={`/exams/${id}/edit`}
            className="btn btn-sm btn-warning me-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(exam._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default OneExam;
