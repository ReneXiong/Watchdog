import React from 'react'
import { CFormCheck, CButton, CForm, CFormRange, CRow, CCol } from '@coreui/react'

export default function Triggers() {
  return (
    <>
      <CForm className="m-5">
        <CRow md={{ cols: 2 }}>
          <CCol>
            <h2>Your Triggers</h2>
            <CFormCheck label="Gender-based hate" />
            <CFormCheck label="Race-based hate" />
            <CFormCheck label="War and gore" />
            <CFormCheck label="Body dysmorphia" />
            <CFormCheck label="Sexual violence" />
            <CButton color="success" className="mt-3">
              Save
            </CButton>
          </CCol>
          <CCol>
            <h2>Your Websites</h2>
            <CFormCheck label="Facebook" />
            <CFormCheck label="Twitter" />
            <CFormCheck label="Reddit" />
            <CButton color="success" className="mt-3">
              Save
            </CButton>
          </CCol>
        </CRow>
        <h2 className="mt-5">Your Sensitivity</h2>
        <CFormRange label="" />
        <CButton color="success" className="mt-3">
          Save
        </CButton>
      </CForm>
    </>
  )
}
