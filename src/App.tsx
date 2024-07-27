import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';


const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="*" element={<h1>Not found!</h1>}/>
    </Routes>
  </Layout>
);

export default App
