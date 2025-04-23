import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import { Outlet, Route, Routes } from 'react-router-dom';

function Layout(){
  return(
    <div className='flex flex-col h-screen justify-between'>
      <NavBar />
      <main className='w-10/12 max-w-4xl mx-auto mb-auto'>
        <Outlet />
      </main>
      <Footer />

    </div>
  )
}

function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>

          {/*로그인과 상관없이 갈 수 있는 경로*/}
          <Route index element={<LandingPage />} />

          {/*로그인한 사람은 갈 수 없는 경로*/}
          {/* <Route element={<NotAuthRoutes />}> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          {/* </Route> */}

          {/* 로그인한 사람만 진입 가능한 경로 */}
          {/* <Route>
            <Route path="/product/upload" element={<UploadProductPage/>} />
            <Route path="/product/:productId" element={<DetailProductPage/>} />
            <Route path="/user/cart" element={<CartPage/>} />
            <Route path="/history" element={<HistoryPage/>} />
          </Route> */}
          
        </Route>
    </Routes>
  );
}

export default App
