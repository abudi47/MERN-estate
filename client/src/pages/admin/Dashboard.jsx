import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function Dashboard({ listings, users }) {
  const theme = useTheme(); // Access the current theme

  // Process data for the pie chart
  const salesCount = listings.filter(
    (listing) => listing.type === "sale"
  ).length;
  const rentsCount = listings.filter(
    (listing) => listing.type === "rent"
  ).length;

  const pieData = [
    { id: "Sales", value: salesCount },
    { id: "Rents", value: rentsCount },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3, // Space between cards
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      {/* Total Users Card */}
      <Card
        sx={{
          minWidth: 275,
          flex: "1 1 calc(33% - 16px)", // Responsive width

          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total Users
          </Typography>
          <Typography variant="h4" color="primary">
            {users?.length || 0}
          </Typography>
        </CardContent>
      </Card>

      {/* Total Listings Card */}
      <Card
        sx={{
          minWidth: 275,
          flex: "1 1 calc(33% - 16px)", // Responsive width

          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total Listings
          </Typography>
          <Typography variant="h4" color="primary">
            {listings?.length || 0}
          </Typography>
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card
        sx={{
          minWidth: 600,
          flex: "1 1 100%", // Full width for the chart

          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
              : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
              margin: "0 auto",
              width: "fit-content",
             
            }}
          >
            Listings Breakdown
          </Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value} ${item.id}`, // Show the count
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
                data: pieData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
              },
            }}
            width={300}
            height={300}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
