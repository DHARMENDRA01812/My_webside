import { useState } from 'react';
import { Card, Form, Button, ProgressBar, Alert, Table } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaCloudUploadAlt, FaFileCsv, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BulkUploadScreen = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = (e) => {
        e.preventDefault();
        setUploading(true);
        // Fake Upload Simulation
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                toast.success('500 Products Uploaded Successfully!');
                setProgress(0);
            }
        }, 300);
    };

    return (
        <AdminLayout title="Bulk Product Upload">
            <Card className="p-4 border-0 shadow-sm mb-4">
                <h5 className="mb-3">Step 1: Download Template</h5>
                <p className="text-muted small">Download the CSV format to add products in bulk.</p>
                <Button variant="outline-primary" style={{width: '200px'}}>
                    <FaDownload className="me-2"/> Download CSV
                </Button>
            </Card>

            <Card className="p-4 border-0 shadow-sm">
                <h5 className="mb-3">Step 2: Upload File</h5>
                <Form onSubmit={handleUpload}>
                    <div className="border-2 border-dashed p-5 text-center rounded bg-light" style={{borderStyle: 'dashed'}}>
                        <FaFileCsv size={50} className="text-success mb-3"/>
                        <h5>Drag & Drop or Click to Upload</h5>
                        <Form.Control type="file" className="mt-3" accept=".csv, .xlsx" required />
                    </div>
                    {uploading && <ProgressBar now={progress} label={`${progress}%`} className="mt-3" animated variant="success"/>}
                    <Button type="submit" variant="dark" className="mt-4 w-100" disabled={uploading}>
                        <FaCloudUploadAlt className="me-2"/> Start Import
                    </Button>
                </Form>
            </Card>
        </AdminLayout>
    );
};
export default BulkUploadScreen;