import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Exams from './components/Exams';
import NavBar from './components/NavBar';
import NewExam from './components/NewExam';
import AllExams from './components/AllExams';
import OneExam from './components/OneExam';
import EditExam from './components/EditExam';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Navigate to='/exams' />} />
          <Route path='/exams' element={<Exams />}>
            <Route index element={<AllExams />} />
            <Route path='new' element={<NewExam />} />
            <Route path=':id' element={<OneExam />} />
            <Route path=':id/edit' element={<EditExam />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}
export default App;