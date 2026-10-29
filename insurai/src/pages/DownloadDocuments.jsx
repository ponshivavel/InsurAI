import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const DownloadDocuments = () => {
    const navigate = useNavigate();

    const documents = [
        {
            id: 1,
            title: 'Policy Documents',
            description: 'Download your insurance policy documents, terms and conditions',
            type: 'Policy',
            files: [
                { name: 'Health Insurance Policy.pdf', size: '2.3 MB', date: '2024-10-01' },
                { name: 'Car Insurance Policy.pdf', size: '1.8 MB', date: '2024-09-15' },
                { name: 'Terms & Conditions.pdf', size: '5.2 MB', date: '2024-08-01' }
            ]
        },
        {
            id: 2,
            title: 'Claim Documents',
            description: 'Access your claim forms, settlement letters, and related documents',
            type: 'Claims',
            files: [
                { name: 'Claim Form CLM001.pdf', size: '1.2 MB', date: '2024-11-10' },
                { name: 'Settlement Letter CLM001.pdf', size: '890 KB', date: '2024-11-08' },
                { name: 'Medical Report.pdf', size: '3.1 MB', date: '2024-11-05' }
            ]
        },
        {
            id: 3,
            title: 'Payment Receipts',
            description: 'Download payment receipts and premium statements',
            type: 'Receipts',
            files: [
                { name: 'Payment Receipt TXN001.pdf', size: '245 KB', date: '2024-10-01' },
                { name: 'Payment Receipt TXN002.pdf', size: '248 KB', date: '2024-09-01' },
                { name: 'Premium Statement Oct 2024.pdf', size: '156 KB', date: '2024-10-15' }
            ]
        },
        {
            id: 4,
            title: 'Legal Documents',
            description: 'Important legal documents and compliance forms',
            type: 'Legal',
            files: [
                { name: 'Privacy Policy.pdf', size: '1.1 MB', date: '2024-07-01' },
                { name: 'Data Protection Agreement.pdf', size: '2.4 MB', date: '2024-06-15' },
                { name: 'Customer Agreement.pdf', size: '890 KB', date: '2024-05-20' }
            ]
        }
    ];

    const handleDownload = (fileName) => {
        alert(`Downloading ${fileName}... (Simulated secure file stream)`);
    };

    return (
        <div className="main-content" style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Download Documents
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Access policy certificates, payment receipts, and compliance forms
                    </p>
                </div>

                <Button
                    className="btn-secondary"
                    onClick={() => navigate('/dashboard')}
                    style={{ height: '42px', padding: '0 18px', whiteSpace: 'nowrap' }}
                >
                    Back to Dashboard
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                {documents.map(doc => (
                    <Card key={doc.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <span style={{ backgroundColor: '#e2e8f0', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                                {doc.type}
                            </span>
                        </div>
                        <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: '700', color: '#0f2a4a' }}>
                            {doc.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.4' }}>
                            {doc.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {doc.files.map((file, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px 12px',
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '13px'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{file.name}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{file.size} &bull; {file.date}</div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(file.name)}
                                        className="btn-secondary"
                                        style={{ padding: '6px 12px', fontSize: '12px', fontWeight: '600' }}
                                    >
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DownloadDocuments;
