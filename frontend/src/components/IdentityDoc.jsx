import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaShieldAlt, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const IdentityDoc = React.forwardRef(({ user, type, shopData }, ref) => {
    const isCertificate = type === 'certificate';
    const isStaff = user.isStaff;
    const isDistrict = user.isDistrictAdmin;

    return (
        <div ref={ref} className="p-4 d-flex justify-content-center">
            {/* --- ID CARD DESIGN --- */}
            {!isCertificate ? (
                <Card className="shadow-lg border-2" style={{ width: '350px', borderRadius: '15px', border: '2px solid #333' }}>
                    <div className="text-center p-3 text-white" style={{ backgroundColor: '#111', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                        <h5 className="m-0 fw-bold">MY SHOP INDIA</h5>
                        <small className="text-warning">Identity Card</small>
                    </div>
                    <Card.Body className="text-center">
                        <img src={user.photo || '/default-user.png'} alt="User" 
                             style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '3px solid #f8f9fa' }} 
                             className="mb-3 shadow-sm" />
                        
                        <h5 className="fw-bold text-uppercase mb-1">{user.name}</h5>
                        <p className="badge bg-primary mb-2" style={{fontSize: '0.8rem'}}>
                            {isStaff ? user.staffRole : (isDistrict ? 'District Admin' : 'Shop Owner')}
                        </p>
                        
                        <div className="text-start mt-3 small">
                            <p className="mb-1"><strong>User ID:</strong> {user.email}</p>
                            {(isStaff || user.isShopOwner) && <p className="mb-1"><strong>Shop:</strong> {shopData?.shopName || 'MyShop Store'}</p>}
                            {isDistrict && <p className="mb-1"><strong>Zone:</strong> {user.managedDistrict}</p>}
                            <p className="mb-1"><FaPhoneAlt className="me-1"/> {user.mobile}</p>
                            <p className="mb-1"><FaMapMarkerAlt className="me-1"/> {user.permanentAddress?.district}, {user.permanentAddress?.state}</p>
                        </div>
                    </Card.Body>
                    <div className="text-center py-2 bg-light" style={{ borderBottomLeftRadius: '13px', borderBottomRightRadius: '13px' }}>
                        <small className="fw-bold">www.myshopindia.com</small>
                    </div>
                </Card>
            ) : (
                /* --- CERTIFICATE DESIGN --- */
                <div className="p-5 border border-5 border-double shadow-lg bg-white" style={{ width: '800px', border: '15px double #333', position: 'relative' }}>
                    <div className="text-center">
                        <FaShieldAlt size={60} className="text-primary mb-3"/>
                        <h1 className="fw-bold" style={{ letterSpacing: '2px' }}>CERTIFICATE OF REGISTRATION</h1>
                        <p className="lead">This is to certify that</p>
                        <h2 className="text-primary fw-bold text-uppercase">{user.name}</h2>
                        <p className="mt-3">
                            is a registered <strong>{isDistrict ? 'District Administrator' : 'Shop Owner'}</strong> 
                            {isDistrict ? ` for ${user.managedDistrict}` : ` of ${shopData?.shopName || 'a verified outlet'}`}.
                        </p>
                        
                        <div className="my-4 text-start bg-light p-3 rounded">
                            <Row>
                                <Col><strong>Registered ID:</strong> {user.email}</Col>
                                <Col><strong>Issue Date:</strong> {new Date().toLocaleDateString()}</Col>
                            </Row>
                            <p className="mt-2 mb-0"><strong>Address:</strong> {user.shopAddress?.fullAddress || user.officeAddress?.fullAddress}</p>
                        </div>

                        <div className="d-flex justify-content-between mt-5 pt-4">
                            <div className="text-center">
                                <div style={{ borderBottom: '1px solid #333', width: '150px' }}></div>
                                <small>System Admin Signature</small>
                            </div>
                            <div className="text-center">
                                <div className="rounded-circle border border-danger d-flex align-items-center justify-content-center mx-auto" 
                                     style={{ width: '80px', height: '80px', border: '3px dashed red', opacity: '0.6' }}>
                                    <small className="text-danger fw-bold">OFFICIAL<br/>STAMP</small>
                                </div>
                                <small>MyShop Seal</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default IdentityDoc;