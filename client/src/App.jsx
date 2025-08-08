// // client/src/App.jsx
// import { lazy, Suspense } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { SpeedInsights } from "@vercel/speed-insights/react";

// import Loader from './animations/Loader';

// // --- Lazy-loaded page components ---
// const Login = lazy(() => import('./pages/Login'));
// const Home = lazy(() => import('./pages/Home'));
// const Signup = lazy(() => import('./pages/Signup'));
// const AddEditNotes = lazy(() => import('./pages/AddEditNotes'));

// const App = () => {
//   return (
//     <>
//       <SpeedInsights />
//       <Router>
//         <Suspense fallback={<Loader />}>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//             {/* Authenticated Routes (or Protected Routes) */}
//             <Route path="/dashboard" element={<Home />} />
//             <Route path="/add" element={<AddEditNotes />} />
//             <Route path="/edit/:id" element={<AddEditNotes />} />

//             {/* Catch-all route for undefined paths, redirects to the home/login page */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// };

// export default App;


// client/src/App.jsx
import { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Loader from './animations/Loader';

// --- Lazy-loaded page components ---
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const AddEditNotes = lazy(() => import('./pages/AddEditNotes'));
const ResetPassword = lazy(() => import('./pages/ResetPassword')); // Import the new ResetPassword component

const App = () => {
    return (
        <>
            <SpeedInsights />
            <Router>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} /> {/* New Reset Password Route */}

                        {/* Authenticated Routes (or Protected Routes) */}
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/add" element={<AddEditNotes />} />
                        <Route path="/edit/:id" element={<AddEditNotes />} />

                        {/* Catch-all route for undefined paths, redirects to the home/login page */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
};

export default App;
