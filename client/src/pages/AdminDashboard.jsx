import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  {
    segment: "approvals",
    title: "Approvals",
    icon: <CheckCircleIcon />,
  },
  { kind: "divider" },

  { kind: "header", title: "Other items" },
  { segment: "settings", title: "Settings" },
  { segment: "help", title: "Help" },
  { segment: "about", title: "About" },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

const DemoPageContent = ({ pathname }) => (
  <Box
    sx={{
      py: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Typography>Dashboard content for {pathname}</Typography>
  </Box>
);

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};
// ... (previous imports remain the same)

// ... (previous imports remain the same)

export default function AdminDashboard({ window }) {
  // ✅ All hooks at the top (unconditional)
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useDemoRouter("/dashboard"); // Must be called unconditionally
  const demoWindow = window ? window() : undefined;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listing/get", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  const AdaptiveLogo = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" // Replace with your logo URL
      alt="Logo"
      style={{ height: "40px", width: "auto" }}
    />
  );
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

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
          homeUrl: "/admin/dashboard",
        }}
      >
        <DemoPageContent pathname={router.pathname} />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Listings</Typography>
          <ul>
            {listings.map((listing) => (
              <li key={listing._id}>{listing.title}</li>
            ))}
          </ul>
        </Box>
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
