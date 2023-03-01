import Menu from './Components/LayoutArea/Menu/Menu';
import Footer from './Components/LayoutArea/Footer/Footer';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/Main/Main';

import './App.css';

function App() {
  return (
      <div className="App">
          <Header/>
          <Menu/>
          <Main/>
          <Footer/>
      </div>
  );
}

export default App;
