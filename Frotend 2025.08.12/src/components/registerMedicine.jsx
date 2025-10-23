// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/registerMedicines.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Importing icons
// import { MdDelete } from "react-icons/md";
// import { useRef } from "react"; // Import useRef at the top

// export default function Registermedicine() {
//   const [form, setForm] = useState({
//     MMC_MATERIAL_CODE: "",
//     MMC_DESCRIPTION: "",
//     MMC_REORDER_LEVEL: "",
//     MMC_MATERIAL_SPEC: "",
//     MMC_UNIT: "",
//     MMC_STATUS: "",
//     MMC_CREATED_BY: "",
//     MMC_UPDATED_BY: "",
//     MMC_RATE: "",
//   });

//   const [popup, setPopup] = useState(false);
//   const [medicines, setMedicines] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [highlightedRow, setHighlightedRow] = useState(null);
//   const rowRefs = useRef({}); // Create a ref to store references to table rows

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/Material`
//         );
//         const sortedMedicines = response.data.sort((a, b) => b.isNew - a.isNew); // Sort by isNew flag
//         setMedicines(sortedMedicines);
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };
//   // const [Token]=localStorage.getItem("");

//   const highlightAndScrollToRow = (materialCode, timeoutDuration = 120000) => {
//     setHighlightedRow(materialCode);
//     const row = rowRefs.current[materialCode];
//     if (row) {
//       row.scrollIntoView({ behavior: "smooth", block: "center" });
//     }

//     setTimeout(() => {
//       setMedicines((prev) =>
//         prev.map((medicine) =>
//           medicine.MMC_MATERIAL_CODE === materialCode
//             ? { ...medicine, isNew: false }
//             : medicine
//         )
//       );
//     }, timeoutDuration);
//   };

//   const refreshMedicines = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Material`
//       );
//       setMedicines((prev) =>
//         response.data.map((medicine) => ({
//           ...medicine,
//           isNew: prev.some(
//             (m) => m.MMC_MATERIAL_CODE === medicine.MMC_MATERIAL_CODE && m.isNew
//           ),
//         }))
//       );
//     } catch (error) {
//       console.error("Error refreshing medicines:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...form,
//       MMC_REORDER_LEVEL: parseFloat(form.MMC_REORDER_LEVEL) || 0,
//     };

//     try {
//       let newMedicine = null;
//       if (editMode) {
//         await axios.patch(
//           `${process.env.REACT_APP_API_BASE_URL}/Material/${form.MMC_MATERIAL_CODE}`,
//           data
//         );
//         alert("Medicine updated successfully");

//         // Update the existing medicine in the list
//         newMedicine = { ...form, isNew: true };
//         setMedicines((prev) =>
//           prev.map((medicine) =>
//             medicine.MMC_MATERIAL_CODE === newMedicine.MMC_MATERIAL_CODE
//               ? newMedicine
//               : medicine
//           )
//         );
//       } else {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}/Material`,
//           data
//         );
//         alert("Medicine registered successfully");

//         // Add isNew property and prepend the medicine
//         newMedicine = { ...response.data, isNew: true };
//         setMedicines((prev) => [newMedicine, ...prev]); // Add new medicine at the top
//       }

//       // Highlight and scroll to the newly added or updated medicine
//       highlightAndScrollToRow(newMedicine.MMC_MATERIAL_CODE);

//       handleReset();
//       setPopup(false);
//       setError("");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setError(error.response.data.error);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//       console.error("Error submitting the medicine:", error);
//     }
//   };

//   // const inactivemedicie = async (id) => {
//   //   if (window.confirm("Are you sure you want to remove this medicine?")) {
//   //     try {
//   //       await axios.put(
//   //         `http://localhost:5155/api/Material/updatematerialstatus?materialcode=${id}`
//   //       );
//   //       console.log("Medicine successfully deactivated");

//   //       refreshMedicines();
//   //     } catch (error) {
//   //       console.error("Error removing the medicine:", error);
//   //     }
//   //   }
//   // };

//   const inactivemedicie = async (id) => {
//     if (window.confirm("Are you sure you want to remove this medicine?")) {
//       try {
//         await axios.put(
//           `${process.env.REACT_APP_API_BASE_URL}/Material/updatematerialstatus?materialcode=${id}`
//         );
//         console.log("Medicine successfully deactivated");

//         refreshMedicines();
//       } catch (error) {
//         console.error("Error removing the medicine:", error);
//       }
//     }
//   };

//   // Handle delete medicine
//   // const handleDelete = async (id) => {
//   //     if (window.confirm("Are you sure you want to delete this medicine?")) {
//   //         try {
//   //             await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/Material/${id}`);
//   //             alert("Medicine deleted successfully");
//   //             refreshMedicines();
//   //         } catch (error) {
//   //             console.error("Error deleting medicine:", error);
//   //         }
//   //     }
//   // };

//   const handleReset = () => {
//     setForm({
//       MMC_MATERIAL_CODE: "",
//       MMC_DESCRIPTION: "",
//       MMC_REORDER_LEVEL: "",
//       MMC_MATERIAL_SPEC: "",
//       MMC_UNIT: "",
//       MMC_STATUS: "",
//       MMC_CREATED_BY: "",
//       MMC_UPDATED_BY: "",
//       MMC_RATE: "",
//     });
//     setEditMode(false);
//   };

//   // Handle edit button click
//   const handleEdit = (medicine) => {
//     setForm(medicine);
//     setEditMode(true);
//     setPopup(true); // Show popup for editing
//   };

//   // Toggle popup
//   const togglePopup = () => {
//     setPopup(!popup);
//     if (!popup) handleReset(); // Reset form when closing popup
//   };

//   // Filter medicines based on search term
//   const filteredMedicines = medicines.filter((medicine) =>
//     medicine.MMC_DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="register-medicines-section">
//       <h1>Drug Registration</h1>

//       <div className="search-add-container">
//         <input
//           type="search"
//           placeholder="Search medicines..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <button onClick={togglePopup} className="add-medicine-btn">
//           {editMode ? "Edit Medicine" : "Add New Medicine"}
//         </button>
//       </div>

//       <div className="drug-table-register">
//         <h2>Drug Stock</h2>
//         <div className="table-scroll-wrapper">
//           <table className="medicine-table">
//             <thead>
//               <tr>
//                 <th>Name of Drug</th>
//                 <th>Unit</th>
//                 <th>Quantity</th>
//                 <th>Status</th>
//                 <th>Rate (Rs)</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMedicines.length > 0 ? (
//                 filteredMedicines.map((medicine) => (
//                   <tr
//                     key={medicine.MMC_MATERIAL_CODE}
//                     className={
//                       medicine.MMC_MATERIAL_CODE === highlightedRow
//                         ? "row-highlight"
//                         : ""
//                     }
//                     ref={(el) =>
//                       (rowRefs.current[medicine.MMC_MATERIAL_CODE] = el)
//                     }
//                   >
//                     <td>{medicine.MMC_DESCRIPTION}</td>
//                     <td style={{ textAlign: "center" }}>{medicine.MMC_UNIT}</td>
//                     <td style={{ textAlign: "center" }}>
//                       {medicine.MMC_REORDER_LEVEL}
//                     </td>
//                     <td>
//                       {medicine.MMC_STATUS === "A"
//                         ? "Active"
//                         : medicine.MMC_STATUS}
//                     </td>
//                     <td style={{ textAlign: "center" }}>
//                       {Number(medicine.MMC_RATE)
//                         ? Number(medicine.MMC_RATE).toFixed(2)
//                         : "0.00"}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleEdit(medicine)}
//                         className="icon-btn"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </button>
//                       <button
//                         onClick={() =>
//                           inactivemedicie(medicine.MMC_MATERIAL_CODE)
//                         }
//                         className="icon-btn"
//                       >
//                         <MdDelete />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6">No medicines available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* when user clicked Add New Medicine it opens this modal */}
//       {popup && (
//         <div className="popup">
//           <div className="popup-content1">
//             <span className="close-btn" onClick={togglePopup}>
//               X
//             </span>
//             <h2>{editMode ? "Edit Medicine" : "Add New Medicine"}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="MMC_DESCRIPTION">Name of the drug</label>
//                 <input
//                   type="text"
//                   name="MMC_DESCRIPTION"
//                   value={form.MMC_DESCRIPTION}
//                   placeholder="Enter description "
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <labe htmlFor="MMC_UNIT">Unit of medicine</labe>

//                 <select
//                   name="MMC_UNIT"
//                   value={form.MMC_UNIT}
//                   onChange={handleChange}
//                 >
//                   <option value=""> select unit</option>
//                   <option value="g">Grams</option>
//                   <option value="mg">Milligrams</option>
//                   <option value="ml">Millilitres</option>
//                   <option value="mcg">Micro grams</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="MMC_REORDER_LEVEL">Quantity</label>
//                 <input
//                   type="number" // Changed to number
//                   name="MMC_REORDER_LEVEL"
//                   value={form.MMC_REORDER_LEVEL}
//                   onChange={handleChange}
//                   placeholder="Enter quantity"
//                   min="1" // Enforces minimum value of 1
//                   step="0.01" // Allows decimal input
//                   title="Enter a valid quantity (e.g., 1.5)"
//                   pattern="^\d*(\.\d+)?$" // Keeps the regex for additional client-side validation
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="MMC_STATUS">Status</label>
//                 <select
//                   name="MMC_STATUS"
//                   value={form.MMC_STATUS}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Status</option>
//                   <option value="A">Active</option>
//                   {/* <option value="I">Inactive</option> */}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="MMC_RATE">Rate</label>
//                 <input
//                   type="number"
//                   name="MMC_RATE"
//                   value={form.MMC_RATE}
//                   placeholder="ex: 100.00"
//                   onChange={handleChange}
//                   min="1"
//                   step="0.01" // Allow decimals
//                 />
//               </div>

//               <button type="submit" className="submit-btn">
//                 {editMode ? "Update Medicine" : "Register Medicine"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { NumericFormat } from 'react-number-format';

export default function RegisterMedicine() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState({
    MMC_MATERIAL_CODE: "",
    MMC_DESCRIPTION: "",
    MMC_REORDER_LEVEL: "",
    MMC_MATERIAL_SPEC: "",
    MMC_UNIT: "",
    MMC_STATUS: "A",
    MMC_CREATED_BY: "",
    MMC_UPDATED_BY: "",
    MMC_RATE: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const rowRefs = useRef({});

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/Material`
        );
        const sortedMedicines = response.data.sort((a, b) => b.isNew - a.isNew);
        setMedicines(sortedMedicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        showSnackbar("Failed to fetch medicines", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const highlightAndScrollToRow = (materialCode, timeoutDuration = 120000) => {
    setHighlightedRow(materialCode);
    const row = rowRefs.current[materialCode];
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setTimeout(() => {
      setMedicines((prev) =>
        prev.map((medicine) =>
          medicine.MMC_MATERIAL_CODE === materialCode
            ? { ...medicine, isNew: false }
            : medicine
        )
      );
    }, timeoutDuration);
  };

  const refreshMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Material`
      );
      setMedicines((prev) =>
        response.data.map((medicine) => ({
          ...medicine,
          isNew: prev.some(
            (m) => m.MMC_MATERIAL_CODE === medicine.MMC_MATERIAL_CODE && m.isNew
          ),
        }))
      );
      showSnackbar("Medicine list refreshed");
    } catch (error) {
      console.error("Error refreshing medicines:", error);
      showSnackbar("Failed to refresh medicines", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      MMC_REORDER_LEVEL: parseFloat(form.MMC_REORDER_LEVEL) || 0,
    };

    setLoading(true);
    try {
      let newMedicine = null;
      if (editMode) {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/Material/${form.MMC_MATERIAL_CODE}`,
          data
        );
        showSnackbar("Medicine updated successfully");

        newMedicine = { ...form, isNew: true };
        setMedicines((prev) =>
          prev.map((medicine) =>
            medicine.MMC_MATERIAL_CODE === newMedicine.MMC_MATERIAL_CODE
              ? newMedicine
              : medicine
          )
        );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Material`,
          data
        );
        showSnackbar("Medicine registered successfully");

        newMedicine = { ...response.data, isNew: true };
        setMedicines((prev) => [newMedicine, ...prev]);
      }

      highlightAndScrollToRow(newMedicine.MMC_MATERIAL_CODE);
      handleReset();
      setOpenDialog(false);
      setError("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        showSnackbar(error.response.data.error, "error");
      } else {
        setError("An unexpected error occurred. Please try again.");
        showSnackbar(
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
      console.error("Error submitting the medicine:", error);
    } finally {
      setLoading(false);
    }
  };

  const inactivemedicie = async (id) => {
    if (window.confirm("Are you sure you want to deactivate this medicine?")) {
      setLoading(true);
      try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/Material/updatematerialstatus?materialcode=${id}`
        );
        showSnackbar("Medicine deactivated successfully");
        refreshMedicines();
      } catch (error) {
        console.error("Error removing the medicine:", error);
        showSnackbar("Failed to deactivate medicine", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setForm({
      MMC_MATERIAL_CODE: "",
      MMC_DESCRIPTION: "",
      MMC_REORDER_LEVEL: "",
      MMC_MATERIAL_SPEC: "",
      MMC_UNIT: "",
      MMC_STATUS: "A",
      MMC_CREATED_BY: "",
      MMC_UPDATED_BY: "",
      MMC_RATE: "",
    });
    setEditMode(false);
    setError("");
  };

  const handleEdit = (medicine) => {
    setForm(medicine);
    setEditMode(true);
    setOpenDialog(true);
  };

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
    if (!openDialog) handleReset();
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.MMC_DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            fontWeight={600}
            align="center"
          >
            Drug Registration
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              mb: 3,
              alignItems: isMobile ? "stretch" : "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth={isMobile}
              sx={{
                width: isMobile ? "100%" : "950px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: isMobile ? "100%" : "auto",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={toggleDialog}
                fullWidth={isMobile}
              >
                Add Medicine
              </Button>

              {/* <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={refreshMedicines}
                disabled={loading}
                fullWidth={isMobile}
              >
                Refresh
              </Button> */}
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mb: 2 }}
            color="primary"
            fontWeight={600}
          >
            Drug Stock
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table aria-label="medicine table">
                <TableHead
                  sx={{ backgroundColor: theme.palette.primary.light }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Name of Drug
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Unit
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Rate (Rs)
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
                  {filteredMedicines.length > 0 ? (
                    filteredMedicines.map((medicine) => (
                      <TableRow
                        key={medicine.MMC_MATERIAL_CODE}
                        ref={(el) =>
                          (rowRefs.current[medicine.MMC_MATERIAL_CODE] = el)
                        }
                        sx={{
                          backgroundColor:
                            medicine.MMC_MATERIAL_CODE === highlightedRow
                              ? theme.palette.action.selected
                              : medicine.isNew
                                ? theme.palette.action.hover
                                : "inherit",
                          transition: "background-color 0.3s ease",
                        }}
                        hover
                      >
                        <TableCell>{medicine.MMC_DESCRIPTION}</TableCell>
                        <TableCell align="center">
                          {medicine.MMC_UNIT}
                        </TableCell>
                        {/* <TableCell align="center">
                          {medicine.MMC_REORDER_LEVEL}
                        </TableCell> */}
                        <TableCell align="center">
                          {medicine.MMC_REORDER_LEVEL
                            ? new Intl.NumberFormat('en-US').format(Number(medicine.MMC_REORDER_LEVEL))
                            : "0"}
                        </TableCell>

                        <TableCell align="center">
                          {medicine.MMC_STATUS === "A" ? (
                            <Typography color="success.main">Active</Typography>
                          ) : (
                            <Typography color="error.main">Inactive</Typography>
                          )}
                        </TableCell>
                        {/* <TableCell align="center">
                          {Number(medicine.MMC_RATE)
                            ? Number(medicine.MMC_RATE).toFixed(2)
                            : "0.00"}
                        </TableCell> */}
                        <TableCell align="center">
                          {medicine.MMC_RATE
                            ? new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(Number(medicine.MMC_RATE))
                            : "0.00"}
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(medicine)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Deactivate">
                            <IconButton
                              color="error"
                              onClick={() =>
                                inactivemedicie(medicine.MMC_MATERIAL_CODE)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No medicines available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        <Dialog
          open={openDialog}
          onClose={toggleDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={(theme) => ({
              color: theme.palette.primary.main,
              position: "relative",
            })}
          >
            <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center" }}>
              {editMode ? "Edit Medicine" : "Add New Medicine"}
            </Typography>

            <IconButton
              aria-label="close"
              onClick={toggleDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent >
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name of the drug"
                  name="MMC_DESCRIPTION"
                  value={form.MMC_DESCRIPTION}
                  placeholder="Enter description"
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="unit-label">Unit of medicine</InputLabel>
                  <Select
                    labelId="unit-label"
                    name="MMC_UNIT"
                    value={form.MMC_UNIT}
                    onChange={handleChange}
                    label="Unit of medicine"
                    required
                  >
                    <MenuItem value="">Select unit</MenuItem>
                    <MenuItem value="g">Grams</MenuItem>
                    <MenuItem value="mg">Milligrams</MenuItem>
                    <MenuItem value="ml">Millilitres</MenuItem>
                    <MenuItem value="mcg">Micro grams</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Quantity"
                  name="MMC_REORDER_LEVEL"
                  type="number"
                  value={form.MMC_REORDER_LEVEL}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  inputProps={{
                    min: "1",
                    step: "0.01",
                  }}
                  required
                />
              </Box> */}

              {/*Apply the thousand seperatos */}
              <Box sx={{ mb: 3 }}>
                <NumericFormat
                  customInput={TextField}
                  fullWidth
                  margin="normal"
                  label="Quantity"
                  name="MMC_REORDER_LEVEL"
                  value={form.MMC_REORDER_LEVEL}
                  onValueChange={(values) => {
                    const { value } = values;
                    handleChange({
                      target: {
                        name: "MMC_REORDER_LEVEL",
                        value: value,
                      },
                    });
                  }}
                  thousandSeparator
                  allowNegative={false}
                  placeholder="Enter quantity"
                  required
                  isNumericString
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="MMC_STATUS"
                    value={form.MMC_STATUS}
                    onChange={handleChange}
                    label="Status"
                    required
                  >
                    <MenuItem value="A">Active</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Rate (Rs)"
                  name="MMC_RATE"
                  type="number"
                  value={form.MMC_RATE}
                  placeholder="ex: 100.00"
                  onChange={handleChange}
                  inputProps={{
                    min: "0",
                    step: "0.01",
                  }}
                  required
                />
              </Box> */}

              <Box sx={{ mb: 3 }}>
                <NumericFormat
                  customInput={TextField}
                  fullWidth
                  margin="normal"
                  label="Rate (Rs)"
                  name="MMC_RATE"
                  value={form.MMC_RATE}
                  placeholder="ex: 100.00"
                  onValueChange={(values) => {
                    const { value } = values;
                    handleChange({
                      target: {
                        name: "MMC_RATE",
                        value: value,
                      },
                    });
                  }}
                  thousandSeparator
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  isNumericString
                  required
                />
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <DialogActions>
                <Button onClick={toggleDialog}>Cancel</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : editMode ? (
                    "Update Medicine"
                  ) : (
                    "Register Medicine"
                  )}
                </Button>
              </DialogActions>
            </form>
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
