import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserIcon from "@mui/icons-material/Person";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import LisitingTable from "./ListingTable";
import UserTable from "./UserTable";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

export default function AdminDashboard({ window }) {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useDemoRouter("/dashboard"); // unconditionally
  const demoWindow = window ? window() : undefined;
  const NAVIGATION = [
    { kind: "header", title: "Main items" },
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => router.push("/admin/dashboard"),
    },
    {
      segment: "approvals",
      title: "Listing Status",
      icon: <CheckCircleIcon />,
      onClick: () => router.push("/admin/approvals"),
    },
    {
      segment: "users",
      title: "Users",
      icon: <UserIcon />,
      onClick: () => router.push("/admin/users"),
    },
    { kind: "divider" },
    { kind: "header", title: "Other items" },
    { segment: "settings", title: "Settings" },
    { segment: "help", title: "Help" },
    { segment: "about", title: "About" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, listingsRes] = await Promise.all([
          fetch("/api/user/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch("/api/listing/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (!usersRes.ok || !listingsRes.ok)
          throw new Error("Failed to fetch data");

        const [usersData, listingsData] = await Promise.all([
          usersRes.json(),
          listingsRes.json(),
        ]);

        setUsers(usersData);
        setListings(listingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(listings)
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const AdaptiveLogo = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
      alt="Logo"
      style={{ height: "40px", width: "auto" }}
    />
  );

  const ErrorDisplay = ({ message }) => (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500">{message}</p>
    </div>
  );

  const DemoPageContent = ({ pathname }) => {
    return (
      <Box sx={{ p: 3 }}>
        {pathname === "/dashboard" && (
          <Typography variant="h4">Welcome to the Admin Dashboard</Typography>
        )}
        {pathname === "/approvals" && (
          <>
            <Typography variant="h4">Lisitng Approval</Typography>

            <LisitingTable listings={listings}/>
          </>
        )}
        {pathname === "/users" && (
          <>
            <Typography variant="h4">User Management Section</Typography>
            <UserTable />
          </>
        )}
        {/* You can add more pages like settings/help/about here later if you want */}
      </Box>
    );
  };

  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  console.log(router.pathname);
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        branding={{
          logo: <AdaptiveLogo />,
          title: "AbdEsate",
          homeUrl: "/admin",
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

AdminDashboard.propTypes = {
  window: PropTypes.func,
};

AdminDashboard.defaultProps = {
  window: () => window,
};
