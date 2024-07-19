import './App.css';
import "pepsico-ds/css";
import HeaderSignIn from './components/HeaderSignIn';
import BasicForm from './components/BasicForm';

function App() {
  return (
    <div className= 'container'>
      <HeaderSignIn/>
    <div className='card'>
          <BasicForm/>
    </div>
  </div>
    
  );
}

export default App;
