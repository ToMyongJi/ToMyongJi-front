import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MyPage from './pages/MyPage';
import Find from './pages/login/Find';
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import ReceiptsList from './pages/receipt/ReceiptsList';
import CreateReceipt from './pages/receipt/CreateReceipt';
import NotLogin from './pages/NotLogin';

const App = () => {
  return (
    <div className="w-[100vw] h-[auto] bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/receipts-list" element={<ReceiptsList />} />
        <Route path="/create-receipt" element={<CreateReceipt />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/not-login" element={<NotLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
