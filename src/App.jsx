import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MyPage from './pages/MyPage';
import Find from './pages/login/Find';
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import ReceiptsList from './pages/receipt/ReceiptsList';
import CreateReceipt from './pages/receipt/CreateReceipt';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/find" element={<Find />} />
      <Route path="/receipts-list" element={<ReceiptsList />} />
      <Route path="/create-receipt" element={<CreateReceipt />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
