import './Forms.css';
import React, { useState } from 'react'; // Add this line
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TextField from "@mui/material/TextField";
import logo from './assets/CrediLinqLogo.png';
import { Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Forms() {

  const [enableApplicantSection, setEnableApplicantSection] = useState(false);

  const [enableDocumentSection, setEnableDocumentSection] = useState(false);

  const [enableTermsAndCondition, setEnableTermsAndCondition] = useState(false);

  const [alertReenterEmail, setAlertReenterEmail] = useState(false);

  const [emailMatch, setEmailMatch] = useState(true);

  const [mobileMatch, setMobileMatch] = useState(true);

  const [companyUENMatch, setCompanyUENMatch] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);


  const [formData, setFormData] = useState({
    companyUEN: '',
    companyName: '',
    fullName: '',
    positionWithCompany: '',
    emailAddress: '',
    reenterEmailAddress: '',
    mobileNumber: '',
    fileUpload: [],
    checked: null
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    if (e && e.target && e.target.name) {

      const { name, value } = e.target;


      if (name === 'companyUEN' || name === 'companyName') {
        const companyUENValue = name === 'companyUEN' ? value : formData.companyUEN;
        const companyNameValue = name === 'companyName' ? value : formData.companyName;

        if (companyUENValue !== '' && companyNameValue !== '') {
          setEnableApplicantSection(true);
        }
        else {
          setEnableApplicantSection(false)
        }
      }

      if (name === 'fullName' || name === 'positionWithCompany' || name === 'emailAddress' || name === 'reenterEmailAddress') {
        const fullName = name === 'fullName' ? value : formData.fullName;
        const positionWithCompany = name === 'positionWithCompany' ? value : formData.positionWithCompany;
        const emailAddress = name === 'emailAddress' ? value : formData.emailAddress;
        const reenterEmailAddress = name === 'reenterEmailAddress' ? value : formData.reenterEmailAddress;

        if (fullName && positionWithCompany && emailAddress && reenterEmailAddress) {
          setEnableDocumentSection(true)
        }
        else {
          setEnableDocumentSection(false);
        }
      }

      if (name === 'companyUEN') {
        const uenRegex = /^[0-9]{8,9}[A-Za-z]$/;
        if (uenRegex.test(value)) {
          setCompanyUENMatch(true);
        }
        else {
          setCompanyUENMatch(false);
        }
      }

      if (name === 'emailAddress') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          setEmailMatch(true);
          setAlertReenterEmail(true);
        }
        else {
          setEmailMatch(false);
          setAlertReenterEmail(false);
        }
      }

      if (name === 'reenterEmailAddress') {
        if (value !== formData?.emailAddress) {
          setAlertReenterEmail(true);
        }
        else {
          setAlertReenterEmail(false);
        }
      }

      if (name === 'fileUpload') {

        const files = Array.from(e.target.files);
        console.log(name, value, files)
        console.log(formData)
        if (files.length !== 0) {
          setEnableTermsAndCondition(true);
        }
        else {
          setEnableTermsAndCondition(false);
        }

        if (files.length > 6) {
          alert('Cannot add more than 6 files')
        }
        else {
          setSelectedFiles(files.slice(0, 6));
        }
      }

      if (name === 'checked') {
        if (isCheckboxChecked == true) {
          setIsCheckboxChecked(false);

        } else {
          setIsCheckboxChecked(true);
        }
      }


      setFormData({
        ...formData,
        [name]: value
      });

    }
  };

  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substring(0, maxLength) + '...';
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Handle response here if needed
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }

    navigate('/displayData');
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((file, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    setFormData({
      ...formData,
      fileUpload: updatedFiles
    });
  };


  return (
    <div className='bg-light'>
      <div className='bg-light'>
        <div className='header'>
          <img className='w-100 bg-image' src='https://smehealthcheck.credilinq.ai/static/images/header-bg.jpg' alt='bg-image' />

          <div className=''>
            <div className='position-absolute'>
              <div className='d-flex justify-content-between align-items-center'>
                <img className='w-14 img img-fluid' src={logo} alt='logo' />
                <h3 className='text-white'>SME HealthCheck - Get Started</h3>
              </div>

            </div>
          </div>
        </div>

        <div className='container p-3 bg-white'>
          <div className="Forms row">
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <div className='d-flex justify-content-start align-items-center mb-3 mt-5'>
                  <div className='me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={enableApplicantSection ? 'text-success' : 'bi bi-1-circle-fill text-danger'} viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
                    </svg>
                  </div>

                  <div className='bg-purple px-2 py-1 rounded-1 w-100'>
                    <p className='text-white fs-4 mb-1'>Company Information</p>
                  </div>
                </div>

                <div className='row align-items-center mb-3 ms-4'>
                  <div className='col-6 d-flex justify-content-between align-items-start flex-column'>
                    <TextField className='w-100'
                      name="companyUEN"
                      label="Company UEN"
                      variant="outlined"
                      value={formData.companyUEN}
                      onChange={handleInputChange}
                      required
                      inputProps={{
                        pattern: "^[0-9]{8,9}[A-Za-z]$"
                      }}
                    />

                    {!companyUENMatch && (
                      <span className='text-danger'>Invalid company UEN</span>
                    )}

                  </div>

                  <div className='col-6'>
                    <TextField className='w-100'
                      name="companyName"
                      label="Company Name"
                      variant="outlined"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      minRows={2}
                      required
                    />

                  </div>
                </div>
              </div>

              <div className='mb-4'>
                <div className='d-flex justify-content-start align-items-center mb-3'>
                  <div className='me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={enableDocumentSection ? 'text-success' : 'bi bi-2-circle-fill text-danger'} viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                    </svg>
                  </div>

                  <div className='bg-purple px-2 py-1 rounded-1 w-100'>
                    <p className='text-white fs-4 mb-1'>Applicant Information</p>
                  </div>
                </div>

                <div className='row align-items-center mb-3 ms-4'>
                  <div className='row mb-3 p-0 mx-0'>
                    <div className='col-6'>
                      <TextField className='w-100'
                        name="fullName"
                        label="Full Name"
                        placeholder='Full Name'
                        variant="outlined"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={!enableApplicantSection}
                      />
                    </div>

                    <div className='col-6'>
                      <TextField className='w-100'
                        name="positionWithCompany"
                        label="Position within company"
                        placeholder='Position within company'
                        variant="outlined"
                        value={formData.positionWithCompany}
                        onChange={handleInputChange}
                        required
                        disabled={!enableApplicantSection}
                      />
                    </div>
                  </div>

                  <div className='row mb-3 p-0 mx-0'>
                    <div className='col-6'>

                      <TextField className='w-100'
                        name="emailAddress"
                        label="Email Address"
                        placeholder='Email Address'
                        variant="outlined"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                        disabled={!enableApplicantSection}
                      />
                      {!emailMatch && (
                        <span className='text-danger'>Email is invalid</span>
                      )}
                    </div>

                    <div className='col-6'>
                      <TextField className='w-100'
                        name="reenterEmailAddress"
                        label="Re-enter Email Address"
                        placeholder='Re-enter Email Address'
                        variant="outlined"
                        value={formData.reenterEmailAddress}
                        onChange={handleInputChange}
                        required
                        disabled={!enableApplicantSection}
                      />

                      {alertReenterEmail && (
                        <span className='text-danger'>Email does not match</span>
                      )}

                    </div>
                  </div>

                  <div className='row phone-custom'>
                    <div className='col-6 ms-2 mx-0 px-2 py-3'>
                      <PhoneInput className="mobile-match" isValid={(value, country) => {
                        const mobileRegex = /^(\+?65)?[89]\d{7}$/;
                        if (mobileRegex.test(value)) {
                          return 'Mobile number'
                        }
                        else {
                          return 'Mobile number'
                        }

                      }} placeholder='Mobile number' label='Mobile number' name='mobileNumber' country={"sg"} required={true} disabled={!enableApplicantSection} value={formData.mobileNumber} onChange={handleInputChange} />

                      {!mobileMatch && (
                        <span className='text-danger'>Enter valid mobile number</span>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              <div className='mb-4'>
                <div className='d-flex justify-content-start align-items-center mb-3'>
                  <div className='me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class={enableTermsAndCondition ? 'text-success' : 'bi bi-3-circle-fill text-danger'} viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                    </svg>
                  </div>

                  <div className='bg-purple px-2 py-1 rounded-1 w-100'>
                    <p className='text-white fs-4 mb-1'>Upload Documents</p>
                  </div>
                </div>

                <div className='row align-items-center mb-3 ms-4'>
                  <div className='row mb-3'>
                    <div className='col-6 border border-1 rounded-1 w-50 h-100 p-5 bg-light'>

                      <div className='text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                        </svg>
                      </div>


                      <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        name='fileUpload'
                        disabled={!(enableDocumentSection && enableApplicantSection)}
                        onChange={handleInputChange}
                      />

                      <label htmlFor="raised-button-file">

                        <Button variant="raised" component="span" className='text-nowrap'>
                          Click to upload or drag and drop Bank Statements
                        </Button>
                      </label>

                      {selectedFiles.length > 0 && (
                        <div className='row row-cols-1 g-3 me-3 align-items-center' style={{ marginTop: '10px', color: 'green' }}>

                          {selectedFiles.map((file, index) => (

                            <p className='px-3 py-1 border border-1 rounded-5 w-25 me-2 text-nowrap' key={index}>{truncateFileName(file.name, 5)}<span className='cursor-pointer' onClick={() => handleRemoveFile(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg></span></p>

                            // <li key={index}>{file.name}</li>
                          ))}

                        </div>
                      )}
                    </div>

                    <div className='col-6 fileUploadText'>

                      <div className='d-flex justify-content-start align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check2 me-3" viewBox="0 0 16 16">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>

                        <p>PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.
                          <br />Example: If today is 26 Apr 24, then please upload bank statements from Oct 23 to Mar 24 (both months inclusive)</p>

                      </div>

                      <div className='d-flex justify-content-start align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check2 me-3" viewBox="0 0 16 16">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>

                        <p>If your company is multi-banked, then please upload 6 months bank statements for each bank account</p>

                      </div>

                      <div className='d-flex justify-content-start align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check2 me-3" viewBox="0 0 16 16">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>

                        <p>If your file is password protected, we request you to remove the password and upload the file to avoid submission failure</p>
                      </div>

                      <div className='d-flex justify-content-start align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check2 me-3" viewBox="0 0 16 16">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>

                        <p>In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className='mb-4'>
                <div className='d-flex justify-content-start align-items-center mb-3'>
                  <div className='me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={!isCheckboxChecked ? 'text-success' : 'bi bi-4-circle-fill text-danger'} viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176zM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218" />
                    </svg>
                  </div>

                  <div className='bg-purple px-2 py-1 rounded-1 w-100'>
                    <p className='text-white fs-4 mb-1'>Terms & Conditions</p>
                  </div>
                </div>

                <div className={!(enableTermsAndCondition && enableApplicantSection && enableDocumentSection) ? 'text-grey-custom' : 'row align-items-center mb-3 ms-4'}>
                  <div className='d-flex justify-content-start align-items-center'>
                    <input className="form-check-input me-2" type="checkbox" name='checked' disabled={!(enableTermsAndCondition && enableApplicantSection && enableDocumentSection)} value={formData.checked} onChange={handleInputChange} id="flexCheckDefault" />
                    <div>
                      <p className='mt-3'>By ticking, you are confirming that you have understood and are agreeing to the details mentioned:</p>
                    </div>
                  </div>

                  <div className='ms-5'>
                    <div className='d-flex justify-content-start align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2 me-2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                      <p className='mt-2'>I confirm that I am the authorized person to upload bank statements on behalf of my company</p>
                    </div>

                    <div className='d-flex justify-content-start align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check2 me-2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                      <p className='mt-2'>I assure you that uploaded bank statements and provided company information match and are of the same company, <br />if there is a mismatch then my report will not be generated</p>
                    </div>

                    <div className='d-flex justify-content-start align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2 me-2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                      <p className='mt-2'>I understand that this is a general report based on the bank statements and Credilinq is not <br /> providing a solution or guiding me for my business growth</p>
                    </div>

                    <div className='d-flex justify-content-start align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2 me-2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                      <p className='mt-2'>I have read and understand the <span className='termCondition'><a className='termCondition' href='https://smehealthcheck.credilinq.ai/terms-and-conditions' target='_blank'> Terms & Conditions </a></span></p>
                    </div>
                  </div>
                </div>
              </div>


              <div className='d-flex justify-content-end align-items-end'>
                <button disabled={isCheckboxChecked} type="submit">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Forms;
