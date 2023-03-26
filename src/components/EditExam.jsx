import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";


function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flag, setFlag } = useOutletContext();
  const [formExam, setFormExam] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5001/api/exams/${id}`, {signal: controller.signal})
      .then(res => setFormExam(res.data))
      .catch(err => console.log(err));
    return () => controller.abort();
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/api/exams/${id}`, formExam)
      .then((res) => {
        console.log(res.data);
        setFlag(!flag); 
        setErrors(null);
        navigate(`/exams/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err?.response?.data?.errors);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isOwned") {
      setFormExam({
        ...formExam,
        isOwned: e.target.checked,
      });
    } else {
      setFormExam({
        ...formExam,
        [name]: value,
      });
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h1>Edit Animal</h1>
        { formExam &&
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control form-control"
              value={formExam.title}
              onChange={handleChange}
            />
            {errors?.title && (
              <span className="form-text text-danger">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="artist" className="form-label">
              Artist:
            </label>
            <input
              type="text"
              name="artist"
              id="artist"
              className="form-control form-control"
              value={formExam.artist}
              onChange={handleChange}
            />
            {errors?.artist && (
              <span className="form-text text-danger">
                {errors.artist.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formExam.description}
              onChange={handleChange}
            ></textarea>
            {errors?.description && (
              <span className="form-text text-danger">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="cover" className="form-label">
              Cover Image (URL):
            </label>
            <input
              type="text"
              name="cover"
              id="cover"
              className="form-control form-control"
              value={formExam.cover}
              onChange={handleChange}
            />
            {errors?.cover && (
              <span className="form-text text-danger">
                {errors.cover.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Exam Type:
            </label>
            <select
              name="type"
              id="type"
              className="form-select"
              value={formExam.type}
              onChange={handleChange}
            >
              <option value="none">Select Type:</option>
              <option value="Exam 1">Exam 1</option>
              <option value="Exam 2">Exam 2</option>
              <option value="Exam 3">Exam 3</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Genres (Optional):</h6>
                <div className="mb-3">
                  <label htmlFor="genre1" className="form-label">
                    Genre 1:
                  </label>
                  <input
                    type="text"
                    name="genre1"
                    id="genre1"
                    className="form-control form-control"
                    value={formExam.genre1}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre2" className="form-label">
                    Genre 2:
                  </label>
                  <input
                    type="text"
                    name="genre2"
                    id="genre2"
                    className="form-control form-control"
                    value={formExam.genre2}
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="genre3" className="form-label">
                  Genre 3:
                </label>
                <input
                  type="text"
                  name="genre3"
                  id="genre3"
                  className="form-control form-control"
                  value={formExam.genre3}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="isOwned"
              id="isOwned"
              className="form-check-input"
              checked={formExam.isOwned}
              onChange={handleChange}
            />
            <label htmlFor="isOwned" className="form-check-label">
              Owned?
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Add Exam
            </button>
          </div>
        </form>}
      </div>
    </div>
  );
}
export default EditExam;