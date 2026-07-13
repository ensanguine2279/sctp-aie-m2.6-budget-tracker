import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import { Box, Typography, Card, CardContent, Stack } from "@mui/material";

function RunningBalanceChart() {
  const { filteredTransactions } = useBudgetTracker();

  // 1. Compute cumulative balances cleanly via an isolated loop sequence
  const chartData = [];
  let currentAccumulator = 0;

  for (const tx of filteredTransactions) {
    if (tx.type === "income") {
      currentAccumulator += tx.amount;
    } else {
      currentAccumulator -= tx.amount;
    }
    chartData.push({
      id: tx.id,
      description: tx.description,
      balance: currentAccumulator,
    });
  }

  if (chartData.length === 0) return null;

  // 2. Establish SVG dimensional baselines
  const svgWidth = 500;
  const svgHeight = 150;
  const padding = 25;

  const minBalance = Math.min(...chartData.map((d) => d.balance), 0); // Include 0 as a floor baseline
  const maxBalance = Math.max(...chartData.map((d) => d.balance), 1);
  const balanceRange = maxBalance - minBalance || 1;

  // 3. Map ledger data nodes to exact (X, Y) pixel coordinates
  const points = chartData.map((node, index) => {
    // Distribute X evenly across the horizontal timeline axis
    const x =
      chartData.length > 1
        ? padding + (index / (chartData.length - 1)) * (svgWidth - padding * 2)
        : svgWidth / 2;

    // Invert Y because SVG coordinates calculate 0 from the absolute top
    const y =
      svgHeight -
      padding -
      ((node.balance - minBalance) / balanceRange) * (svgHeight - padding * 2);

    return {
      id: node.id,
      x,
      y,
      balance: node.balance,
    };
  });

  // Convert coordinate objects into a clean space-separated string for the SVG vector compiler
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "none",
        mb: 4,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 3,
            borderBottom: "1px solid",
            borderColor: "grey.200",
            pb: 1.5,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Net Balance Vector Trend
          </Typography>
          <Typography variant="caption" color="text.secondary">
            SVG vector timeline tracking historical cumulative ledger liquidity
          </Typography>
        </Box>

        {/* Scalable Vector Graphics Wrapper Layout */}
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            width="100%"
            height="100%"
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Background Grid Guidelines */}
            <line
              x1={padding}
              y1={padding}
              x2={svgWidth - padding}
              y2={padding}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <line
              x1={padding}
              y1={svgHeight / 2}
              x2={svgWidth - padding}
              y2={svgHeight / 2}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={svgWidth - padding}
              y2={svgHeight - padding}
              stroke="#e5e7eb"
              strokeWidth="1"
            />

            {/* The Dynamic Trend Line */}
            {chartData.length > 1 ? (
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
              />
            ) : (
              // Fallback element if only one transaction exists
              <circle cx={points[0].x} cy={points[0].y} r="5" fill="#3b82f6" />
            )}

            {/* Interactive Coordinate Node Markers */}
            {points.map((pt) => (
              <g key={pt.id}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                {/* Micro numerical flags above coordinates */}
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill="#6b7280"
                >
                  ${(pt.balance ?? 0).toLocaleString()}
                </text>
              </g>
            ))}
          </svg>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RunningBalanceChart;
