import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import IdentityDoc from '../../components/IdentityDoc';
import { FaDownload, FaPrint } from 'react-icons/fa';

const MyDocumentsScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    
    const idCardRef = useRef();
    const certificateRef = useRef();

    const handlePrintID = useReactToPrint({
        content: () => idCardRef.current,
    });

    const handlePrintCert = useReactToPrint({
        content: () => certificateRef.current,
    });

    if (!userInfo || userInfo.isAdmin) return <Container className="py-5"><Alert variant="info">Customers/Super Admins don't need ID Cards.</Alert></Container>;

    return (
        <Container className="py-4">
            <h3 className="fw-bold mb-4">My Official Documents</h3>
            
            <Row>
                <Col md={5} className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Digital ID Card</h5>
                        <Button variant="dark" size="sm" onClick={handlePrintID}><FaPrint/> Download ID</Button>
                    </div>
                    <div className="border rounded bg-white p-2">
                         <IdentityDoc ref={idCardRef} user={userInfo} type="idcard" />
                    </div>
                </Col>

                {(userInfo.isShopOwner || userInfo.isDistrictAdmin) && (
                    <Col md={7}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Professional Certificate</h5>
                            <Button variant="primary" size="sm" onClick={handlePrintCert}><FaDownload/> Download Certificate</Button>
                        </div>
                        <div className="border rounded bg-white p-2 overflow-auto">
                            <IdentityDoc ref={certificateRef} user={userInfo} type="certificate" />
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default MyDocumentsScreen;