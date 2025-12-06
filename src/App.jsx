import GlobalStyles from "./styles/GlobalStyles";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/checkin";
import ProtectedRoute from "./ui/ProtectedRoute";

// const StyledApp = styled.div`
//   background-color: white;
//   padding: 20px;
// `;
// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">The Wild Oasis</Heading>

//             <div>
//               <Heading as="h2">Check in and out</Heading>
//               <Button onClick={() => alert("Hi")}>Check In</Button>
//               <Button onClick={() => alert("Hi")}>Check Out</Button>
//             </div>
//           </Row>
//           <Row>
//             <Heading as="h2">Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of guests" />
//               <Input type="number" placeholder="Number of guests" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 1000 },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "bookings",
        element: <Bookings />,
      },

      {
        path: `bookings/:id`,
        element: <Booking />,
      },
      {
        path: `checkin/:id`,
        element: <Checkin />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "users",
        element: <NewUsers />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* proving some options to our toasts */}
      {/*gutter :  which is the space between window and toaster message  */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
