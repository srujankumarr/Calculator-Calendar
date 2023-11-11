import Signup from "./components/login/Signup";
import Dashboard from './components/Dashboard/Dashboard';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import SGPACalculator from './components/Calculator/SGPA-Calculator';
import CGPACalculator from './components/Calculator/CGPA-Calculator';
import History from './components/History/History';
import Error from "./components/Error";
function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Signup />
    },
    {
      path: 'https://cgpacalculator-calendar.netlify.app/dashboard', element: <Dashboard />, errorElement: <Error />,
      children: [
        {
          path: 'sgpa-calculator', element: <SGPACalculator />
        },
        { path: 'cgpa-calculator', element: <CGPACalculator /> },
        {
          path: 'history', element: <History />
        },
        {
          path: 'calendar', element: <Calendar />
        }
      ]
    },

  ])

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
