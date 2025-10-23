//Here I added the treatments for the patient

// import React, { useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import "../styles/addrecord.css";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const Addrecord = () => {
//   const { patientId } = useParams();
//   const Name = localStorage.getItem("Name");
//   const location = useLocation();
//   const { appoinmentid } = location.state || {}; // Retrieve appoinmentid from the state
//   const { channelnumber } = location.state || {};
//   const [medicines, setMedicines] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [patientError, setPatientError] = useState("");
//   const [patientdetails, setPatientdetails] = useState(null);
//   const serialNumber = location.state?.serialNumber || null;
//   const [isEditMode, setIsEditMode] = useState(false);
//   console.log(serialNumber); //check serial number
//   const role = localStorage.getItem("Role");
//   const [prescriptions, setPrescriptions] = useState([
//     {
//       MDD_MATERIAL_CODE: "",
//       MDD_MATERIAL_NAME: "",
//       MDD_DOSAGE: "",
//       MDD_TAKES: "",
//       MDD_TAKES_CUSTOM: "",
//       MDD_QUANTITY: "",
//       MMC_RATE: 0,
//     },
//   ]);
//   const [activePrescriptionIndex, setActivePrescriptionIndex] = useState(null);

//   console.log(channelnumber);

//   const [formData, setFormData] = useState({
//     MTD_PATIENT_CODE: patientId,
//     MTD_DATE: new Date().toISOString(),
//     MTD_TYPE: "",
//     MTD_DOCTOR: Name || "",
//     MTD_TYPE: "",
//     MTD_COMPLAIN: "",
//     MTD_DIAGNOSTICS: "",
//     MTD_REMARKS: "",
//     MTD_AMOUNT: "",
//     MTD_PAYMENT_STATUS: "",
//     MTD_TREATMENT_STATUS: "",
//     MTD_SMS_STATUS: "",
//     MTD_SMS: "",
//     MTD_MEDICAL_STATUS: "",
//     MTD_STATUS: "",
//     MTD_CREATED_BY: Name || "",
//     MTD_CREATED_DATE: new Date().toISOString(),
//     MTD_UPDATED_BY: "",
//     MTD_CHANNEL_NO: channelnumber || null,
//     MTD_UPDATED_DATE: null,
//     MTD_APPOINMENT_ID: appoinmentid,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };
//   //function to handle   prescriptionchange
//   const handlePrescriptionChange = (index, event) => {
//     const { name, value } = event.target;
//     const values = [...prescriptions];

//     if (name === "MDD_TAKES") {
//       values[index][name] = value;
//       // Reset custom field if "Other" is not selected
//       if (value !== "other") {
//         values[index].MDD_TAKES_CUSTOM = "";
//       }
//     } else if (name === "MDD_TAKES_CUSTOM") {
//       values[index][name] = value;
//     } else {
//       values[index][name] = value;
//     }

//     setPrescriptions(values);

//     // Check if all the current prescription fields are filled
//     const isCompleted =
//       values[index].MDD_MATERIAL_NAME &&
//       values[index].MDD_TAKES &&
//       (values[index].MDD_TAKES !== "other" || values[index].MDD_TAKES_CUSTOM) &&
//       values[index].MDD_QUANTITY;

//     // If all fields are completed and it's the last prescription, add a new one
//     if (isCompleted && index === prescriptions.length - 1) {
//       handleAddPrescription();
//     }
//   };

//   const handleAddPrescription = () => {
//     setPrescriptions([
//       ...prescriptions,
//       {
//         MDD_MATERIAL_CODE: "",
//         MDD_MATERIAL_NAME: "",
//         MDD_DOSAGE: "",
//         MDD_TAKES: "",
//         MDD_TAKES_CUSTOM: "", // New field
//         MDD_QUANTITY: "",
//         MMC_RATE: 0,
//       },
//     ]);
//     // setIsEditMode(false);
//   };

//   const handleAddNewPrescription = () => {
//     // Create a new prescription object with default values without modifying the existing prescriptions
//     const newPrescription = {
//       MDD_MATERIAL_CODE: "",
//       MDD_MATERIAL_NAME: "",
//       MDD_DOSAGE: "",
//       MDD_TAKES: "",
//       MDD_TAKES_CUSTOM: "", // New field
//       MDD_QUANTITY: "",
//       MMC_RATE: 0,
//     };

//     // Add the new prescription to the existing list without affecting the fetched data
//     setPrescriptions((prevPrescriptions) => [
//       ...prevPrescriptions,
//       newPrescription,
//     ]);

//     // setIsEditMode(false);
//   };

//   //purpose to update drug status is updat
//   const handleRemovePrescription = (index) => {
//     const values = [...prescriptions];
//     const removedPrescription = values[index]; // Get the prescription being removed
//     values.splice(index, 1); // Remove it from the array
//     setPrescriptions(values); // Update the state

//     if (isEditMode) {
//       // Extract composite key values
//       const { MDD_PATIENT_CODE, MDD_SERIAL_NO, MDD_MATERIAL_CODE } =
//         removedPrescription;

//       // Make the API call to update the status
//       axios
//         .put(
//           `${process.env.REACT_APP_API_BASE_URL}/Drug/drugstatusupdate`,
//           null,
//           {
//             params: {
//               patientCode: MDD_PATIENT_CODE,
//               serialNo: MDD_SERIAL_NO,
//               materialCode: MDD_MATERIAL_CODE,
//             },
//           }
//         )
//         .then((response) => {
//           console.log('Medicine status updated to "I":', response.data);
//         })
//         .catch((error) => {
//           console.error("Error updating medicine status:", error);
//         });
//     }
//   };

//   const handleSearchChange = async (index, event) => {
//     const query = event.target.value;
//     const values = [...prescriptions];
//     values[index].MDD_MATERIAL_NAME = query;
//     setPrescriptions(values);

//     if (query.length > 2) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/Material/search?query=${query}`
//         );
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleSelectMedicine = (index, materialCode, materialName, rate) => {
//     const values = [...prescriptions];
//     values[index].MDD_MATERIAL_CODE = materialCode;
//     values[index].MDD_MATERIAL_NAME = materialName;
//     values[index].MMC_RATE = rate;
//     setSearchResults([]);
//     setPrescriptions(values);
//   };

//   const [treatmentamout, settreatmentamount] = useState(0);

//   useEffect(() => {
//     const fetchExistingData = async () => {
//       if (serialNumber) {
//         setIsEditMode(true); // Enable edit mode

//         try {
//           // Fetch treatment details
//           const treatmentResponse = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/Treatment/patientdetail/treatmentdetail/${patientId}/${serialNumber}`
//           );
//           const treatmentData = treatmentResponse.data;

//           // Update form data with fetched treatment details
//           setFormData((prevData) => ({
//             ...prevData,
//             ...treatmentData,
//           }));

//           // Fetch prescriptions
//           const prescriptionsResponse = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/Drug/${serialNumber}`
//           );

//           const prescriptionsData = prescriptionsResponse.data;
//           console.log(prescriptionsData);

//           // Update prescriptions with fetched data
//           setPrescriptions(prescriptionsData);

//           // if (isEditMode) {
//           //   handleAddPrescription(); // Call handleAddPrescription when isEditMode is true
//           // }

//           if (isEditMode) {
//             handleAddNewPrescription(); // Call handleAddNewPrescription  by default when isEditMode is true
//           }

//           console.log();

//           setPatientdetails(treatmentData.patientdetails); // Set patient details if available
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setPatientError("Unable to load patient details.");
//         }
//       }
//     };

//     fetchExistingData();
//   }, [serialNumber, patientId, isEditMode]);

//   const fetchtreatmentcount = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/Treatment/Gettreatments/${patientId}`
//       );
//       const count = response.data.TreatmentCount;
//       settreatmentamount(count >= 0 ? count + 1 : 0); // Increment treatment count by 1 and update state
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Prepare the prescriptions data
//     const preparedPrescriptions = prescriptions.map((prescription) => ({
//       ...prescription,
//       MDD_TAKES:
//         prescription.MDD_TAKES === "other"
//           ? prescription.MDD_TAKES_CUSTOM
//           : prescription.MDD_TAKES,
//     }));

//     try {
//       if (isEditMode) {
//         try {
//           // Prepare the payload for treatment and drugs
//           const updatePayload = {
//             Treatment: {
//               MTD_DOCTOR: formData.MTD_DOCTOR,
//               MTD_TYPE: formData.MTD_TYPE,
//               MTD_COMPLAIN: formData.MTD_COMPLAIN,
//               MTD_DIAGNOSTICS: formData.MTD_DIAGNOSTICS,
//               MTD_REMARKS: formData.MTD_REMARKS,
//               MTD_AMOUNT: formData.MTD_AMOUNT,
//               MTD_UPDATED_BY: Name,
//               MTD_TREATMENT_STATUS: formData.MTD_TREATMENT_STATUS,
//             },
//             Drugs: preparedPrescriptions.map((prescription) => ({
//               MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
//               MDD_QUANTITY: parseInt(prescription.MDD_QUANTITY) || 0,
//               MDD_RATE: prescription.MMC_RATE || prescription.MDD_RATE,
//               // MDD_AMOUNT: prescription.MMC_RATE || (parseFloat(prescription.MDD_RATE) || 0) * (parseInt(prescription.MDD_QUANTITY) || 0),

//               MDD_AMOUNT:
//                 (parseFloat(prescription.MDD_RATE) || 0) *
//                   (parseInt(prescription.MDD_QUANTITY) || 0) ||
//                 parseFloat(prescription.MMC_RATE) ||
//                 0,

//               MDD_DOSAGE: "",
//               MDD_TAKES: prescription.MDD_TAKES,
//               MDD_GIVEN_QUANTITY: 0,
//               MDD_STATUS: "",
//             })),
//           };

//           console.log(updatePayload);

//           // Make the API call to update treatment and drug details
//           const response = await axios.post(
//             `${process.env.REACT_APP_API_BASE_URL}/Treatment/updatingtreatment/${patientId}/${serialNumber}`,
//             updatePayload
//           );

//           if (response.status === 200) {
//             // Success message
//             alert("Treatment and drug records updated successfully.");
//             window.location.reload();
//           } else {
//             alert("Failed to update treatment and drug records.");
//           }
//         } catch (error) {
//           // Error handling
//           if (error.response && error.response.data) {
//             console.error(`Error: ${error.response.data}`);
//           } else {
//             alert("An unexpected error occurred. Please try again later.");
//             console.error(
//               "An unexpected error occurred. Please try again later."
//             );
//           }
//         }
//       } else {
//         //In here I used 2 api for submit

//         //This api used to submit for treatment table
//         const treatmentResponse = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}/Treatment`,
//           formData
//         );
//         const serial_no = treatmentResponse.data.MTD_SERIAL_NO;

//         // Submit the prescriptions data
//         if (
//           preparedPrescriptions.length > 0 &&
//           preparedPrescriptions.some(
//             (prescription) => prescription.MDD_MATERIAL_CODE
//           )
//         ) {
//           const drugDetailsPromises = preparedPrescriptions.map(
//             (prescription) => {
//               if (prescription.MDD_MATERIAL_CODE) {
//                 if (
//                   !prescription.MDD_MATERIAL_CODE ||
//                   !prescription.MDD_TAKES ||
//                   !prescription.MDD_QUANTITY
//                 ) {
//                   alert("All  drug  details are required.");
//                   return;
//                 }

//                 //This api used to submit for drug table separately
//                 return axios.post(
//                   `${process.env.REACT_APP_API_BASE_URL}/Drug`,
//                   {
//                     MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
//                     MDD_DOSAGE: prescription.MDD_DOSAGE,
//                     MDD_TAKES: prescription.MDD_TAKES, // Use the prepared MDD_TAKES
//                     MDD_CREATED_BY: formData.MTD_CREATED_BY,
//                     MDD_CREATED_DATE: new Date().toISOString(),
//                     MDD_UPDATED_BY: "",
//                     MDD_UPDATED_DATE: null,
//                     MDD_PATIENT_CODE: patientId, // patient id
//                     MDD_RATE: prescription.MMC_RATE || 0,
//                     MDD_STATUS: "",
//                     MDD_SERIAL_NO: serial_no, //serial number
//                     MDD_QUANTITY: prescription.MDD_QUANTITY || 0,
//                     MDD_AMOUNT:
//                       prescription.MMC_RATE * (prescription.MDD_QUANTITY || 0),
//                   }
//                 );
//               }
//               return null;
//             }
//           );

//           await Promise.all(
//             drugDetailsPromises.filter((promise) => promise !== null)
//           );
//         }

//         // Navigate to the view record page
//         navigate(`/dashboard/view-record/${patientId}/${serial_no}`);

//         // Reset form after submission
//         setFormData({
//           MTD_PATIENT_CODE: patientId,
//           MTD_DATE: new Date().toISOString(),
//           MTD_DOCTOR: Name || "",
//           MTD_TYPE: "",
//           MTD_COMPLAIN: "",
//           MTD_DIAGNOSTICS: "",
//           MTD_REMARKS: "",
//           MTD_AMOUNT: "",
//           MTD_PAYMENT_STATUS: "",
//           MTD_TREATMENT_STATUS: "",
//           MTD_SMS_STATUS: "",
//           MTD_SMS: "",
//           MTD_MEDICAL_STATUS: "",
//           MTD_STATUS: "",
//           MTD_CREATED_BY: Name || "",
//           MTD_CREATED_DATE: new Date().toISOString(),
//           MTD_UPDATED_BY: "",
//           MTD_UPDATED_DATE: null,
//         });
//         setPrescriptions([
//           {
//             MDD_MATERIAL_CODE: "",
//             MDD_MATERIAL_NAME: "",
//             MDD_DOSAGE: "",
//             MDD_TAKES: "",
//             MDD_TAKES_CUSTOM: "", // Reset custom field
//             MDD_QUANTITY: "",
//             MMC_RATE: 0,
//           },
//         ]);
//       }

//       // Submit the treatment data
//     } catch (error) {
//       console.error(
//         "Error submitting record:",
//         error.response?.data || error.message
//       );
//       alert("Error submitting treatment and prescription");
//       setModalContent("Error submitting treatment and prescription details.");
//       // setIsModalOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="treatment-form-container">
//       <div className="header">
//         <button className="back-button" onClick={() => navigate(-1)} style={{ width:"20%"}}>
//           Back
//         </button>
//       </div>
//       <h2 style={{ marginTop:"-10px"}}>
//         {" "}
//         {isEditMode ? "Edit treatment details" : "Add Treatment Details"}
//       </h2>

//       {/* <p>Channel number: {channelnumber}</p> */}

//       {channelnumber && (
//         <p style={{ textAlign: "center" }}>Channel number: {channelnumber}</p>
//       )}

//       <p className="subheading">
//         Fill in the treatment and prescription information below.
//       </p>

//       <div className="patient-info">
//         {/* <p><strong>Patient name:</strong> {patientdetails ? patientdetails.MPD_PATIENT_NAME : 'Loading'}<br></br></p> */}
//         <p>
//           {/* <strong>Patient name:</strong> {patientdetails ? patientdetails.MPD_PATIENT_NAME : 'Loading'}<br></br> */}
//           {/* <strong>Treatment number: {treatmentamout >= 0 ? treatmentamout : "N/A"}</strong> */}
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="form-rowx">
//           <div className="form-group-half-width1">
//             <label htmlFor="MTD_COMPLAIN">Patient Complaint</label>
//             <textarea
//               id="MTD_COMPLAIN"
//               value={formData.MTD_COMPLAIN}
//               onChange={handleFormChange}
//               placeholder="Enter patient complaint"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-rowx">
//           <div className="form-group-half-width1">
//             <label htmlFor="MTD_DIAGNOSTICS">Diagnosis</label>
//             <textarea
//               id="MTD_DIAGNOSTICS"
//               value={formData.MTD_DIAGNOSTICS}
//               onChange={handleFormChange}
//               placeholder="Enter patient diagnosis details"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-groupx">
//           <label>Prescriptions</label>
//           {prescriptions.map((prescription, index) => (
//             <div key={index} className="medicine-group">
//               {/* Medicine Name Input and Search */}
//               <input
//                 type="text"
//                 name="MDD_MATERIAL_NAME"
//                 placeholder="Search medicines"
//                 value={prescription.MDD_MATERIAL_NAME}
//                 onChange={(event) => handleSearchChange(index, event)}
//                 onFocus={() => setActivePrescriptionIndex(index)}
//                 disabled={prescription.isFetched}
//                 required={!isEditMode}
//               />
//               <br />
//               {activePrescriptionIndex === index &&
//                 searchResults.length > 0 && (
//                   <ul className="search-suggestions">
//                     {searchResults.map((medicine) => (
//                       <li
//                         key={medicine.MMC_MATERIAL_CODE}
//                         onClick={() =>
//                           handleSelectMedicine(
//                             index,
//                             medicine.MMC_MATERIAL_CODE,
//                             medicine.MMC_DESCRIPTION,
//                             medicine.MMC_RATE
//                           )
//                         }
//                       >
//                         {medicine.MMC_DESCRIPTION}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//               {/* MDD_TAKES Select Dropdown */}
//               <select
//                 name="MDD_TAKES"
//                 value={prescription.MDD_TAKES}
//                 onChange={(event) => handlePrescriptionChange(index, event)}
//                 required={!isEditMode}
//               >
//                 <option value="not-define">How to Take</option>
//                 <option value="Daily">Daily</option>
//                 <option value="Twice a Day before food">
//                   Twice a Day before food
//                 </option>
//                 <option value="Three times per day before food">
//                   Three times per day before food
//                 </option>
//                 <option value="Twice a day after food">
//                   Twice a day after food
//                 </option>
//                 <option value="Three times per day after food">
//                   Three times per day after food
//                 </option>
//                 <option value="As Needed">As Needed</option>
//                 <option value="other">Other</option>
//               </select>

//               {/* Conditional Custom Input for "Other" */}
//               {prescription.MDD_TAKES === "other" && (
//                 <input
//                   type="text"
//                   name="MDD_TAKES_CUSTOM"
//                   value={prescription.MDD_TAKES_CUSTOM}
//                   onChange={(event) => handlePrescriptionChange(index, event)}
//                   placeholder="Specify how to take"
//                   // required
//                 />
//               )}
//               {/* Quantity Input */}
//               <input
//                 type="number"
//                 name="MDD_QUANTITY"
//                 value={prescription.MDD_QUANTITY}
//                 onChange={(event) => handlePrescriptionChange(index, event)}
//                 placeholder="Quantity"
//                 min="1"
//                 required={!isEditMode}
//               />

//               {/* Remove Button */}
//               <button
//                 type="button"
//                 className="remove"
//                 onClick={() => handleRemovePrescription(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           {/* <button
//             type="button"
//             className="Add-prescrib"
//             onClick={handleAddPrescription}
//           >
//             Add drug
//           </button> */}
//           <br />
//         </div>

//         <div className="form-rowx">
//           <div className="form-group-half-width1">
//             <label htmlFor="MTD_REMARKS">Doctor's Remarks</label>
//             <textarea
//               id="MTD_REMARKS"
//               value={formData.MTD_REMARKS}
//               onChange={handleFormChange}
//               placeholder="Enter doctor remarks for the patient"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-rowx">
//           <div className="form-group-half-width1">
//             <label htmlFor="MTD_TREATMENT_STATUS">Treatment Status</label>
//             <select
//               id="MTD_TREATMENT_STATUS"
//               value={formData.MTD_TREATMENT_STATUS}
//               onChange={handleFormChange}
//               required
//             >
//               <option value="">Select Treatment Status</option>
//               <option value="C">Completed</option>
//               {/* <option value="N">Not Completed</option> */}
//               <option value="P">Preparation completed</option>
//             </select>
//           </div>
//           <div className="form-group-half-width1">
//             <label htmlFor="MTD_AMOUNT">Treatment Amount</label>
//             <input
//               type="number"
//               id="MTD_AMOUNT"
//               name="MTD_AMOUNT"
//               value={formData.MTD_AMOUNT}
//               onChange={handleFormChange}
//               placeholder="Enter treatment amount in number "
//               required
//               min="1"
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="submit-button"
//           disabled={!(role === "Admin" || role === "Doc")}
//           style={{
//             cursor: !(role === "Admin" || role === "Doc")
//               ? "not-allowed"
//               : "pointer",
//             backgroundColor: !(role === "Admin" || role === "Doc")
//               ? "#ccc"
//               : "#007bff",
//             color: !(role === "Admin" || role === "Doc") ? "#666" : "#fff",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             transition: "0.3s",
//           }}
//         >
//           {isEditMode ? "Update Treatment" : "Submit"}
//         </button>
//       </form>

//       <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
//         <h2>Alert</h2>
//         <p>{modalContent}</p>
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default Addrecord;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import {
//   Grid,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Box,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Divider,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import {
//   ArrowBack,
//   Add,
//   Delete,
//   MedicalServices,
//   LocalHospital,
//   Healing,
//   Description,
//   MonetizationOn,
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(2),
//   borderRadius: theme.shape.borderRadius * 2,
//   boxShadow: theme.shadows[3],
// }));

// const AddRecord = () => {
//   const { patientId } = useParams();
//   const Name = localStorage.getItem("Name");
//   const location = useLocation();
//   const { appoinmentid } = location.state || {};
//   const { channelnumber } = location.state || {};
//   const { MTD_APPOINMENT_ID } = location.state || {};
//   const [searchResults, setSearchResults] = useState([]);
//   const [patientError, setPatientError] = useState("");
//   const [patientdetails, setPatientdetails] = useState(null);
//   const serialNumber = location.state?.serialNumber || null;
//   const [isEditMode, setIsEditMode] = useState(false);
//   const role = localStorage.getItem("Role");
//   const [activePrescriptionIndex, setActivePrescriptionIndex] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [prescriptions, setPrescriptions] = useState([
//     {
//       MDD_MATERIAL_CODE: "",
//       MDD_MATERIAL_NAME: "",
//       MDD_DOSAGE: "",
//       MDD_TAKES: "",
//       MDD_TAKES_CUSTOM: "",
//       MDD_QUANTITY: "",
//       MMC_RATE: 0,
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     MTD_PATIENT_CODE: patientId,
//     MTD_DATE: new Date().toISOString(),
//     MTD_TYPE: "",
//     MTD_DOCTOR: Name || "",
//     MTD_TYPE: "",
//     MTD_COMPLAIN: "",
//     MTD_DIAGNOSTICS: "",
//     MTD_REMARKS: "",
//     MTD_AMOUNT: "",
//     MTD_PAYMENT_STATUS: "",
//     MTD_TREATMENT_STATUS: "",
//     MTD_SMS_STATUS: "",
//     MTD_SMS: "",
//     MTD_MEDICAL_STATUS: "",
//     MTD_STATUS: "",
//     MTD_CREATED_BY: Name || "",
//     MTD_CREATED_DATE: new Date().toISOString(),
//     MTD_UPDATED_BY: "",
//     MTD_CHANNEL_NO: channelnumber || null,
//     MTD_UPDATED_DATE: null,
//     // MTD_APPOINMENT_ID: appoinmentid,
//     MTD_APPOINMENT_ID: MTD_APPOINMENT_ID || appoinmentid || null,
//   });

//   // const handleFormChange = (e) => {
//   //   const { id, value } = e.target;
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [id]: value,
//   //   }));
//   // };


//   //nodified according to treatment status (old code above)
//   const handleFormChange = (e) => {
//     const { name, value, id } = e.target;
//     const fieldName = name || id;

//     setFormData((prevData) => ({
//       ...prevData,
//       [fieldName]: value,
//     }));
//   };

//   const handlePrescriptionChange = (index, event) => {
//     const { name, value } = event.target;
//     const values = [...prescriptions];

//     if (name === "MDD_TAKES") {
//       values[index][name] = value;
//       if (value !== "other") {
//         values[index].MDD_TAKES_CUSTOM = "";
//       }
//     } else if (name === "MDD_TAKES_CUSTOM") {
//       values[index][name] = value;
//     } else {
//       values[index][name] = value;
//     }

//     setPrescriptions(values);

//     const isCompleted =
//       values[index].MDD_MATERIAL_NAME &&
//       values[index].MDD_TAKES &&
//       (values[index].MDD_TAKES !== "other" || values[index].MDD_TAKES_CUSTOM) &&
//       values[index].MDD_QUANTITY;

//     if (isCompleted && index === prescriptions.length - 1) {
//       handleAddPrescription();
//     }
//   };

//   const handleAddPrescription = () => {
//     setPrescriptions([
//       ...prescriptions,
//       {
//         MDD_MATERIAL_CODE: "",
//         MDD_MATERIAL_NAME: "",
//         MDD_DOSAGE: "",
//         MDD_TAKES: "",
//         MDD_TAKES_CUSTOM: "",
//         MDD_QUANTITY: "",
//         MMC_RATE: 0,
//       },
//     ]);
//   };

//   const handleAddNewPrescription = () => {
//     const newPrescription = {
//       MDD_MATERIAL_CODE: "",
//       MDD_MATERIAL_NAME: "",
//       MDD_DOSAGE: "",
//       MDD_TAKES: "",
//       MDD_TAKES_CUSTOM: "",
//       MDD_QUANTITY: "",
//       MMC_RATE: 0,
//     };

//     setPrescriptions((prevPrescriptions) => [
//       ...prevPrescriptions,
//       newPrescription,
//     ]);
//   };

//   const handleRemovePrescription = (index) => {
//     const values = [...prescriptions];
//     const removedPrescription = values[index];
//     values.splice(index, 1);
//     setPrescriptions(values);

//     if (isEditMode) {
//       const { MDD_PATIENT_CODE, MDD_SERIAL_NO, MDD_MATERIAL_CODE } =
//         removedPrescription;

//       axios
//         .put(
//           `${process.env.REACT_APP_API_BASE_URL}/Drug/drugstatusupdate`,
//           null,
//           {
//             params: {
//               patientCode: MDD_PATIENT_CODE,
//               serialNo: MDD_SERIAL_NO,
//               materialCode: MDD_MATERIAL_CODE,
//             },
//           }
//         )
//         .then((response) => {
//           console.log('Medicine status updated to "I":', response.data);
//         })
//         .catch((error) => {
//           console.error("Error updating medicine status:", error);
//         });
//     }
//   };

//   const handleSearchChange = async (index, event) => {
//     const query = event.target.value;
//     const values = [...prescriptions];
//     values[index].MDD_MATERIAL_NAME = query;
//     setPrescriptions(values);

//     if (query.length > 2) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/Material/search?query=${query}`
//         );
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleSelectMedicine = (index, materialCode, materialName, rate) => {
//     const values = [...prescriptions];
//     values[index].MDD_MATERIAL_CODE = materialCode;
//     values[index].MDD_MATERIAL_NAME = materialName;
//     values[index].MMC_RATE = rate;
//     setSearchResults([]);
//     setPrescriptions(values);
//   };

//   useEffect(() => {
//     const fetchExistingData = async () => {
//       if (serialNumber) {
//         setIsEditMode(true);

//         try {
//           const treatmentResponse = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/Treatment/patientdetail/treatmentdetail/${patientId}/${serialNumber}`
//           );
//           const treatmentData = treatmentResponse.data;

//           setFormData((prevData) => ({
//             ...prevData,
//             ...treatmentData,
//           }));

//           const prescriptionsResponse = await axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/Drug/${serialNumber}`
//           );

//           const prescriptionsData = prescriptionsResponse.data;
//           setPrescriptions(prescriptionsData);
//           setPatientdetails(treatmentData.patientdetails);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setPatientError("Unable to load patient details.");
//         }
//       }
//     };

//     fetchExistingData();
//   }, [serialNumber, patientId, isEditMode]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const preparedPrescriptions = prescriptions.map((prescription) => ({
//       ...prescription,
//       MDD_TAKES:
//         prescription.MDD_TAKES === "other"
//           ? prescription.MDD_TAKES_CUSTOM
//           : prescription.MDD_TAKES,
//     }));

//     try {
//       if (isEditMode) {
//         try {
//           const updatePayload = {
//             Treatment: {
//               MTD_DOCTOR: formData.MTD_DOCTOR,
//               MTD_TYPE: formData.MTD_TYPE,
//               MTD_COMPLAIN: formData.MTD_COMPLAIN,
//               MTD_DIAGNOSTICS: formData.MTD_DIAGNOSTICS,
//               MTD_REMARKS: formData.MTD_REMARKS,
//               MTD_AMOUNT: formData.MTD_AMOUNT,
//               MTD_UPDATED_BY: Name,
//               MTD_TREATMENT_STATUS: formData.MTD_TREATMENT_STATUS,
//             },
//             Drugs: preparedPrescriptions.map((prescription) => ({
//               MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
//               MDD_QUANTITY: parseInt(prescription.MDD_QUANTITY) || 0,
//               MDD_RATE: prescription.MMC_RATE || prescription.MDD_RATE,
//               MDD_AMOUNT:
//                 (parseFloat(prescription.MDD_RATE) || 0) *
//                 (parseInt(prescription.MDD_QUANTITY) || 0) ||
//                 parseFloat(prescription.MMC_RATE) ||
//                 0,
//               MDD_DOSAGE: "",
//               MDD_TAKES: prescription.MDD_TAKES,
//               MDD_GIVEN_QUANTITY: 0,
//               MDD_STATUS: "",
//             })),
//           };

//           const response = await axios.post(
//             `${process.env.REACT_APP_API_BASE_URL}/Treatment/updatingtreatment/${patientId}/${serialNumber}`,
//             updatePayload
//           );

//           if (response.status === 200) {
//             setModalContent("Treatment and drug records updated successfully.");
//             setIsModalOpen(true);
//             setTimeout(() => {
//               window.location.reload();
//             }, 1500);
//           } else {
//             setModalContent("Failed to update treatment and drug records.");
//             setIsModalOpen(true);
//           }
//         } catch (error) {
//           if (error.response && error.response.data) {
//             setModalContent(`Error: ${error.response.data}`);
//           } else {
//             setModalContent(
//               "An unexpected error occurred. Please try again later."
//             );
//           }
//           setIsModalOpen(true);
//         }
//       } else {
//         // const treatmentResponse = await axios.post(
//         //   `${process.env.REACT_APP_API_BASE_URL}/Treatment`,
//         //   formData
//         // );

//         //pass the MTD_APPOINMENT_ID for selected patient
//         const treatmentResponse = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}/Treatment`,
//           {
//             ...formData,
//             MTD_APPOINMENT_ID: formData.MTD_APPOINMENT_ID || null 
//           }
//         );
//         const serial_no = treatmentResponse.data.MTD_SERIAL_NO;

//         if (
//           preparedPrescriptions.length > 0 &&
//           preparedPrescriptions.some(
//             (prescription) => prescription.MDD_MATERIAL_CODE
//           )
//         ) {
//           const drugDetailsPromises = preparedPrescriptions.map(
//             (prescription) => {
//               if (prescription.MDD_MATERIAL_CODE) {
//                 if (
//                   !prescription.MDD_MATERIAL_CODE ||
//                   !prescription.MDD_TAKES ||
//                   !prescription.MDD_QUANTITY
//                 ) {
//                   setModalContent("All drug details are required.");
//                   setIsModalOpen(true);
//                   return;
//                 }

//                 return axios.post(
//                   `${process.env.REACT_APP_API_BASE_URL}/Drug`,
//                   {
//                     MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
//                     MDD_DOSAGE: prescription.MDD_DOSAGE,
//                     MDD_TAKES: prescription.MDD_TAKES,
//                     MDD_CREATED_BY: formData.MTD_CREATED_BY,
//                     MDD_CREATED_DATE: new Date().toISOString(),
//                     MDD_UPDATED_BY: "",
//                     MDD_UPDATED_DATE: null,
//                     MDD_PATIENT_CODE: patientId,
//                     MDD_RATE: prescription.MMC_RATE || 0,
//                     MDD_STATUS: "",
//                     MDD_SERIAL_NO: serial_no,
//                     MDD_QUANTITY: prescription.MDD_QUANTITY || 0,
//                     MDD_AMOUNT:
//                       prescription.MMC_RATE * (prescription.MDD_QUANTITY || 0),
//                   }
//                 );
//               }
//               return null;
//             }
//           );

//           await Promise.all(
//             drugDetailsPromises.filter((promise) => promise !== null)
//           );
//         }

//         navigate(`/dashboard/view-record/${patientId}/${serial_no}`);
//       }
//     } catch (error) {
//       console.error(
//         "Error submitting record:",
//         error.response?.data || error.message
//       );
//       setModalContent("Error submitting treatment and prescription details.");
//       setIsModalOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <Container maxWidth="xl">
//       <Box sx={{ my: 2 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => navigate(-1)}
//           variant="outlined"
//           sx={{ mb: 2 }}
//         >
//           Back
//         </Button>

//         <StyledPaper elevation={3}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               mb: 2,
//               justifyContent: "center",
//             }}
//           >
//             <MedicalServices color="primary" sx={{ fontSize: 40, mr: 2 }} />
//             <Typography
//               variant="h4"
//               color="primary"
//               fontWeight={600}
//               gutterBottom
//             >
//               {isEditMode ? "Edit Treatment Details" : "Add Treatment Details"}
//             </Typography>
//           </Box>

//           {channelnumber && (
//             <Box sx={{ textAlign: "center", mb: 3 }}>
//               <Chip
//                 label={`Channel Number: ${channelnumber}`}
//                 color="primary"
//                 variant="outlined"
//                 avatar={<Avatar>#</Avatar>}
//               />
//             </Box>
//           )}

//           <Typography
//             variant="subtitle1"
//             color="text.secondary"
//             gutterBottom
//             sx={{ mb: 2, textAlign: "center", mt: -2 }}
//           >
//             Fill in the treatment and prescription information below.
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Patient Complaint
//               </Typography>
//               <TextField
//                 fullWidth
//                 id="MTD_COMPLAIN"
//                 value={formData.MTD_COMPLAIN}
//                 onChange={handleFormChange}
//                 placeholder="Enter patient complaint"
//                 required
//                 multiline
//                 rows={3}
//                 variant="outlined"
//               />
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Diagnosis
//               </Typography>
//               <TextField
//                 fullWidth
//                 id="MTD_DIAGNOSTICS"
//                 value={formData.MTD_DIAGNOSTICS}
//                 onChange={handleFormChange}
//                 placeholder="Enter patient diagnosis details"
//                 required
//                 multiline
//                 rows={3}
//                 variant="outlined"
//               />
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 <Healing sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }} />
//                 Prescriptions
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               {prescriptions.map((prescription, index) => (
//                 <Paper
//                   key={index}
//                   elevation={2}
//                   sx={{ p: 2, mb: 2, position: "relative" }}
//                 >
//                   <Box
//                     sx={{
//                       display: "grid",
//                       gridTemplateColumns: {
//                         xs: "1fr",
//                         sm: "minmax(250px, 1fr) minmax(180px, 0.8fr) minmax(100px, 0.5fr) minmax(120px, 0.6fr) minmax(100px, 0.5fr)",
//                       },
//                       gap: 2,
//                       alignItems: "flex-end",
//                       mb: 2,
//                     }}
//                   >
//                     <Box sx={{ minWidth: 0 }}>
//                       <TextField
//                         fullWidth
//                         label="Search Medicine"
//                         name="MDD_MATERIAL_NAME"
//                         value={prescription.MDD_MATERIAL_NAME}
//                         onChange={(event) => handleSearchChange(index, event)}
//                         onFocus={() => setActivePrescriptionIndex(index)}
//                         disabled={prescription.isFetched}
//                         required={!isEditMode}
//                         sx={{
//                           minWidth: { xs: "100%", sm: 250 },
//                           "& .MuiInputBase-root": { height: 56 },
//                         }}
//                       />
//                       {activePrescriptionIndex === index &&
//                         searchResults.length > 0 && (
//                           <Paper
//                             elevation={3}
//                             sx={{
//                               position: "absolute",
//                               zIndex: 1,
//                               width: { xs: "calc(100% - 32px)", sm: 250 },
//                               maxHeight: 200,
//                               overflow: "auto",
//                               mt: 1,
//                             }}
//                           >
//                             <List>
//                               {searchResults.map((medicine) => (
//                                 <ListItem
//                                   key={medicine.MMC_MATERIAL_CODE}
//                                   button
//                                   onClick={() =>
//                                     handleSelectMedicine(
//                                       index,
//                                       medicine.MMC_MATERIAL_CODE,
//                                       medicine.MMC_DESCRIPTION,
//                                       medicine.MMC_RATE
//                                     )
//                                   }
//                                 >
//                                   <ListItemText
//                                     primary={medicine.MMC_DESCRIPTION}
//                                     secondary={`Code: ${medicine.MMC_MATERIAL_CODE}`}
//                                   />
//                                 </ListItem>
//                               ))}
//                             </List>
//                           </Paper>
//                         )}
//                     </Box>

//                     <Box sx={{ minWidth: 0 }}>
//                       <FormControl fullWidth sx={{ minWidth: 180 }}>
//                         <InputLabel>How to Take</InputLabel>
//                         <Select
//                           name="MDD_TAKES"
//                           value={prescription.MDD_TAKES}
//                           onChange={(event) =>
//                             handlePrescriptionChange(index, event)
//                           }
//                           required={!isEditMode}
//                           label="How to Take"
//                           sx={{
//                             "& .MuiSelect-select": {
//                               height: "56px !important",
//                               boxSizing: "border-box",
//                             },
//                           }}
//                         >
//                           <MenuItem value="not-define">
//                             Select How to Take
//                           </MenuItem>
//                           <MenuItem value="Daily">Daily</MenuItem>
//                           <MenuItem value="Twice a Day before food">
//                             Twice a Day before food
//                           </MenuItem>
//                           <MenuItem value="Three times per day before food">
//                             Three times per day before food
//                           </MenuItem>
//                           <MenuItem value="Twice a day after food">
//                             Twice a day after food
//                           </MenuItem>
//                           <MenuItem value="Three times per day after food">
//                             Three times per day after food
//                           </MenuItem>
//                           <MenuItem value="As Needed">As Needed</MenuItem>
//                           <MenuItem value="other">Other</MenuItem>
//                         </Select>
//                       </FormControl>

//                       {prescription.MDD_TAKES === "other" && (
//                         <TextField
//                           fullWidth
//                           sx={{
//                             mt: 2,
//                             minWidth: 180,
//                             "& .MuiInputBase-root": { height: 56 },
//                           }}
//                           name="MDD_TAKES_CUSTOM"
//                           value={prescription.MDD_TAKES_CUSTOM}
//                           onChange={(event) =>
//                             handlePrescriptionChange(index, event)
//                           }
//                           placeholder="Specify how to take"
//                         />
//                       )}
//                     </Box>

//                     <Box>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         name="MDD_QUANTITY"
//                         label="Quantity"
//                         value={prescription.MDD_QUANTITY}
//                         onChange={(event) =>
//                           handlePrescriptionChange(index, event)
//                         }
//                         required={!isEditMode}
//                         inputProps={{ min: "1" }}
//                         sx={{
//                           minWidth: 100,
//                           "& .MuiInputBase-root": { height: 56 },
//                         }}
//                       />
//                     </Box>

//                     <Box>
//                       <Button
//                         startIcon={<Delete />}
//                         onClick={() => handleRemovePrescription(index)}
//                         color="error"
//                         variant="outlined"
//                         fullWidth
//                         sx={{
//                           minWidth: 120,
//                           height: 56,
//                           "& .MuiButton-startIcon": { marginRight: "8px" },
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </Box>

//                     {index === prescriptions.length - 1 && (
//                       <Box>
//                         <Button
//                           startIcon={<Add />}
//                           onClick={handleAddPrescription}
//                           variant="outlined"
//                           color="primary"
//                           fullWidth
//                           sx={{
//                             minWidth: 100,
//                             height: 56,
//                             "& .MuiButton-startIcon": { marginRight: "8px" },
//                           }}
//                         >
//                           Add Medicine
//                         </Button>
//                       </Box>
//                     )}
//                   </Box>
//                 </Paper>
//               ))}


//               {prescriptions.length === 0 && (
//                 <Button
//                   startIcon={<Add />}
//                   onClick={handleAddPrescription}
//                   variant="outlined"
//                   color="primary"
//                   sx={{
//                     mt: 1,
//                     minWidth: 200,
//                     height: 56,
//                     "& .MuiButton-startIcon": { marginRight: "8px" },
//                   }}
//                 >
//                   Add Medicine
//                 </Button>
//               )}
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Doctor's Remarks
//               </Typography>
//               <TextField
//                 fullWidth
//                 id="MTD_REMARKS"
//                 value={formData.MTD_REMARKS}
//                 onChange={handleFormChange}
//                 placeholder="Enter doctor remarks for the patient"
//                 required
//                 multiline
//                 rows={3}
//                 variant="outlined"
//               />
//             </Box>

//             {/* Treatment Status */}
//             {/* <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Treatment Status
//               </Typography>
//               <FormControl fullWidth>
//                 <InputLabel>Treatment Status</InputLabel>
//                 <Select
//                   id="MTD_TREATMENT_STATUS"
//                   value={formData.MTD_TREATMENT_STATUS}
//                   onChange={handleFormChange}
//                   required
//                   label="Treatment Status"
//                 >
//                   <MenuItem value="">Select Treatment Status</MenuItem>
//                   <MenuItem value="C">Completed</MenuItem>
//                   <MenuItem value="P">Preparation completed</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box> */}

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Treatment Status
//               </Typography>
//               <FormControl fullWidth>
//                 <InputLabel>Treatment Status</InputLabel>
//                 <Select
//                   name="MTD_TREATMENT_STATUS" // Add name attribute
//                   id="MTD_TREATMENT_STATUS"
//                   value={formData.MTD_TREATMENT_STATUS}
//                   onChange={handleFormChange}
//                   required
//                   label="Treatment Status"
//                 >
//                   <MenuItem value="">Select Treatment Status</MenuItem>
//                   <MenuItem value="C">Completed</MenuItem>
//                   <MenuItem value="P">Preparation completed</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom>
//                 Treatment Amount
//               </Typography>
//               <TextField
//                 fullWidth
//                 type="number"
//                 id="MTD_AMOUNT"
//                 name="MTD_AMOUNT"
//                 label="Amount"
//                 value={formData.MTD_AMOUNT}
//                 onChange={handleFormChange}
//                 placeholder="Enter treatment amount"
//                 required
//                 inputProps={{ min: "1" }}
//                 InputProps={{
//                   startAdornment: (
//                     <MonetizationOn color="action" sx={{ mr: 1, color: "primary.main" }} />
//                   ),
//                 }}
//               />
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 disabled={!(role === "Admin" || role === "Doc") || loading}
//                 startIcon={
//                   loading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <Description />
//                   )
//                 }
//                 sx={{ py: 1.5, px: 4, width: { xs: "100%", sm: 300 } }}
//               >
//                 {isEditMode ? "Update Treatment" : "Submit Treatment"}
//               </Button>
//             </Box>
//           </form>
//         </StyledPaper>
//       </Box>

//       <Dialog open={isModalOpen} onClose={closeModal}>
//         <DialogTitle>
//           {modalContent.includes("Error") ? "Error" : "Success"}
//         </DialogTitle>
//         <DialogContent>
//           <Typography>{modalContent}</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeModal} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default AddRecord;



//Modified this code according to add snackbar message and when submitted editted tratment then it again nivigate to medical histry
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Delete,
  MedicalServices,
  LocalHospital,
  Healing,
  Description,
  MonetizationOn,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

const AddRecord = () => {
  const { patientId } = useParams();
  const Name = localStorage.getItem("Name");
  const location = useLocation();
  const { appoinmentid } = location.state || {};
  const { channelnumber } = location.state || {};
  const { MTD_APPOINMENT_ID } = location.state || {};
  const [searchResults, setSearchResults] = useState([]);
  const [patientError, setPatientError] = useState("");
  const [patientdetails, setPatientdetails] = useState(null);
  const serialNumber = location.state?.serialNumber || null;
  const [isEditMode, setIsEditMode] = useState(false);
  const role = localStorage.getItem("Role");
  const [activePrescriptionIndex, setActivePrescriptionIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [prescriptions, setPrescriptions] = useState([
    {
      MDD_MATERIAL_CODE: "",
      MDD_MATERIAL_NAME: "",
      MDD_DOSAGE: "",
      MDD_TAKES: "",
      MDD_TAKES_CUSTOM: "",
      MDD_QUANTITY: "",
      MMC_RATE: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    MTD_PATIENT_CODE: patientId,
    MTD_DATE: new Date().toISOString(),
    MTD_TYPE: "",
    MTD_DOCTOR: Name || "",
    MTD_TYPE: "",
    MTD_COMPLAIN: "",
    MTD_DIAGNOSTICS: "",
    MTD_REMARKS: "",
    MTD_AMOUNT: "",
    MTD_PAYMENT_STATUS: "",
    MTD_TREATMENT_STATUS: "",
    MTD_SMS_STATUS: "",
    MTD_SMS: "",
    MTD_MEDICAL_STATUS: "",
    MTD_STATUS: "",
    MTD_CREATED_BY: Name || "",
    MTD_CREATED_DATE: new Date().toISOString(),
    MTD_UPDATED_BY: "",
    MTD_CHANNEL_NO: channelnumber || null,
    MTD_UPDATED_DATE: null,
    MTD_APPOINMENT_ID: MTD_APPOINMENT_ID || appoinmentid || null,
  });

  const handleFormChange = (e) => {
    const { name, value, id } = e.target;
    const fieldName = name || id;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handlePrescriptionChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...prescriptions];

    if (name === "MDD_TAKES") {
      values[index][name] = value;
      if (value !== "other") {
        values[index].MDD_TAKES_CUSTOM = "";
      }
    } else if (name === "MDD_TAKES_CUSTOM") {
      values[index][name] = value;
    } else {
      values[index][name] = value;
    }

    setPrescriptions(values);

    const isCompleted =
      values[index].MDD_MATERIAL_NAME &&
      values[index].MDD_TAKES &&
      (values[index].MDD_TAKES !== "other" || values[index].MDD_TAKES_CUSTOM) &&
      values[index].MDD_QUANTITY;

    if (isCompleted && index === prescriptions.length - 1) {
      handleAddPrescription();
    }
  };

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        MDD_MATERIAL_CODE: "",
        MDD_MATERIAL_NAME: "",
        MDD_DOSAGE: "",
        MDD_TAKES: "",
        MDD_TAKES_CUSTOM: "",
        MDD_QUANTITY: "",
        MMC_RATE: 0,
      },
    ]);
  };

  const handleAddNewPrescription = () => {
    const newPrescription = {
      MDD_MATERIAL_CODE: "",
      MDD_MATERIAL_NAME: "",
      MDD_DOSAGE: "",
      MDD_TAKES: "",
      MDD_TAKES_CUSTOM: "",
      MDD_QUANTITY: "",
      MMC_RATE: 0,
    };

    setPrescriptions((prevPrescriptions) => [
      ...prevPrescriptions,
      newPrescription,
    ]);
  };

  const handleRemovePrescription = (index) => {
    const values = [...prescriptions];
    const removedPrescription = values[index];
    values.splice(index, 1);
    setPrescriptions(values);

    if (isEditMode) {
      const { MDD_PATIENT_CODE, MDD_SERIAL_NO, MDD_MATERIAL_CODE } =
        removedPrescription;

      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/Drug/drugstatusupdate`,
          null,
          {
            params: {
              patientCode: MDD_PATIENT_CODE,
              serialNo: MDD_SERIAL_NO,
              materialCode: MDD_MATERIAL_CODE,
            },
          }
        )
        .then((response) => {
          console.log('Medicine status updated to "I":', response.data);
        })
        .catch((error) => {
          console.error("Error updating medicine status:", error);
        });
    }
  };

  const handleSearchChange = async (index, event) => {
    const query = event.target.value;
    const values = [...prescriptions];
    values[index].MDD_MATERIAL_NAME = query;
    setPrescriptions(values);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/Material/search?query=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectMedicine = (index, materialCode, materialName, rate) => {
    const values = [...prescriptions];
    values[index].MDD_MATERIAL_CODE = materialCode;
    values[index].MDD_MATERIAL_NAME = materialName;
    values[index].MMC_RATE = rate;
    setSearchResults([]);
    setPrescriptions(values);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchExistingData = async () => {
      if (serialNumber) {
        setIsEditMode(true);

        try {
          const treatmentResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/Treatment/patientdetail/treatmentdetail/${patientId}/${serialNumber}`
          );
          const treatmentData = treatmentResponse.data;

          setFormData((prevData) => ({
            ...prevData,
            ...treatmentData,
          }));

          const prescriptionsResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/Drug/${serialNumber}`
          );

          const prescriptionsData = prescriptionsResponse.data;
          setPrescriptions(prescriptionsData);
          setPatientdetails(treatmentData.patientdetails);
        } catch (error) {
          console.error("Error fetching data:", error);
          setPatientError("Unable to load patient details.");
        }
      }
    };

    fetchExistingData();
  }, [serialNumber, patientId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const preparedPrescriptions = prescriptions.map((prescription) => ({
      ...prescription,
      MDD_TAKES:
        prescription.MDD_TAKES === "other"
          ? prescription.MDD_TAKES_CUSTOM
          : prescription.MDD_TAKES,
    }));

    try {
      if (isEditMode) {
        try {
          const updatePayload = {
            Treatment: {
              MTD_DOCTOR: formData.MTD_DOCTOR,
              MTD_TYPE: formData.MTD_TYPE,
              MTD_COMPLAIN: formData.MTD_COMPLAIN,
              MTD_DIAGNOSTICS: formData.MTD_DIAGNOSTICS,
              MTD_REMARKS: formData.MTD_REMARKS,
              MTD_AMOUNT: formData.MTD_AMOUNT,
              MTD_UPDATED_BY: Name,
              MTD_TREATMENT_STATUS: formData.MTD_TREATMENT_STATUS,
            },
            Drugs: preparedPrescriptions.map((prescription) => ({
              MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
              MDD_QUANTITY: parseInt(prescription.MDD_QUANTITY) || 0,
              MDD_RATE: prescription.MMC_RATE || prescription.MDD_RATE,
              MDD_AMOUNT:
                (parseFloat(prescription.MDD_RATE) || 0) *
                (parseInt(prescription.MDD_QUANTITY) || 0) ||
                parseFloat(prescription.MMC_RATE) ||
                0,
              MDD_DOSAGE: "",
              MDD_TAKES: prescription.MDD_TAKES,
              MDD_GIVEN_QUANTITY: 0,
              MDD_STATUS: "",
            })),
          };

          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/Treatment/updatingtreatment/${patientId}/${serialNumber}`,
            updatePayload
          );

          if (response.status === 200) {
            setSnackbarMessage("Treatment updated successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            // Navigate back after a short delay to allow the snackbar to be seen
            setTimeout(() => {
              navigate(-1); // Go back one step in history
            }, 1500);
          } else {
            setSnackbarMessage("Failed to update treatment.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        } catch (error) {
          setSnackbarMessage(
            error.response?.data?.message || "Error updating treatment"
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } else {
        const treatmentResponse = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Treatment`,
          {
            ...formData,
            MTD_APPOINMENT_ID: formData.MTD_APPOINMENT_ID || null
          }
        );
        const serial_no = treatmentResponse.data.MTD_SERIAL_NO;

        if (
          preparedPrescriptions.length > 0 &&
          preparedPrescriptions.some(
            (prescription) => prescription.MDD_MATERIAL_CODE
          )
        ) {
          const drugDetailsPromises = preparedPrescriptions.map(
            (prescription) => {
              if (prescription.MDD_MATERIAL_CODE) {
                if (
                  !prescription.MDD_MATERIAL_CODE ||
                  !prescription.MDD_TAKES ||
                  !prescription.MDD_QUANTITY
                ) {
                  setSnackbarMessage("All drug details are required.");
                  setSnackbarSeverity("error");
                  setSnackbarOpen(true);
                  return;
                }

                return axios.post(
                  `${process.env.REACT_APP_API_BASE_URL}/Drug`,
                  {
                    MDD_MATERIAL_CODE: prescription.MDD_MATERIAL_CODE,
                    MDD_DOSAGE: prescription.MDD_DOSAGE,
                    MDD_TAKES: prescription.MDD_TAKES,
                    MDD_CREATED_BY: formData.MTD_CREATED_BY,
                    MDD_CREATED_DATE: new Date().toISOString(),
                    MDD_UPDATED_BY: "",
                    MDD_UPDATED_DATE: null,
                    MDD_PATIENT_CODE: patientId,
                    MDD_RATE: prescription.MMC_RATE || 0,
                    MDD_STATUS: "",
                    MDD_SERIAL_NO: serial_no,
                    MDD_QUANTITY: prescription.MDD_QUANTITY || 0,
                    MDD_AMOUNT:
                      prescription.MMC_RATE * (prescription.MDD_QUANTITY || 0),
                  }
                );
              }
              return null;
            }
          );

          await Promise.all(
            drugDetailsPromises.filter((promise) => promise !== null)
          );
        }

        navigate(`/dashboard/view-record/${patientId}/${serial_no}`);
      }
    } catch (error) {
      console.error(
        "Error submitting record:",
        error.response?.data || error.message
      );
      setSnackbarMessage("Error submitting treatment and prescription details.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl">
      {/* Snackbar for showing alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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

      <Box sx={{ my: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <StyledPaper elevation={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "center",
            }}
          >
            <MedicalServices color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography
              variant="h4"
              color="primary"
              fontWeight={600}
              gutterBottom
            >
              {isEditMode ? "Edit Treatment Details" : "Add Treatment Details"}
            </Typography>
          </Box>

          {channelnumber && (
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Chip
                label={`Channel Number: ${channelnumber}`}
                color="primary"
                variant="outlined"
                avatar={<Avatar>#</Avatar>}
              />
            </Box>
          )}

          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 2, textAlign: "center", mt: -2 }}
          >
            Fill in the treatment and prescription information below.
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* ... (rest of your form code remains the same) ... */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Patient Complaint
              </Typography>
              <TextField
                fullWidth
                id="MTD_COMPLAIN"
                value={formData.MTD_COMPLAIN}
                onChange={handleFormChange}
                placeholder="Enter patient complaint"
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Diagnosis
              </Typography>
              <TextField
                fullWidth
                id="MTD_DIAGNOSTICS"
                value={formData.MTD_DIAGNOSTICS}
                onChange={handleFormChange}
                placeholder="Enter patient diagnosis details"
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Healing sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }} />
                Prescriptions
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {prescriptions.map((prescription, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{ p: 2, mb: 2, position: "relative" }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "minmax(250px, 1fr) minmax(180px, 0.8fr) minmax(100px, 0.5fr) minmax(120px, 0.6fr) minmax(100px, 0.5fr)",
                      },
                      gap: 2,
                      alignItems: "flex-end",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <TextField
                        fullWidth
                        label="Search Medicine"
                        name="MDD_MATERIAL_NAME"
                        value={prescription.MDD_MATERIAL_NAME}
                        onChange={(event) => handleSearchChange(index, event)}
                        onFocus={() => setActivePrescriptionIndex(index)}
                        disabled={prescription.isFetched}
                        required={!isEditMode}
                        sx={{
                          minWidth: { xs: "100%", sm: 250 },
                          "& .MuiInputBase-root": { height: 56 },
                        }}
                      />
                      {activePrescriptionIndex === index &&
                        searchResults.length > 0 && (
                          <Paper
                            elevation={3}
                            sx={{
                              position: "absolute",
                              zIndex: 1,
                              width: { xs: "calc(100% - 32px)", sm: 250 },
                              maxHeight: 200,
                              overflow: "auto",
                              mt: 1,
                            }}
                          >
                            <List>
                              {searchResults.map((medicine) => (
                                <ListItem
                                  key={medicine.MMC_MATERIAL_CODE}
                                  button
                                  onClick={() =>
                                    handleSelectMedicine(
                                      index,
                                      medicine.MMC_MATERIAL_CODE,
                                      medicine.MMC_DESCRIPTION,
                                      medicine.MMC_RATE
                                    )
                                  }
                                >
                                  <ListItemText
                                    primary={medicine.MMC_DESCRIPTION}
                                    secondary={`Code: ${medicine.MMC_MATERIAL_CODE}`}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        )}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <FormControl fullWidth sx={{ minWidth: 180 }}>
                        <InputLabel>How to Take</InputLabel>
                        <Select
                          name="MDD_TAKES"
                          value={prescription.MDD_TAKES}
                          onChange={(event) =>
                            handlePrescriptionChange(index, event)
                          }
                          required={!isEditMode}
                          label="How to Take"
                          sx={{
                            "& .MuiSelect-select": {
                              height: "56px !important",
                              boxSizing: "border-box",
                            },
                          }}
                        >
                          <MenuItem value="not-define">
                            Select How to Take
                          </MenuItem>
                          <MenuItem value="Daily">Daily</MenuItem>
                          <MenuItem value="Twice a Day before food">
                            Twice a Day before food
                          </MenuItem>
                          <MenuItem value="Three times per day before food">
                            Three times per day before food
                          </MenuItem>
                          <MenuItem value="Twice a day after food">
                            Twice a day after food
                          </MenuItem>
                          <MenuItem value="Three times per day after food">
                            Three times per day after food
                          </MenuItem>
                          <MenuItem value="As Needed">As Needed</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>

                      {prescription.MDD_TAKES === "other" && (
                        <TextField
                          fullWidth
                          sx={{
                            mt: 2,
                            minWidth: 180,
                            "& .MuiInputBase-root": { height: 56 },
                          }}
                          name="MDD_TAKES_CUSTOM"
                          value={prescription.MDD_TAKES_CUSTOM}
                          onChange={(event) =>
                            handlePrescriptionChange(index, event)
                          }
                          placeholder="Specify how to take"
                        />
                      )}
                    </Box>

                    <Box>
                      <TextField
                        fullWidth
                        type="number"
                        name="MDD_QUANTITY"
                        label="Quantity"
                        value={prescription.MDD_QUANTITY}
                        onChange={(event) =>
                          handlePrescriptionChange(index, event)
                        }
                        required={!isEditMode}
                        inputProps={{ min: "1" }}
                        sx={{
                          minWidth: 100,
                          "& .MuiInputBase-root": { height: 56 },
                        }}
                      />
                    </Box>

                    <Box>
                      <Button
                        startIcon={<Delete />}
                        onClick={() => handleRemovePrescription(index)}
                        color="error"
                        variant="outlined"
                        fullWidth
                        sx={{
                          minWidth: 120,
                          height: 56,
                          "& .MuiButton-startIcon": { marginRight: "8px" },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>

                    {index === prescriptions.length - 1 && (
                      <Box>
                        <Button
                          startIcon={<Add />}
                          onClick={handleAddPrescription}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          sx={{
                            minWidth: 100,
                            height: 56,
                            "& .MuiButton-startIcon": { marginRight: "8px" },
                          }}
                        >
                          Add Medicine
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              ))}

              {prescriptions.length === 0 && (
                <Button
                  startIcon={<Add />}
                  onClick={handleAddPrescription}
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 1,
                    minWidth: 200,
                    height: 56,
                    "& .MuiButton-startIcon": { marginRight: "8px" },
                  }}
                >
                  Add Medicine
                </Button>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Doctor's Remarks
              </Typography>
              <TextField
                fullWidth
                id="MTD_REMARKS"
                value={formData.MTD_REMARKS}
                onChange={handleFormChange}
                placeholder="Enter doctor remarks for the patient"
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Treatment Status
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Treatment Status</InputLabel>
                <Select
                  name="MTD_TREATMENT_STATUS"
                  id="MTD_TREATMENT_STATUS"
                  value={formData.MTD_TREATMENT_STATUS}
                  onChange={handleFormChange}
                  required
                  label="Treatment Status"
                >
                  <MenuItem value="">Select Treatment Status</MenuItem>
                  <MenuItem value="C">Completed</MenuItem>
                  <MenuItem value="P">Preparation completed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Treatment Amount
              </Typography>
              <TextField
                fullWidth
                type="number"
                id="MTD_AMOUNT"
                name="MTD_AMOUNT"
                label="Amount"
                value={formData.MTD_AMOUNT}
                onChange={handleFormChange}
                placeholder="Enter treatment amount"
                required
                inputProps={{ min: "1" }}
                InputProps={{
                  startAdornment: (
                    <MonetizationOn color="action" sx={{ mr: 1, color: "primary.main" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!(role === "Admin" || role === "Doc") || loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Description />
                  )
                }
                sx={{ py: 1.5, px: 4, width: { xs: "100%", sm: 300 } }}
              >
                {isEditMode ? "Update Treatment" : "Submit Treatment"}
              </Button>
            </Box>
          </form>
        </StyledPaper>
      </Box>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>
          {modalContent.includes("Error") ? "Error" : "Success"}
        </DialogTitle>
        <DialogContent>
          <Typography>{modalContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddRecord;