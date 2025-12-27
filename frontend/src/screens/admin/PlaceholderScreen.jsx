import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { FaTools, FaArrowLeft } from 'react-icons/fa';

const PlaceholderScreen = ({ title }) => {
    const navigate = useNavigate();
    return (
        <AdminLayout title={title}>
            <Container className="text-center py-5">
                <div className="mb-4 text-muted" style={{ opacity: 0.5 }}>
                    <FaTools size={80} />
                </div>
                <h2 className="fw-bold text-dark">Feature Under Development</h2>
                <p className="text-muted mb-4">
                    The <strong>{title}</strong> module is currently being built and will be available in the next update.
                </p>
                <Button variant="outline-primary" onClick={() => navigate(-1)}>
                    <FaArrowLeft className="me-2"/> Go Back
                </Button>
            </Container>
        </AdminLayout>
    );
};

export default PlaceholderScreen;