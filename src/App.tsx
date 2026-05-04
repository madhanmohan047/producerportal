import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/dashboard";
import AccountsDetails from "./pages/AccountDetails/AccountsDetails";
import PoliciesPage from "./pages/PolicyDetails/PoliciesPage";
import QuotesPage from "./pages/Quotes/QuotesPage";


function App() {
  return (
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Dashboard />}/>
       <Route path="/accounts" element={<AccountsDetails />}/>
       <Route path="/policies" element={<PoliciesPage />}/>
       <Route path="/quotes" element={<QuotesPage />}/>
     </Routes>
    </BrowserRouter>

  );
}

export default App;
