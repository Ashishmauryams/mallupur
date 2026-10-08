import React, { useEffect, useState } from "react";
import {
    Box, Card, CardContent, Typography, Grid, Chip, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import { LineChart, BarChart, PieChart, } from "@mui/x-charts";
import { People, ReportProblemOutlined, CheckCircle, PendingActions } from "@mui/icons-material";

import "./Dashboard.scss";
import { getTotalNumber } from "../../api/apiService";
import Loader from "../reuseableCopmonent/loader/Loader";


const userData = [
    { month: "Jan", users: 40 },
    { month: "Feb", users: 65 },
    { month: "Mar", users: 85 },
    { month: "Apr", users: 110 },
    { month: "May", users: 145 },
    { month: "Jun", users: 180 },
    { month: "Jul", users: 210 },
    { month: "Aug", users: 250 },
];


const complaintData = [
    { month: "Jan", complaints: 12 },
    { month: "Feb", complaints: 18 },
    { month: "Mar", complaints: 15 },
    { month: "Apr", complaints: 28 },
    { month: "May", complaints: 22 },
    { month: "Jun", complaints: 35 },
    { month: "Jul", complaints: 30 },
    { month: "Aug", complaints: 42 },
];


const recentComplaints = [
    {
        id: 1,
        user: "Rahul Maurya",
        category: "Water",
        status: "Pending",
        date: "10 Sep 2026",
    },
    {
        id: 2,
        user: "Amit Kumar",
        category: "Road",
        status: "Resolved",
        date: "09 Sep 2026",
    },
    {
        id: 3,
        user: "Pooja Singh",
        category: "Street Light",
        status: "In Progress",
        date: "09 Sep 2026",
    },
    {
        id: 4,
        user: "Ravi Yadav",
        category: "Electricity",
        status: "Resolved",
        date: "08 Sep 2026",
    },
    {
        id: 5,
        user: "Anjali Verma",
        category: "Sanitation",
        status: "Pending",
        date: "08 Sep 2026",
    },
];


const getStatusColor = (status) => {
    switch (status) {
        case "Resolved":
            return "success";

        case "Pending":
            return "warning";

        case "In Progress":
            return "info";

        default:
            return "default";
    }
};


const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [totalData, setTotalData] = useState({});

    useEffect(() => {
        fetchTotalData();
    }, []);

    const fetchTotalData = async () => {

        try {
            setLoading(true);

            const resp = await getTotalNumber();

            if (resp?.status === 200) {
                setTotalData(resp?.data);
            }

        } catch (err) {
            console.log("eer", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Box className="dashboard">

            {/* Header */}

            <Box className="dashboard-header">

                <Box>
                    <Typography
                        variant="h4"
                        className="dashboard-title"
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        variant="body2"
                        className="dashboard-subtitle"
                    >
                        Welcome back, Admin. Here's what's happening
                        in your village.
                    </Typography>
                </Box>

                <Typography className="dashboard-date">
                    10 September 2026
                </Typography>

            </Box>


            {/* Summary Cards */}

            <Grid container spacing={2.5} className="stats-grid">

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card className="stat-card">
                        {loading ? <div className="dashLoader"><Loader /></div> :
                            <CardContent>

                                <Box className="stat-top">
                                    <Box className="stat-icon">
                                        <People />
                                    </Box>

                                    <Typography className="stat-growth">
                                        +12.5%
                                    </Typography>
                                </Box>

                                <Typography className="stat-value">
                                    {totalData?.totalUsers}
                                </Typography>

                                <Typography className="stat-label">
                                    Total Users
                                </Typography>

                            </CardContent>
                        }
                    </Card>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card className="stat-card">
                        {loading ? <div className="dashLoader"><Loader /></div> :
                            <CardContent>

                                <Box className="stat-top">
                                    <Box className="stat-icon">
                                        <ReportProblemOutlined />
                                    </Box>

                                    <Typography className="stat-growth">
                                        +8.2%
                                    </Typography>
                                </Box>

                                <Typography className="stat-value">
                                    {totalData?.totalProblems}
                                </Typography>

                                <Typography className="stat-label">
                                    Total Complaints
                                </Typography>

                            </CardContent>
                        }
                    </Card>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card className="stat-card">
                        {loading ? <div className="dashLoader"><Loader /></div> :
                            <CardContent>

                                <Box className="stat-top">
                                    <Box className="stat-icon">
                                        <PendingActions />
                                    </Box>

                                    <Typography className="stat-growth warning">
                                        24
                                    </Typography>
                                </Box>

                                <Typography className="stat-value">
                                    {totalData?.pendingProblems}
                                </Typography>

                                <Typography className="stat-label">
                                    Pending Complaints
                                </Typography>

                            </CardContent>
                        }
                    </Card>
                </Grid>


                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card className="stat-card">
                        {loading ? <div className="dashLoader"><Loader /></div> :
                            <CardContent>

                                <Box className="stat-top">
                                    <Box className="stat-icon">
                                        <CheckCircle />
                                    </Box>

                                    <Typography className="stat-growth">
                                        72.1%
                                    </Typography>
                                </Box>

                                <Typography className="stat-value">
                                    {totalData?.resolvedProblems}
                                </Typography>

                                <Typography className="stat-label">
                                    Resolved Complaints
                                </Typography>

                            </CardContent>
                        }
                    </Card>
                </Grid>

            </Grid>


            {/* Charts */}

            <Grid container spacing={2.5} className="charts-grid">

                {/* User Growth */}

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card className="chart-card">

                        <CardContent>

                            <Box className="chart-header">

                                <Box>
                                    <Typography className="chart-title">
                                        User Registration
                                    </Typography>

                                    <Typography className="chart-subtitle">
                                        Monthly user growth
                                    </Typography>
                                </Box>

                                <Chip
                                    label="This Year"
                                    size="small"
                                />

                            </Box>


                            <LineChart
                                xAxis={[
                                    {
                                        scaleType: "point",
                                        data: userData.map(
                                            item => item.month
                                        ),
                                    },
                                ]}
                                series={[
                                    {
                                        data: userData.map(
                                            item => item.users
                                        ),
                                        label: "Users",
                                        area: true,
                                    },
                                ]}
                                height={320}
                                margin={{
                                    left: 50,
                                    right: 20,
                                    top: 30,
                                    bottom: 30,
                                }}
                                grid={{
                                    horizontal: true,
                                }}
                            />

                        </CardContent>

                    </Card>
                </Grid>


                {/* Complaint Status */}

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card className="chart-card">

                        <CardContent>

                            <Typography className="chart-title">
                                Complaint Status
                            </Typography>

                            <Typography className="chart-subtitle">
                                Current complaint overview
                            </Typography>


                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {
                                                id: 0,
                                                value: 24,
                                                label: "Pending",
                                            },
                                            {
                                                id: 1,
                                                value: 20,
                                                label: "In Progress",
                                            },
                                            {
                                                id: 2,
                                                value: 42,
                                                label: "Resolved",
                                            },
                                        ],
                                        innerRadius: 55,
                                        outerRadius: 105,
                                        paddingAngle: 3,
                                    },
                                ]}
                                height={300}
                            />

                        </CardContent>

                    </Card>
                </Grid>


                {/* Monthly Complaints */}

                <Grid size={{ xs: 12 }}>
                    <Card className="chart-card">

                        <CardContent>

                            <Typography className="chart-title">
                                Monthly Complaints
                            </Typography>

                            <Typography className="chart-subtitle">
                                Complaint activity over the last 8 months
                            </Typography>


                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        data: complaintData.map(
                                            item => item.month
                                        ),
                                    },
                                ]}
                                series={[
                                    {
                                        data: complaintData.map(
                                            item => item.complaints
                                        ),
                                        label: "Complaints",
                                    },
                                ]}
                                height={320}
                                grid={{
                                    horizontal: true,
                                }}
                                margin={{
                                    left: 50,
                                    right: 20,
                                    top: 30,
                                    bottom: 30,
                                }}
                            />

                        </CardContent>

                    </Card>
                </Grid>

            </Grid>


            {/* Recent Complaints */}

            <Card className="table-card">

                <CardContent>

                    <Box className="table-header">

                        <Box>
                            <Typography className="chart-title">
                                Recent Complaints
                            </Typography>

                            <Typography className="chart-subtitle">
                                Latest complaints submitted by villagers
                            </Typography>
                        </Box>

                    </Box>


                    <TableContainer>

                        <Table>

                            <TableHead>
                                <TableRow>

                                    <TableCell>
                                        User
                                    </TableCell>

                                    <TableCell>
                                        Category
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                </TableRow>
                            </TableHead>


                            <TableBody>

                                {recentComplaints.map((complaint) => (

                                    <TableRow key={complaint.id}>

                                        <TableCell>
                                            {complaint.user}
                                        </TableCell>

                                        <TableCell>
                                            {complaint.category}
                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={complaint.status}
                                                color={getStatusColor(
                                                    complaint.status
                                                )}
                                                size="small"
                                            />

                                        </TableCell>

                                        <TableCell>
                                            {complaint.date}
                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </CardContent>

            </Card>

        </Box>
    );
};

export default Dashboard;