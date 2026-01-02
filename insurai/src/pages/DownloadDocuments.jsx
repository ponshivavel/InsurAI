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
            icon: '📋',
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
            icon: '📄',
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
            icon: '💳',
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
            icon: '⚖️',
            files: [
                { name: 'Privacy Policy.pdf', size: '1.1 MB', date: '2024-07-01' },
                { name: 'Data Protection Agreement.pdf', size: '2.4 MB', date: '2024-06-15' },
                { name: 'Customer Agreement.pdf', size: '890 KB', date: '2024-05-20' }
            ]
        }
    ];

    const handleDownload = (fileName) => {
        // Simulate download
        console.log(`Downloading ${fileName}`);
        // In a real app, this would trigger a file download
    };

    return (
        <div className="main-content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
            {/* PAGE HEADER */}
            <div style={{ marginBottom: '24px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}
                >
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h1
                            style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '8px'
                            }}
                        >
                            Document Downloads
                        </h1>
                        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                            Access and download your insurance documents securely
                        </p>
                    </div>

                    <Button
                        className="btn-secondary"
                        onClick={() => navigate('/')}
                        style={{ height: '48px', padding: '0 20px', whiteSpace: 'nowrap' }}
                    >
                        ← Return to Dashboard
                    </Button>
                </div>
            </div>

            <div className="dashboard-grid">
                {documents.map(category => (
                    <Card key={category.id}>
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1F2937',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{ fontSize: '20px' }}>{category.icon}</span>
                                {category.title}
                            </h3>
                            <p style={{
                                color: '#6B7280',
                                margin: 0,
                                lineHeight: '1.5'
                            }}>
                                {category.description}
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {category.files.map((file, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '16px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '8px',
                                        border: '1px solid #E5E7EB',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontWeight: '500',
                                            color: '#1F2937',
                                            fontSize: '14px',
                                            marginBottom: '4px'
                                        }}>
                                            {file.name}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#6B7280'
                                        }}>
                                            {file.size} • {file.date}
                                        </div>
                                    </div>
                                    <Button
                                        style={{
                                            height: '36px',
                                            padding: '0 16px',
                                            fontSize: '14px'
                                        }}
                                        onClick={() => handleDownload(file.name)}
                                    >
                                        Download
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            <Card style={{ marginTop: '32px' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1F2937',
                        marginBottom: '12px'
                    }}>
                        Need Help?
                    </h3>
                    <p style={{
                        color: '#6B7280',
                        marginBottom: '20px',
                        lineHeight: '1.5'
                    }}>
                        If you can't find the document you're looking for or need assistance with downloads,
                        our support team is here to help.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Button onClick={() => navigate('/appointments')}>
                            Schedule Support Call
                        </Button>
                        <Button
                            className="btn-secondary"
                            onClick={() => window.open('mailto:support@insurai.com')}
                        >
                            Email Support
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DownloadDocuments;
