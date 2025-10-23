// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/DailyAppoinment.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import Addtimeslot from "./addTimeslot";

// export default function DailyAppointment() {
//   const [timeslots, setTimeslots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   ); // Default to today's date
//   const [error, setError] = useState(null); // Track errors
//   const [appointments, setAppointments] = useState([]); // To store appointments
//   const [selectedSlotId, setSelectedSlotId] = useState(null); // Track selected timeslot ID
//   const [isLoading, setIsLoading] = useState(false); // New loading state
//   const Name = localStorage.getItem("Name");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [error1, setError1] = useState(null);

//   // Fetch timeslots based on selected date
//   useEffect(() => {
//     const fetchTimeslotsByDate = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/Timeslot/timeslotcard/${selectedDate}/${Name}`
//         );
//         setTimeslots(response.data);
//         setError(null); // Clear any previous errors
//         setError1(null);
//       } catch (error) {
//         setTimeslots([]); // Clear timeslots if an error occurs
//         setError("No timeslots available for the selected date.");
//         console.error("Error fetching timeslots:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Fetch timeslots whenever selectedDate changes
//     if (selectedDate) {
//       fetchTimeslotsByDate();
//     }
//   }, [selectedDate]);

//   // Fetch appointments based on selected timeslot ID
//   const handleViewAppointments = async (slotId) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Appointment/appointments/${slotId}`
//       );
//       setAppointments(response.data);
//       setSelectedSlotId(slotId); // Set the selected slot ID
//       setError1(false);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//       setError1("No appointments available for timeslot");
//       setAppointments([]); // Clear appointments if an error occurs
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddRecord = (patientId, appoinmentID, patientno) => {
//     navigate(`/dashboard/addrecord/${patientId}`, {
//       state: { appoinmentid: appoinmentID, channelnumber: patientno },
//     });
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value); // Update the date on change
//     setAppointments([]); // Clear the appointments when the date changes
//     setSelectedSlotId(null); // Reset the selected timeslot ID
//   };

//   return (
//     <div className="daily-appointment-container">
//       <h1 className="title">Appointments</h1>

//       <div className="date-picker">
//         <label htmlFor="date">Select Date: </label>
//         <input
//           type="date"
//           id="date"
//           value={selectedDate}
//           onChange={handleDateChange} // Trigger date change
//         />
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p> // Show error message if no timeslots
//       ) : (
//         <div className="timeslot-cards">
//           {timeslots.map((timeslot) => (
//             <div key={timeslot.MT_SLOT_ID} className="timeslot-card3">
//               <p>Doctor: {timeslot.MT_DOCTOR}</p>
//               <p>
//                 Timeslot:{" "}
//                 {new Date(
//                   `1970-01-01T${timeslot.MT_START_TIME}`
//                 ).toLocaleTimeString("en-LK", {
//                   timeZone: "Asia/Colombo",
//                   hour: "numeric",
//                   minute: "numeric",
//                   hour12: true,
//                 })}{" "}
//                 -{" "}
//                 {new Date(
//                   `1970-01-01T${timeslot.MT_END_TIME}`
//                 ).toLocaleTimeString("en-LK", {
//                   timeZone: "Asia/Colombo",
//                   hour: "numeric",
//                   minute: "numeric",
//                   hour12: true,
//                 })}
//               </p>
//               <button
//                 onClick={() => handleViewAppointments(timeslot.MT_SLOT_ID)}
//               >
//                 View Appointments
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedSlotId && (
//         <div className="appointment-table-container">
//           <h2>Appointments available for this timeslot</h2>

//           {/* <input type="search" placeholder="search using the patient name"/> */}
//           <table className="appointments-table">
//             <thead>
//               <tr>
//                 <th>Patient Name</th>
//                 <th>Contact</th>
//                 <th>Allocated time</th>
//                 <th>Patient number</th>
//                 <th>Action</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.length === 0 ? (
//                 <tr>
//                   <td colSpan="5">
//                     No appointments available for this timeslot
//                   </td>
//                 </tr>
//               ) : (
//                 appointments.map((appointment) => (
//                   <tr key={appointment.MAD_APPOINMENT_ID}>
//                     <td>{appointment.MAD_FULL_NAME}</td>
//                     <td>{appointment.MAD_CONTACT}</td>
//                     <td>
//                       {new Date(
//                         `1970-01-01T${appointment.MAD_ALLOCATED_TIME}`
//                       ).toLocaleTimeString("en-LK", {
//                         timeZone: "Asia/Colombo",
//                         hour: "numeric",
//                         minute: "numeric",
//                         hour12: true,
//                       })}
//                     </td>
//                     <td style={{ textAlign: "right" }}>
//                       {appointment.MAD_PATIENT_NO}
//                     </td>
//                     <td>
//                       <button
//                         className="action-button"
//                         onClick={() =>
//                           handleAddRecord(
//                             appointment.MAD_PATIENT_CODE,
//                             appointment.MAD_APPOINMENT_ID,
//                             appointment.MAD_PATIENT_NO
//                           )
//                         }
//                       >
//                         Add Treatment
//                       </button>
//                     </td>

//                     <td>
//                       {appointment.IsCompleted ? (
//                         <span className="completed-label">Completed</span>
//                       ) : (
//                         <span className="completed-label">Pending</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <p className="error-message">{error1}</p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Avatar,
  Badge,
  Divider,
  Snackbar,
  Alert,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  DateRange as DateRangeIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function DailyAppointment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [timeslots, setTimeslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const Name = localStorage.getItem("Name");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchTimeslotsByDate = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/Timeslot/timeslotcard/${selectedDate}/${Name}`
        );
        setTimeslots(response.data);
        setError(null);
      } catch (error) {
        setTimeslots([]);
        setError("No timeslots available for the selected date.");
        showSnackbar("No timeslots found for selected date", "info");
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedDate) {
      fetchTimeslotsByDate();
    }
  }, [selectedDate, Name]);

  const handleViewAppointments = async (slotId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Appointment/appointments/${slotId}`
      );
      setAppointments(response.data);
      setSelectedSlotId(slotId);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showSnackbar("No appointments available for this timeslot", "info");
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRecord = (patientId, appointmentID, patientNo) => {
    navigate(`/dashboard/addrecord/${patientId}`, {
      state: { appointmentid: appointmentID, channelnumber: patientNo, MTD_APPOINMENT_ID: appointmentID },
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setAppointments([]);
    setSelectedSlotId(null);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.MAD_FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-LK", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };


  const handleCancelAppointment = async (appointmentId) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/Appointment/cancel-appointment/${appointmentId}`
      );

      setAppointments(appointments.map(appt =>
        appt.MAD_APPOINMENT_ID === appointmentId
          ? { ...appt, MAD_STATUS: "I" }
          : appt
      ));

      showSnackbar("Appointment cancelled successfully", "success");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      showSnackbar("Failed to cancel appointment", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            fontWeight={600}
            align="center"
          >
            Daily Appointments
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              mb: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: isMobile ? "100%" : 250 }}
            />
          </Box>
        </Box>

        {isLoading && !selectedSlotId ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              {error}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
              >
                Available Timeslots
              </Typography>
              <Grid container spacing={2}>
                {timeslots.map((timeslot) => (
                  <Grid item xs={12} key={timeslot.MT_SLOT_ID}>
                    <Card
                      elevation={3}
                      sx={{
                        borderLeft:
                          selectedSlotId === timeslot.MT_SLOT_ID
                            ? `4px solid ${theme.palette.primary.main}`
                            : "none",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 4,
                        },
                      }}
                      onClick={() =>
                        handleViewAppointments(timeslot.MT_SLOT_ID)
                      }
                    >
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Avatar
                            sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Typography variant="subtitle1">
                            {timeslot.MT_DOCTOR}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TimeIcon color="action" sx={{ mr: 1 }} />
                          <Typography>
                            {formatTime(timeslot.MT_START_TIME)} -{" "}
                            {formatTime(timeslot.MT_END_TIME)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
          fullScreen={isMobile}
        >
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color="primary"
                fontWeight={600}
                align="center"
                sx={{ mb: -1 }}
              >
                Appointments
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "primary.main" }}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredAppointments.length === 0 ? (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No appointments found for this timeslot
              </Typography>
            ) : (
              <TableContainer>
                <Table size={isMobile ? "small" : "medium"}>
                  <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Patient</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>No.</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                      <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  {/* <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.MAD_APPOINMENT_ID} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                              {appointment.MAD_FULL_NAME.charAt(0)}
                            </Avatar>
                            {appointment.MAD_FULL_NAME}
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.MAD_CONTACT}</TableCell>
                        <TableCell>
                          {formatTime(appointment.MAD_ALLOCATED_TIME)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={appointment.MAD_PATIENT_NO}
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {appointment.IsCompleted ? (
                            <Chip
                              icon={<CheckCircleIcon fontSize="small" />}
                              label="Completed"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<PendingIcon fontSize="small" />}
                              label="Pending"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => {
                              handleAddRecord(
                                appointment.MAD_PATIENT_CODE,
                                appointment.MAD_APPOINMENT_ID,
                                appointment.MAD_PATIENT_NO
                              );
                              handleCloseModal();
                            }}
                            disabled={appointment.IsCompleted}
                          >
                            {isMobile ? "Add" : "Add Treatment"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}

                  {/*Add new button cancel for inactive the appointments */}
                  {/* <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.MAD_APPOINMENT_ID}
                        hover
                        sx={{
                          opacity: appointment.MAD_STATUS === "I" ? 0.6 : 1,
                          backgroundColor: appointment.MAD_STATUS === "I" ? theme.palette.action.disabledBackground : 'inherit'
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                              {appointment.MAD_FULL_NAME.charAt(0)}
                            </Avatar>
                            {appointment.MAD_FULL_NAME}
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.MAD_CONTACT}</TableCell>
                        <TableCell>
                          {formatTime(appointment.MAD_ALLOCATED_TIME)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={appointment.MAD_PATIENT_NO}
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {appointment.MAD_STATUS === "I" ? (
                            <Chip
                              label="Cancelled"
                              color="error"
                              size="small"
                            />
                          ) : appointment.IsCompleted ? (
                            <Chip
                              icon={<CheckCircleIcon fontSize="small" />}
                              label="Completed"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<PendingIcon fontSize="small" />}
                              label="Pending"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => {
                              handleAddRecord(
                                appointment.MAD_PATIENT_CODE,
                                appointment.MAD_APPOINMENT_ID,
                                appointment.MAD_PATIENT_NO
                              );
                              handleCloseModal();
                            }}
                            disabled={appointment.IsCompleted || appointment.MAD_STATUS === "I"}
                          >
                            {isMobile ? "Add" : "Add Treatment"}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<CloseIcon />}
                            onClick={() => handleCancelAppointment(appointment.MAD_APPOINMENT_ID)}
                            disabled={appointment.MAD_STATUS === "I"}
                          >
                            {isMobile ? "Cancel" : "Cancel Appt"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.MAD_APPOINMENT_ID}
                        hover
                        sx={{
                          opacity: appointment.MAD_STATUS === "I" ? 0.6 : 1,
                          backgroundColor: appointment.MAD_STATUS === "I" ? '#ffe6e6' : 'inherit'
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                              {appointment.MAD_FULL_NAME.charAt(0)}
                            </Avatar>
                            {appointment.MAD_FULL_NAME}
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.MAD_CONTACT}</TableCell>
                        <TableCell>
                          {formatTime(appointment.MAD_ALLOCATED_TIME)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={appointment.MAD_PATIENT_NO}
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {appointment.MAD_STATUS === "I" ? (
                            <Chip
                              label="Cancelled"
                              color="error"
                              size="small"
                            />
                          ) : appointment.TreatmentStatus === "C" ? (
                            <Chip
                              icon={<CheckCircleIcon fontSize="small" />}
                              label="Completed"
                              color="success"
                              size="small"
                            />
                          ) : appointment.TreatmentStatus === "P" ? (
                            <Chip
                              icon={<CheckCircleIcon fontSize="small" />}
                              label="Preparation Complete"
                              color="info"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<PendingIcon fontSize="small" />}
                              label="Pending"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => {
                              handleAddRecord(
                                appointment.MAD_PATIENT_CODE,
                                appointment.MAD_APPOINMENT_ID,
                                appointment.MAD_PATIENT_NO
                              );
                              handleCloseModal();
                            }}
                            disabled={appointment.MAD_STATUS === "I" || appointment.TreatmentStatus === "C"}
                          >
                            {isMobile ? "Add" : "Add Treatment"}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<CloseIcon />}
                            onClick={() => handleCancelAppointment(appointment.MAD_APPOINMENT_ID)}
                            disabled={appointment.MAD_STATUS === "I" || appointment.TreatmentStatus === "C"}
                          >
                            {isMobile ? "Cancel" : "Cancel Apptointment"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
