// //Admin Part of Medical History Page

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/addPatient.css";
// import "../styles/medicalhistory.css";
// import Addpatient from "../components/addPatients";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/footer";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function MedicalHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [popup, setPopup] = useState(null);
//   const [treatmentPopup, setTreatmentPopup] = useState(null);
//   const navigate = useNavigate();
//   const [patientPopup, setPatientPopup] = useState(null);
//   const [personaldetails, setPersonaldetails] = useState(null);

//   const [remarkpopup, setremarkPopup] = useState(null);

//   const role = localStorage.getItem("Role");

//   // Define the fetchAllPatients function
//   const fetchAllPatients = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Patient`
//       );
//       setPatients(response.data);
//       setFilteredPatients(response.data); // Initially, set filteredPatients to all patients
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage("Failed to load patient data.");
//       setPatients([]);
//       setFilteredPatients([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch all patients when the component mounts
//   useEffect(() => {
//     fetchAllPatients();
//   }, []);

//   // Filter patients by search term (real-time filtering) - Search button
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = patients.filter(
//         (patient) =>
//           patient.MPD_MOBILE_NO.toLowerCase().includes(
//             searchTerm.toLowerCase()
//           ) ||
//           patient.MPD_PATIENT_NAME.toLowerCase().includes(
//             searchTerm.toLowerCase()
//           )
//       );
//       setFilteredPatients(filtered);
//       setErrorMessage(
//         filtered.length === 0 ? "No matching patients found." : ""
//       );
//     } else {
//       setFilteredPatients(patients); // Reset to all patients if searchTerm is empty
//     }
//   }, [searchTerm, patients]);

//   const handleSearch = async () => {
//     if (!searchTerm) {
//       // If search term is empty, fetch all patients
//       await fetchAllPatients();
//       setErrorMessage(""); // Clear any error message
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Patient/SearchBy/${searchTerm}`
//       );
//       setPatients(response.data);
//       setErrorMessage("");
//       setPopup(null);
//       setTreatmentPopup(null);
//     } catch (error) {
//       setPatients([]);
//       if (error.response && error.response.status === 404) {
//         setErrorMessage("No patient found with the provided search term.");
//         setPopup(<Addpatient />);
//       } else {
//         setErrorMessage("An error occurred while searching for the patient.");
//         setPopup(null);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddRecord = (patientId) => {
//     setTreatmentPopup(null);
//     navigate(`/dashboard/addrecord/${patientId}`);
//   };

//   // When User clicks View Treatments it navigate to this modal
//   const handleViewRecord = async (patientId) => {
//     try {
//       setErrorMessage("");
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Treatment/patient/${patientId}`
//       );
//       setTreatmentPopup(
//         <div className="treatment-popup">
//           <button
//             className="close-popup-button"
//             onClick={() => setTreatmentPopup(null)}
//           >
//             X
//           </button>
//           <h2>Treatment Details</h2>
//           <div className="treatment-list">
//             {response.data.map((treatment, index) => (
//               <div className="treatment-card" key={index}>
//                 <h3>{response.data.length - index}</h3>{" "}
//                 {/* Reverse index numbering */}
//                 <p>
//                   Treatment-date:{" "}
//                   {
//                     new Date(treatment.MTD_CREATED_DATE)
//                       .toISOString()
//                       .split("T")[0]
//                   }
//                 </p>
//                 <b>
//                   <p className="complain-text">
//                     Complain: {treatment.MTD_COMPLAIN}
//                   </p>
//                 </b>
//                 <button
//                   onClick={() => {
//                     navigate(
//                       `/dashboard/view-record/${patientId}/${treatment.MTD_SERIAL_NO}`,
//                       {
//                         state: { message: "Medical History" },
//                       }
//                     );
//                   }}
//                 >
//                   View info
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* <button className="close-popup-button" onClick={() => setTreatmentPopup(null)}>Close</button> */}
//         </div>
//       );
//     } catch (error) {
//       console.error("Error fetching treatment details:", error);
//       alert("Still there are no treatments available for this patient");
//     }
//   };

//   const handleNoPatient = () => {
//     setPopup(<Addpatient />);
//   };

//   const closePopup = () => {
//     setPopup(null);
//   };

//   // viewPatient function
//   const viewPatient = (patientCode) => {
//     setPopup(<Addpatient patientCode={patientCode} />); // Pass patientCode as a prop to Addpatient
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete the patient?")) {
//       try {
//         // Check if the patient has treatments
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/Patient/${id}`
//         );

//         if (response.data && response.data.length > 0) {
//           alert(
//             "This patient cannot be deleted as they have treatments associated."
//           );
//           return;
//         }

//         // Proceed with deletion if no treatments are found
//         await axios.delete(
//           `${process.env.REACT_APP_API_BASE_URL}/Patient/${id}`
//         );
//         alert("Patient deleted successfully!");

//         // Reload or update the UI after deletion
//         window.location.reload();
//       } catch (error) {
//         console.error("Error deleting patient:", error);
//         alert(
//           error.response?.data?.message ||
//             "Failed to delete the patient. Please try again."
//         );
//       }
//     }
//   };
//   const calculateAge = (birthdate) => {
//     if (!birthdate) return "N/A";
//     const birthDateObj = new Date(birthdate);
//     const today = new Date();
//     let age = today.getFullYear() - birthDateObj.getFullYear();
//     const monthDiff = today.getMonth() - birthDateObj.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const patientdetails = (patientid) => {
//     navigate(`/dashboard/patientdetails/${patientid}`);
//   };

//   return (
//     <div className="medical-history-container">
//       <h1 className="title">Search Patient Records</h1>
//       <div className="search-container">
//         <input
//           type="search"
//           placeholder="Enter patient name or contact number"
//           className="search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="button-container">
//           {/* Add Search Button */}
//           <button
//             className="search-button"
//             onClick={handleSearch}
//             disabled={isLoading}
//           >
//             {isLoading ? "Searching..." : "Search"}
//           </button>
//           {/* Add Patient Button */}
//           <button className="no-patient-button" onClick={handleNoPatient}>
//             Add Patient
//           </button>
//         </div>
//       </div>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {/* Search Results and All results */}
//       {filteredPatients.length > 0 && (
//         <div className="patient-details">
//           <table className="records-table">
//             <thead>
//               <tr>
//                 <th>Patient Code</th>
//                 <th>Name</th>
//                 <th>Contact</th>
//                 <th>NIC</th>

//                 <th>Age</th>

//                 <th colSpan={2}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPatients.map((patient) => (
//                 <tr key={patient.MPD_PATIENT_CODE}>
//                   <td>{patient.MPD_PATIENT_CODE}</td>
//                   <td>{patient.MPD_PATIENT_NAME}</td>
//                   <td>{patient.MPD_MOBILE_NO}</td>

//                   <td>{patient.MPD_NIC_NO}</td>
//                   <td>{calculateAge(patient.MPD_BIRTHDAY)}</td>

//                   <td colSpan={4}>
//                     <div className="actions-container ">
//                       <button
//                         className="action-button"
//                         onClick={() => viewPatient(patient.MPD_PATIENT_CODE)}
//                       >
//                         View Details
//                       </button>

//                       <button
//                         className="action-button"
//                         onClick={() =>
//                           handleAddRecord(patient.MPD_PATIENT_CODE)
//                         }

//                         // disabled={!(role === "Admin" || role === "Doc")}
//                       >
//                         <i className="fas fa-plus"></i> Add Treatment
//                       </button>

//                       <button
//                         className="action-button"
//                         onClick={() => {
//                           // if (role === "Admin" || role === "Doc") {
//                           //     handleViewRecord(patient.MPD_PATIENT_CODE);
//                           // } else {
//                           //     alert("You do not have permission to view this.");
//                           // }
//                           handleViewRecord(patient.MPD_PATIENT_CODE);
//                         }}
//                         // disabled={!(role === "Admin" || role === "Doc")}
//                       >
//                         <i className="fas fa-eye"></i> View Treatments
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {popup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-popup-button" onClick={closePopup}>
//               X
//             </button>
//             {popup}
//           </div>
//         </div>
//       )}

//       {treatmentPopup && (
//         <div className="popup-overlay">
//           <div className="">{treatmentPopup}</div>
//         </div>
//       )}

//       {patientPopup && (
//         <div className="popup-overlay">
//           <div className="">{patientPopup}</div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  MedicalServices as MedicalServicesIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Addpatient from "../components/addPatients";
// import Footer from "../components/footer";

export default function MedicalHistory() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  const fetchAllPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Patient`
      );
      setPatients(response.data);
      setFilteredPatients(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to load patient data.");
      setPatients([]);
      setFilteredPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPatients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(
        (patient) =>
          patient.MPD_MOBILE_NO?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          patient.MPD_PATIENT_NAME?.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      );
      setFilteredPatients(filtered);
      setErrorMessage(
        filtered.length === 0 ? "No matching patients found." : ""
      );
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const handleSearch = async () => {
    if (!searchTerm) {
      await fetchAllPatients();
      setErrorMessage("");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Patient/SearchBy/${searchTerm}`
      );
      setPatients(response.data);
      setErrorMessage("");
      setOpenAddPatient(false);
      setOpenTreatmentDialog(false);
    } catch (error) {
      setPatients([]);
      if (error.response && error.response.status === 404) {
        setErrorMessage("No patient found with the provided search term.");
        setOpenAddPatient(true);
      } else {
        setErrorMessage("An error occurred while searching for the patient.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecord = (patientId) => {
    navigate(`/dashboard/addrecord/${patientId}`);
  };

  const handleViewRecord = async (patient) => {
    setSelectedPatient(patient);
    try {
      setErrorMessage("");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Treatment/patient/${patient.MPD_PATIENT_CODE}`
      );
      setTreatments(response.data);
      setOpenTreatmentDialog(true);
    } catch (error) {
      console.error("Error fetching treatment details:", error);
      setSnackbarMessage("No treatments available for this patient");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the patient?")) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/Patient/${id}`
        );

        if (response.data && response.data.length > 0) {
          setSnackbarMessage("Cannot delete patient with treatments");
          setSnackbarSeverity("warning");
          setSnackbarOpen(true);
          return;
        }

        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/Patient/${id}`
        );
        setSnackbarMessage("Patient deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchAllPatients();
      } catch (error) {
        console.error("Error deleting patient:", error);
        setSnackbarMessage(
          error.response?.data?.message || "Failed to delete patient"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return "N/A";
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const viewPatient = (patientCode) => {
    setSelectedPatient(
      patients.find((p) => p.MPD_PATIENT_CODE === patientCode)
    );
    setOpenAddPatient(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          fontWeight={600}
          align="center"
        >
          Search Patient Records
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter patient name or contact number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={isLoading}
            sx={{ minWidth: 120 }}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SearchIcon />
              )
            }
          >
            {isLoading ? "Searching" : "Search"}
          </Button> */}
          {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenAddPatient(true)}
          >
            Add Patient
          </Button> */}

          {/* disable this button for pharmacy user only*/}
          <Tooltip
            title={
              role === "Phuser"
                ? "Sorry, you don't have permission to add patients."
                : "Add a new patient"
            }
            placement="top"
          >
            <span>
              {" "}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={() => {
                  if (role !== "Phuser") {
                    setOpenAddPatient(true);
                  }
                }}
                disabled={role === "Phuser"}
                sx={{
                  ...(role === "Phuser" && {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }),
                }}
              >
                Add New Patient
              </Button>
            </span>
          </Tooltip>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {isLoading && filteredPatients.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredPatients.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="patient records table">
              <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Patient Code
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Contact
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    NIC
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Age
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.MPD_PATIENT_CODE}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{patient.MPD_PATIENT_CODE}</TableCell>
                    <TableCell sx={{ fontWeight: "medium" }}>
                      {patient.MPD_PATIENT_NAME}
                    </TableCell>
                    <TableCell>{patient.MPD_MOBILE_NO}</TableCell>
                    <TableCell>{patient.MPD_NIC_NO || "N/A"}</TableCell>
                    <TableCell>{calculateAge(patient.MPD_BIRTHDAY)}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Tooltip title="View Details">
                          <IconButton
                            color="info"
                            onClick={() =>
                              viewPatient(patient.MPD_PATIENT_CODE)
                            }
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Add Treatment">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleAddRecord(patient.MPD_PATIENT_CODE)
                            }
                          >
                            <MedicalServicesIcon />
                          </IconButton>
                        </Tooltip> */}

                        {/*disable this for pharmcy user */}
                        <Tooltip
                          title={
                            role === "Phuser"
                              ? "You don't have permission to add treatments"
                              : "Add Treatment"
                          }
                        >
                          <span>
                            {" "}
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                if (role === "Phuser") {
                                  e.preventDefault();
                                  setErrorMessage(
                                    "Sorry, you don't have permission to add treatments."
                                  );
                                } else {
                                  handleAddRecord(patient.MPD_PATIENT_CODE);
                                }
                              }}
                              disabled={role === "Phuser"}
                              sx={{
                                ...(role === "Phuser" && {
                                  cursor: "not-allowed",
                                  pointerEvents: "auto",
                                  color: theme.palette.action.disabled,
                                }),
                              }}
                            >
                              <MedicalServicesIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="View Treatments">
                          <IconButton
                            color="secondary"
                            onClick={() => handleViewRecord(patient)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Edit Patient">
                          <IconButton
                            color="warning"
                            onClick={() =>
                              navigate(
                                `/dashboard/edit-patient/${patient.MPD_PATIENT_CODE}`
                              )
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="Delete Patient">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(patient.MPD_PATIENT_CODE)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              No patient records found
            </Typography>
          </Paper>
        )}
      </Paper>

      {/* add Patient Dialog  */}
      {/* <Dialog
        open={openAddPatient}
        onClose={() => {
          setOpenAddPatient(false);
          setSelectedPatient(null);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent dividers>
          <Addpatient
            patientCode={selectedPatient?.MPD_PATIENT_CODE}
            onSuccess={() => {
              setOpenAddPatient(false);
              setSelectedPatient(null);
              fetchAllPatients();
              setSnackbarMessage(
                selectedPatient
                  ? "Patient updated successfully"
                  : "Patient added successfully"
              );
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
            }}
          />
        </DialogContent>
      </Dialog> */}


    {/*View details modal opens */}
      <Dialog
        open={openAddPatient}
        onClose={() => {
          setOpenAddPatient(false);
          setSelectedPatient(null);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent dividers>
          <Addpatient
            patientCode={selectedPatient?.MPD_PATIENT_CODE}
            onSuccess={() => {
              setOpenAddPatient(false);
              setSelectedPatient(null);
              fetchAllPatients();
              setSnackbarMessage(
                selectedPatient
                  ? "Patient updated successfully"
                  : "Patient added successfully"
              );
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
            }}
            handleClose={() => {
              setOpenAddPatient(false);
              setSelectedPatient(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openTreatmentDialog}
        onClose={() => setOpenTreatmentDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Treatment Details - {selectedPatient?.MPD_PATIENT_NAME}
            </Typography>
            <IconButton onClick={() => setOpenTreatmentDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        {/* old code of the treatments are in old dates in bottom*/}
        {/* <DialogContent dividers>
          <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
            {treatments.length > 0 ? (
              treatments.map((treatment, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Visit #{treatments.length - index}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(
                        treatment.MTD_CREATED_DATE
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                    <strong>Complain:</strong> {treatment.MTD_COMPLAIN}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      navigate(
                        `/dashboard/view-record/${selectedPatient.MPD_PATIENT_CODE}/${treatment.MTD_SERIAL_NO}`,
                        {
                          state: { message: "Medical History" },
                        }
                      );
                    }}
                    startIcon={<VisibilityIcon />}
                  >
                    View Info
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" align="center" color="text.secondary">
                No treatments available for this patient
              </Typography>
            )}
          </Box>
        </DialogContent> */}

        {/* modify to order by submitted treatment date*/}
        <DialogContent dividers>
          <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
            {treatments.length > 0 ? (
              [...treatments]
                .sort(
                  (a, b) =>
                    new Date(b.MTD_CREATED_DATE) - new Date(a.MTD_CREATED_DATE)
                )
                .map((treatment, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        Visit #{treatments.length - index}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(
                          treatment.MTD_CREATED_DATE
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                      <strong>Complain:</strong> {treatment.MTD_COMPLAIN}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        navigate(
                          `/dashboard/view-record/${selectedPatient.MPD_PATIENT_CODE}/${treatment.MTD_SERIAL_NO}`,
                          {
                            state: { message: "Medical History" },
                          }
                        );
                      }}
                      startIcon={<VisibilityIcon />}
                    >
                      View Info
                    </Button>
                  </Paper>
                ))
            ) : (
              <Typography variant="body1" align="center" color="text.secondary">
                No treatments available for this patient
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenTreatmentDialog(false)}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* <Footer /> */}
    </Container>
  );
}
