// src/Pages/Users/account_opening_form/AccountOpeningForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../../images/logo.png";

// pdfmake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

function AccountOpeningForm() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({
    // Step 1 — Branch & Identity
    branch: "",
    accountType: "",
    surname: "",
    firstname: "",
    middlename: "",
    companyName: "",
    dob: "",
    nationality: "",
    rcNumber: "",

    // Step 2 — Addresses & Contact
    mailingAddress: "",
    addressAbroad: "",
    officeAddress: "",
    residentialAddress: "",
    phone: "",
    occupation: "",
    email: "",

    // Step 2 — Employment
    employer: "",
    employerAddress: "",
    position: "",
    lengthOfEmployment: "",
    initialDeposit: "",

    // Step 2 — Other Banks & Referees
    otherBankNameAddress: "",
    otherBankAccountNumber: "",
    referee1Name: "",
    referee1Bank: "",
    referee1Account: "",
    referee2Name: "",
    referee2Bank: "",
    referee2Account: "",

    // Step 3 — Other Account Holders
    name1: "",
    address1: "",
    telephone1: "",
    email1: "",
    membershipno1: "",
    signature1: null,
    
    name2: "",
    address2: "",
    telephone2: "",
    email2: "",
    membershipno2: "",
    signature2: null,
    
    name3: "",
    address3: "",
    telephone3: "",
    email3: "",
    membershipno3: "",
    signature3: null,
    
    name4: "",
    address4: "",
    telephone4: "",
    email4: "",
    membershipno4: "",
    signature4: null,
    
    fax: "",

    // Declaration & Signature
    customerSignature: null, // image file
    signatureDate: "",
  });

  const [pdfBlob, setPdfBlob] = useState(null);
  const [signatureUrls, setSignatureUrls] = useState({
    customerSignature: null,
    signature1: null,
    signature2: null,
    signature3: null,
    signature4: null
  });

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: file }));
        setSignatureUrls((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const resetForm = () => {
    setFormData({
      branch: "",
      accountType: "",
      surname: "",
      firstname: "",
      middlename: "",
      companyName: "",
      dob: "",
      nationality: "",
      rcNumber: "",
      mailingAddress: "",
      addressAbroad: "",
      officeAddress: "",
      residentialAddress: "",
      phone: "",
      occupation: "",
      email: "",
      employer: "",
      employerAddress: "",
      position: "",
      lengthOfEmployment: "",
      initialDeposit: "",
      otherBankNameAddress: "",
      otherBankAccountNumber: "",
      referee1Name: "",
      referee1Bank: "",
      referee1Account: "",
      referee2Name: "",
      referee2Bank: "",
      referee2Account: "",
      name1: "",
      address1: "",
      telephone1: "",
      email1: "",
      membershipno1: "",
      signature1: null,
      name2: "",
      address2: "",
      telephone2: "",
      email2: "",
      membershipno2: "",
      signature2: null,
      name3: "",
      address3: "",
      telephone3: "",
      email3: "",
      membershipno3: "",
      signature3: null,
      name4: "",
      address4: "",
      telephone4: "",
      email4: "",
      membershipno4: "",
      signature4: null,
      fax: "",
      customerSignature: null,
      signatureDate: "",
    });
    setSignatureUrls({
      customerSignature: null,
      signature1: null,
      signature2: null,
      signature3: null,
      signature4: null
    });
    setStep(1);
    setPdfBlob(null);
    setUploadStatus(null);
    setHasDownloaded(false);
  };

  const styles = {
    page: {
      maxWidth: "980px",
      margin: "0 auto",
      padding: "16px",
      boxSizing: "border-box",
    },
    headerWrap: {
      background: "rgb(21,138,60)",
      color: "#fff",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      marginBottom: "20px",
    },
    headerTitle: {
      margin: 0,
      fontSize: "clamp(16px, 4vw, 20px)",
      fontWeight: 800,
      letterSpacing: ".3px",
    },
    stepBar: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "16px",
    },
    stepPill: (active) => ({
      flex: "1 1 120px",
      textAlign: "center",
      padding: "10px 8px",
      borderRadius: "999px",
      background: active ? "rgba(21,138,60,0.15)" : "#f1f5f9",
      color: active ? "rgb(21,138,60)" : "#334155",
      fontWeight: 700,
      fontSize: "12px",
      border: `1px solid ${active ? "rgba(21,138,60,0.35)" : "#e2e8f0"}`,
      minWidth: "0",
    }),
    card: {
      background: "#fff",
      borderRadius: "14px",
      padding: "16px",
      boxShadow: "0 8px 30px rgba(2,12,27,0.06)",
      border: "1px solid #eaeef3",
      position: "relative",
      overflow: "hidden",
    },
    sectionTitle: {
      margin: "8px 0 14px",
      color: "#0f172a",
      fontWeight: 800,
      fontSize: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: "12px",
    },
    col: (span = 12) => ({
      gridColumn: `span ${span}`,
    }),
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 800,
      color: "#0f172a",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "11px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      fontSize: "14px",
      outline: "none",
      transition: "box-shadow .15s, border-color .15s",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      minHeight: "84px",
      padding: "11px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
    },
    btnRow: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: "14px",
      gap: "8px",
    },
    btnPrimary: {
      background: "rgb(21,138,60)",
      color: "#fff",
      padding: "12px 18px",
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 800,
      letterSpacing: ".2px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexShrink: 0,
    },
    btnGhost: {
      background: "transparent",
      color: "rgb(21,138,60)",
      padding: "12px 18px",
      border: "2px solid rgb(21,138,60)",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 800,
      letterSpacing: ".2px",
      flexShrink: 0,
    },
    divider: { height: 1, background: "#e6eef5", margin: "12px 0" },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "14px",
      zIndex: 10,
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #f3f3f3",
      borderTop: "4px solid rgb(21,138,60)",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    successMessage: {
      background: "rgba(21,138,60,0.1)",
      border: "1px solid rgb(21,138,60)",
      borderRadius: "10px",
      padding: "16px",
      marginTop: "16px",
      textAlign: "center",
    },
    successIcon: {
      fontSize: "24px",
      color: "rgb(21,138,60)",
      marginBottom: "8px",
    },
    uploadStatus: {
      padding: "12px",
      borderRadius: "8px",
      marginTop: "12px",
      textAlign: "center",
      fontWeight: "bold",
    },
    successStatus: {
      background: "rgba(21,138,60,0.1)",
      color: "rgb(21,138,60)",
      border: "1px solid rgb(21,138,60)",
    },
    errorStatus: {
      background: "rgba(239,68,68,0.1)",
      color: "rgb(239,68,68)",
      border: "1px solid rgb(239,68,68)",
    },
  };

  // Adjust grid columns for mobile
  const getColSpan = (span) => {
    return isMobile ? 12 : span;
  };

  const download = async () => {
    setIsGenerating(true);

    // Convert logo to base64 for pdfmake
    const getLogoBase64 = async () => {
      try {
        const response = await fetch(Logo);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error loading logo:", error);
        return null;
      }
    };

    const logoData = await getLogoBase64();

    // Add a small delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create account holders table with better formatting
    const accountHoldersData = [];
    
    // Header row
    accountHoldersData.push([
      { text: 'HOLDER 1', style: 'tableHeader', alignment: 'center' },
      { text: 'HOLDER 2', style: 'tableHeader', alignment: 'center' },
      { text: 'HOLDER 3', style: 'tableHeader', alignment: 'center' },
      { text: 'HOLDER 4', style: 'tableHeader', alignment: 'center' }
    ]);
    
    // Name row
    accountHoldersData.push([
      { text: formData.name1 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.name2 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.name3 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.name4 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] }
    ]);
    
    // Address row
    accountHoldersData.push([
      { text: formData.address1 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.address2 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.address3 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.address4 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] }
    ]);
    
    // Telephone row
    accountHoldersData.push([
      { text: formData.telephone1 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.telephone2 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.telephone3 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.telephone4 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] }
    ]);
    
    // Email row
    accountHoldersData.push([
      { text: formData.email1 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.email2 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.email3 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] },
      { text: formData.email4 || 'Not provided', fontSize: 8, margin: [0, 2, 0, 2] }
    ]);
    
    // Membership row
    accountHoldersData.push([
      { text: formData.membershipno1 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.membershipno2 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.membershipno3 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: formData.membershipno4 || 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] }
    ]);
    
    // Signature row
    accountHoldersData.push([
      signatureUrls.signature1 ? { image: signatureUrls.signature1, width: 60, height: 30, alignment: 'center', margin: [0, 2, 0, 2] } : { text: 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      signatureUrls.signature2 ? { image: signatureUrls.signature2, width: 60, height: 30, alignment: 'center', margin: [0, 2, 0, 2] } : { text: 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      signatureUrls.signature3 ? { image: signatureUrls.signature3, width: 60, height: 30, alignment: 'center', margin: [0, 2, 0, 2] } : { text: 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] },
      signatureUrls.signature4 ? { image: signatureUrls.signature4, width: 60, height: 30, alignment: 'center', margin: [0, 2, 0, 2] } : { text: 'Not provided', fontSize: 9, margin: [0, 2, 0, 2] }
    ]);

    const accountHoldersTable = {
      table: {
        widths: ['*', '*', '*', '*'],
        body: accountHoldersData
      },
      layout: {
        hLineWidth: function(i, node) {
          return (i === 0 || i === node.table.body.length) ? 1 : 0.5;
        },
        vLineWidth: function(i, node) {
          return 0.5;
        },
        hLineColor: function(i, node) {
          return '#aaaaaa';
        },
        vLineColor: function(i, node) {
          return '#aaaaaa';
        },
        paddingLeft: function(i, node) {
          return 4;
        },
        paddingRight: function(i, node) {
          return 4;
        },
        paddingTop: function(i, node) {
          return 2;
        },
        paddingBottom: function(i, node) {
          return 2;
        }
      },
      margin: [0, 0, 0, 10]
    };

    const docDefinition = {
      content: [
        // Logo and Header
        {
          columns: [
            logoData
              ? {
                  image: logoData,
                  width: 100,
                  height: 40,
                  margin: [0, 0, 0, 10],
                }
              : { text: "" },
            {
              text: "APPLICATION FOR OPENING PERSONAL/JOINT, CORPORATE, CLUB/ASS. ACCOUNT",
              style: "header",
              alignment: "center",
              width: "*",
            },
          ],
        },
        { text: "\n" },

        // Branch & Account
        { text: "Branch & Account", style: "subheader" },
        { text: `Branch: ${formData.branch || "Not provided"}` },
        { text: `Type of Account: ${formData.accountType || "Not provided"}` },
        { text: "\n" },

        // Identity
        { text: "Identity", style: "subheader" },
        { text: `Surname: ${formData.surname || "Not provided"}` },
        { text: `First Name: ${formData.firstname || "Not provided"}` },
        { text: `Middle Name: ${formData.middlename || "Not provided"}` },
        { text: `Company Name: ${formData.companyName || "Not provided"}` },
        {
          text: `Date of Birth/Registration: ${formData.dob || "Not provided"}`,
        },
        { text: `Nationality: ${formData.nationality || "Not provided"}` },
        { text: `RC Number: ${formData.rcNumber || "Not provided"}` },
        {
          text: `Mailing Address: ${formData.mailingAddress || "Not provided"}`,
        },
        { text: `Address Abroad: ${formData.addressAbroad || "Not provided"}` },
        { text: `Office Address: ${formData.officeAddress || "Not provided"}` },
        {
          text: `Residential Address: ${
            formData.residentialAddress || "Not provided"
          }`,
        },
        { text: `Phone: ${formData.phone || "Not provided"}` },
        {
          text: `Occupation/Business Type: ${
            formData.occupation || "Not provided"
          }`,
        },
        { text: `E-mail: ${formData.email || "Not provided"}` },
        { text: "\n" },

        // Employment
        { text: "Employment", style: "subheader" },
        { text: `Current Employer: ${formData.employer || "Not provided"}` },
        {
          text: `Employers Address: ${
            formData.employerAddress || "Not provided"
          }`,
        },
        { text: `Position: ${formData.position || "Not provided"}` },
        {
          text: `Length of Employment: ${
            formData.lengthOfEmployment || "Not provided"
          }`,
        },
        {
          text: `Desired Initial Deposit: ${
            formData.initialDeposit || "Not provided"
          }`,
        },
        { text: "\n" },

        // Other Banks & Referees
        { text: "Other Banks & Referees", style: "subheader" },
        {
          text: `Name of Bank and Address: ${
            formData.otherBankNameAddress || "Not provided"
          }`,
        },
        {
          text: `Other Bank Account Number: ${
            formData.otherBankAccountNumber || "Not provided"
          }`,
        },
        { text: `Referee 1 Name: ${formData.referee1Name || "Not provided"}` },
        { text: `Referee 1 Bank: ${formData.referee1Bank || "Not provided"}` },
        {
          text: `Referee 1 Account: ${
            formData.referee1Account || "Not provided"
          }`,
        },
        { text: `Referee 2 Name: ${formData.referee2Name || "Not provided"}` },
        { text: `Referee 2 Bank: ${formData.referee2Bank || "Not provided"}` },
        {
          text: `Referee 2 Account: ${
            formData.referee2Account || "Not provided"
          }`,
        },
        { text: "\n" },

        // Other Account Holders
        { text: "Other Account Holders", style: "subheader" },
        accountHoldersTable,
        { text: `Fax: ${formData.fax || "Not provided"}` },
        { text: "\n" },

        // Customer's Signature & Date
        { text: "Customer's Signature & Date", style: "subheader" },
        signatureUrls.customerSignature
          ? {
              image: signatureUrls.customerSignature,
              width: 120,
              height: 60,
              margin: [0, 0, 0, 10],
            }
          : { text: "Not Provided" },
        { text: `Date: ${formData.signatureDate || "Not provided"}` },
        { text: "\n" },

        // Declaration
        {
          text: "I/We request the opening of an account and confirm that the above are true, I/We agree to the Terms and Conditions on the reverse of this application.",
          italics: true,
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          color: "rgb(21,138,60)",
          margin: [0, 10, 0, 15],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: "rgb(21,138,60)",
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black'
        }
      },
      pageMargins: [20, 20, 20, 20],
      defaultStyle: {
        fontSize: 10,
        lineHeight: 1.2,
      },
    };

    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      setPdfBlob(blob);
      setHasDownloaded(true);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AccountOpeningForm.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setIsGenerating(false);
    });
  };
  
  const uploadPDF = async () => {
    if (!pdfBlob) {
      alert("Please generate the PDF first.");
      return;
    }

    if (!hasDownloaded) {
      alert(
        "You must download the PDF before sending. Please click the Download button first."
      );
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    const file = new File([pdfBlob], "AccountOpeningForm.pdf", {
      type: "application/pdf",
    });
    const formDataToSend = new FormData();
    formDataToSend.append("pdf_file", file);

    try {
      await axios.post(
        "https://townserve.itl.ng/api/auth/upload",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus("success");

      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Add CSS animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          input::placeholder {
            color: #94a3b8;
            font-style: italic;
            font-size: 12px;
          }
          
          textarea::placeholder {
            color: #94a3b8;
            font-style: italic;
            font-size: 12px;
          }
          
          .mobile-scroll-container {
            overflow-x: auto;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }
          
          .account-holders-table {
            min-width: ${isMobile ? "700px" : "100%"};
          }
          
          .account-holders-table th,
          .account-holders-table td {
            padding: 6px;
            text-align: center;
            font-size: 12px;
          }
          
          .account-holders-table th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          
          .account-holders-table input {
            width: 95%;
            padding: 4px;
            font-size: 12px;
            box-sizing: border-box;
          }
          
          @media (max-width: 768px) {
            .col-mobile-12 {
              grid-column: span 12 !important;
            }
            
            .btn-row-mobile {
              flex-direction: column;
              align-items: stretch;
            }
            
            .btn-mobile {
              width: 100%;
              margin-bottom: 8px;
            }
            
            .logo-container {
              margin-left: 0 !important;
              display: flex;
              justify-content: center;
            }
            
            .logo-image {
              width: 280px !important;
              height: 90px !important;
            }
            
            .title-container {
              flex-direction: column;
              gap: 20px !important;
            }
            
            .main-title {
              font-size: 1rem !important;
              margin-top: 10px !important;
              margin-bottom: 20px !important;
            }
          }
        `}
      </style>

      {/* HEADER */}
      <div className="logo-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={Logo}
          alt="Logo"
          className="logo-image"
          style={{
            width: "400px",
            height: "120px",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        className="title-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
          marginTop: "30px",
          flexDirection: isMobile ? "column" : "row"
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            className="main-title"
            style={{
              margin: 0,
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              background: "none",
              marginTop: "20px",
              marginBottom: "30px",
              color: "rgb(21, 138, 60)",
            }}
          >
            APPLICATION FOR OPENING PERSONAL/JOINT, CORPORATE, CLUB/ASS. ACCOUNT
          </h1>
        </div>
      </div>

      {/* STEP BAR */}
      <div style={styles.stepBar}>
        <div style={styles.stepPill(step === 1)}>1. Branch & Identity</div>
        <div style={styles.stepPill(step === 2)}>2. Contact & Employment</div>
        <div style={styles.stepPill(step === 3)}>3. Others & Declaration</div>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        {/* Loading overlay for PDF generation */}
        {isGenerating && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner}></div>
            <p
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Generating PDF...
            </p>
          </div>
        )}
        {/* Loading overlay for upload */}
        {isUploading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner}></div>
            <p
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Uploading PDF...
            </p>
          </div>
        )}
        {/* Upload status message */}
        {uploadStatus === "success" && (
          <div style={{ ...styles.uploadStatus, ...styles.successStatus }}>
            <div style={styles.successIcon}>✓</div>
            <div>Upload Successful!</div>
          </div>
        )}
        {uploadStatus === "error" && (
          <div style={{ ...styles.uploadStatus, ...styles.errorStatus }}>
            <div>Upload Failed. Please try again.</div>
          </div>
        )}
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>BRANCH</label>
                <input
                  style={styles.input}
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter branch location (e.g., Main Branch, Ikeja)"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>TYPE OF ACCOUNT</label>
                <input
                  style={styles.input}
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  placeholder="e.g., Savings, Current, Corporate, Joint"
                />
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>SURNAME</label>
                <input
                  style={styles.input}
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter your surname/family name"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>FIRST NAME</label>
                <input
                  style={styles.input}
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter your first/given name"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>MIDDLE NAME</label>
                <input
                  style={styles.input}
                  name="middlename"
                  value={formData.middlename}
                  onChange={handleChange}
                  placeholder="Enter middle name (if applicable)"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>COMPANY NAME</label>
                <input
                  style={styles.input}
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="For corporate accounts only - enter registered company name"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>DATE OF BIRTH/REGISTRATION</label>
                <input
                  style={styles.input}
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(3)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>NATIONALITY</label>
                <input
                  style={styles.input}
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="e.g., Nigerian, American"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(3)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>RC NUMBER</label>
                <input
                  style={styles.input}
                  name="rcNumber"
                  value={formData.rcNumber}
                  onChange={handleChange}
                  placeholder="For corporate accounts - enter CAC registration number"
                />
              </div>
            </div>

            <div
              style={{
                ...styles.btnRow,
                flexDirection: isMobile ? "column" : "row",
              }}
              className="btn-row-mobile"
            >
              <span />
              <button
                onClick={nextStep}
                style={{
                  ...styles.btnPrimary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: isMobile ? "100%" : "auto",
                }}
                className="btn-mobile"
              >
                Next
              </button>
            </div>
          </>
        )}
        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div style={styles.sectionTitle}>Addresses & Contact</div>
            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>MAILING ADDRESS</label>
                <input
                  style={styles.input}
                  name="mailingAddress"
                  value={formData.mailingAddress}
                  onChange={handleChange}
                  placeholder="Address where correspondence should be sent"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>
                  ADDRESS ABROAD (With Box No. If any)
                </label>
                <input
                  style={styles.input}
                  name="addressAbroad"
                  value={formData.addressAbroad}
                  onChange={handleChange}
                  placeholder="Foreign address if applicable"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>OFFICE ADDRESS</label>
                <input
                  style={styles.input}
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleChange}
                  placeholder="Business or workplace address"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>RESIDENTIAL ADDRESS</label>
                <input
                  style={styles.input}
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  placeholder="Your home address"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>PHONE</label>
                <input
                  style={styles.input}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Primary phone number"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>OCCUPATION/BUSINESS TYPE</label>
                <input
                  style={styles.input}
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g., Engineer, Business Owner, Teacher"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>E-MAIL</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.sectionTitle}>Employment</div>
            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>CURRENT EMPLOYER</label>
                <input
                  style={styles.input}
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  placeholder="Name of your employer or business"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(6)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>EMPLOYERS ADDRESS</label>
                <input
                  style={styles.input}
                  name="employerAddress"
                  value={formData.employerAddress}
                  onChange={handleChange}
                  placeholder="Address of your employer"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>POSITION</label>
                <input
                  style={styles.input}
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Your job title or position"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>LENGTH OF EMPLOYMENT</label>
                <input
                  style={styles.input}
                  name="lengthOfEmployment"
                  value={formData.lengthOfEmployment}
                  onChange={handleChange}
                  placeholder="e.g., 2 years, 6 months"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>DESIRED INITIAL DEPOSIT</label>
                <input
                  style={styles.input}
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={handleChange}
                  placeholder="Amount you wish to deposit initially"
                />
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.sectionTitle}>
              Accounts With Other Banks (Including TMFB LTD, Branch)
            </div>
            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(8)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>Name of Bank and Address</label>
                <input
                  style={styles.input}
                  name="otherBankNameAddress"
                  value={formData.otherBankNameAddress}
                  onChange={handleChange}
                  placeholder="Bank name and branch address"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>Account Number</label>
                <input
                  style={styles.input}
                  name="otherBankAccountNumber"
                  value={formData.otherBankAccountNumber}
                  onChange={handleChange}
                  placeholder="Your account number at that bank"
                />
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.sectionTitle}>Referees</div>
            <div style={styles.grid}>
              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>REFEREE'S NAME</label>
                <input
                  style={styles.input}
                  name="referee1Name"
                  value={formData.referee1Name}
                  onChange={handleChange}
                  placeholder="Full name of your first referee"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(8)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>BANK</label>
                <input
                  style={styles.input}
                  name="referee1Bank"
                  value={formData.referee1Bank}
                  onChange={handleChange}
                  placeholder="Referee's bank name"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>A/C NO.</label>
                <input
                  style={styles.input}
                  name="referee1Account"
                  value={formData.referee1Account}
                  onChange={handleChange}
                  placeholder="Referee's account number"
                />
              </div>

              <div
                style={{
                  ...styles.col(getColSpan(12)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>REFEREE'S NAME</label>
                <input
                  style={styles.input}
                  name="referee2Name"
                  value={formData.referee2Name}
                  onChange={handleChange}
                  placeholder="Full name of your second referee"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(8)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>BANK</label>
                <input
                  style={styles.input}
                  name="referee2Bank"
                  value={formData.referee2Bank}
                  onChange={handleChange}
                  placeholder="Referee's bank name"
                />
              </div>
              <div
                style={{
                  ...styles.col(getColSpan(4)),
                }}
                className="col-mobile-12"
              >
                <label style={styles.label}>A/C NO.</label>
                <input
                  style={styles.input}
                  name="referee2Account"
                  value={formData.referee2Account}
                  onChange={handleChange}
                  placeholder="Referee's account number"
                />
              </div>
            </div>

            <div
              style={{
                ...styles.btnRow,
                flexDirection: isMobile ? "column" : "row",
              }}
              className="btn-row-mobile"
            >
              <button
                onClick={prevStep}
                style={{
                  ...styles.btnGhost,
                  width: isMobile ? "100%" : "auto",
                }}
                className="btn-mobile"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                style={{
                  ...styles.btnPrimary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: isMobile ? "100%" : "auto",
                }}
                className="btn-mobile"
              >
                Next
              </button>
            </div>
          </>
        )}
        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              Other Account Holders
            </div>

            <div className="mobile-scroll-container">
              <table
                className="account-holders-table"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "16px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        width: isMobile ? "100px" : "auto",
                        minWidth: "100px"
                      }}
                    ></th>
                    {[1, 2, 3, 4].map((i) => (
                      <th
                        key={i}
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "#f0f0f0",
                          textAlign: "center",
                          minWidth: isMobile ? "120px" : "auto"
                        }}
                      >
                        Holder {i}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "NAME", field: "name", type: "text", placeholder: "Full name" },
                    { label: "ADDRESS", field: "address", type: "text", placeholder: "Complete address" },
                    { label: "TELEPHONE", field: "telephone", type: "text", placeholder: "Phone number" },
                    { label: "EMAIL", field: "email", type: "email", placeholder: "Email address" },
                    { label: "MEMBERSHIP NO", field: "membershipno", type: "text", placeholder: "Membership number" },
                    { label: "SIGNATURE", field: "signature", type: "file", accept: "image/*" },
                  ].map((field, idx) => (
                    <tr key={idx}>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          backgroundColor: "#fafafa",
                          width: isMobile ? "100px" : "auto",
                          minWidth: "100px"
                        }}
                      >
                        {field.label}
                      </td>
                      {[1, 2, 3, 4].map((i) => {
                        const fieldName = `${field.field}${i}`;
                        return (
                          <td
                            key={i}
                            style={{
                              border: "1px solid #ccc",
                              textAlign: "center",
                            }}
                          >
                            {field.type === "file" ? (
                              <input
                                style={{
                                  width: "95%",
                                  padding: "4px",
                                  boxSizing: "border-box",
                                }}
                                type="file"
                                accept={field.accept}
                                name={fieldName}
                                onChange={handleChange}
                              />
                            ) : (
                              <input
                                style={{
                                  width: "95%",
                                  padding: "4px",
                                  boxSizing: "border-box",
                                }}
                                type={field.type}
                                name={fieldName}
                                value={formData[fieldName] || ""}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Single Fax row below */}
                  <tr>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        fontWeight: "bold",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      FAX
                    </td>
                    <td
                      colSpan={4}
                      style={{
                        border: "1px solid #ccc",
                        textAlign: "center",
                      }}
                    >
                      <input
                        style={{
                          width: "95%",
                          padding: "4px",
                          boxSizing: "border-box",
                        }}
                        name="fax"
                        value={formData.fax || ""}
                        onChange={handleChange}
                        placeholder="Fax number (if applicable)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "#ddd",
                margin: "16px 0",
              }}
            ></div>

            {/* Customer Signature & Declaration */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              Customer Signature & Declaration
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  SIGNATURE
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "6px",
                    boxSizing: "border-box",
                  }}
                  type="file"
                  accept="image/*"
                  name="customerSignature"
                  onChange={handleChange}
                />
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                  Upload an image of your signature
                </div>
              </div>
              <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  DATE
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "6px",
                    boxSizing: "border-box",
                  }}
                  type="date"
                  name="signatureDate"
                  value={formData.signatureDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <button
                onClick={prevStep}
                style={{
                  padding: "10px 16px",
                  border: "1px solid #007bff",
                  backgroundColor: "#fff",
                  color: "#007bff",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Back
              </button>
              <button
                onClick={download}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Download PDF
              </button>
              <button
                onClick={uploadPDF}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Upload PDF
              </button>
            </div>
          </>
        )}
      </div>
      <h2 style={{ textAlign: "center", marginTop: "24px", color: "red" }}>
        <b>Note:</b> You must download and have a copy before you can send.
      </h2>
    </div>
  );
}

export default AccountOpeningForm;