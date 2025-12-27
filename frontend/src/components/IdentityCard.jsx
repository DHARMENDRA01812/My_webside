import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaShieldAlt } from 'react-icons/fa';

const IdentityCard = ({ user, type }) => {
    const isCertificate = type === 'certificate';

    return (
        <div className={isCertificate ? "certificate-wrapper" : "id-card-wrapper"} id="printable-area">
            <Card className="shadow border-0" style={{ width: isCertificate ? '800px' : '400px', margin: 'auto' }}>
                <Card.Header className="bg-dark text-white text-center">
                    <h4 className="m-0">MY SHOP INDIA</h4>
                    <small>{isCertificate ? 'OFFICIAL CERTIFICATE' : 'IDENTITY CARD'}</small>
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={isCertificate ? 3 : 4} className="text-center">
                            <img src={user.photo || '/default-user.png'} alt="user" className="img-thumbnail rounded-circle" style={{ width: '100px' }} />
                        </Col>
                        <Col xs={isCertificate ? 9 : 8}>
                            <h5 className="fw-bold mb-1">{user.name}</h5>
                            <p className="text-muted small mb-1">ID: {user.email}</p>
                            <p className="mb-0"><strong>Role:</strong> {user.staffRole || (user.isShopOwner ? 'Shop Owner' : 'District Admin')}</p>
                            {user.isShopOwner && <p className="mb-0 small"><strong>Shop:</strong> {user.shopType}</p>}
                        </Col>
                    </Row>
                    <hr />
                    <Row className="small">
                        <Col xs={6}><strong>Mobile:</strong> {user.mobile}</Col>
                        <Col xs={6}><strong>State:</strong> {user.permanentAddress?.state}</Col>
                    </Row>
                    {isCertificate && (
                        <div className="mt-4 text-center">
                            <p>This is to certify that the above mentioned user is a verified member of MyShop India.</p>
                            <div className="d-flex justify-content-between mt-5">
                                <div><hr/>Signature (Admin)</div>
                                <div><FaShieldAlt size={50} className="text-success"/><br/>Verified Seal</div>
                            </div>
                        </div>
                    )}
                </Card.Body>
                <Card.Footer className="bg-light text-center py-1">
                    <small>Valid at: {new Date().toLocaleDateString()}</small>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default IdentityCard;