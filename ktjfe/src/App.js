import logo from './logo.svg';
import './App.css';
import Modal2 from '../src/Components/Login copy/components/Modal';

function App() {
  return (
    <div className="App">
      {true && (
        <Modal2 showToast={showToast} setOpenModal={toggleLoginModal} />
      )}
    </div>
  );
}

export default App;
