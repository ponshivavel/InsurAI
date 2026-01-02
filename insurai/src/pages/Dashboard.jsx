import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

const Dashboard = () => {
    const paymentHistoryData = [
        {
            transactionNo: 'TXN001',
            date: '2024-11-15',
            time: '10:30 AM',
            premiumMode: 'Monthly',
            sumAssured: '$50,000',
            instDue: 'Nov 2024',
            totalPremium: '$150',
            lateFee: '$0',
            gst: '$13.50',
            branchAgency: 'BR001'
        },
        {
            transactionNo: 'TXN002',
            date: '2024-11-20',
            time: '2:15 PM',
            premiumMode: 'Quarterly',
            sumAssured: '$100,000',
            instDue: 'Nov 2024',
            totalPremium: '$200',
            lateFee: '$5',
            gst: '$27.00',
            branchAgency: 'BR002'
        }
    ];

    return (
        <div className="app-container">
            <Header />
            <div className="app-main">
                <Sidebar />
                <main className="main-content">
                    <div className="dashboard-grid">
                        {/* Quote Card */}
                        <Card>
                            <div className="quote-card">
                                <p className="quote-text">
                                    Plant today — because tomorrow your family will breathe from it.
                                </p>
                            </div>
                        </Card>

                        {/* Policy Summary Card */}
                        <Card>
                            <h3 className="card-title">Policy Summary</h3>
                            <div className="policy-row">
                                <span>Active Policies:</span>
                                <span className="policy-value">2</span>
                            </div>
                            <div className="policy-row">
                                <span>Next Expiry:</span>
                                <span className="policy-value">2024-12-31</span>
                            </div>
                            <div className="policy-row">
                                <span>Coverage:</span>
                                <span className="policy-value">Comprehensive</span>
                            </div>
                        </Card>

                        {/* Upcoming Payments Card */}
                        <Card>
                            <h3 className="card-title">Upcoming Payments</h3>
                            <div className="payment-row">
                                <span>Health Insurance</span>
                                <span className="payment-amount">Due 2024-11-15 — $150</span>
                            </div>
                            <div className="payment-row">
                                <span>Car Insurance</span>
                                <span className="payment-amount">Due 2024-11-20 — $200</span>
                            </div>
                        </Card>

                        {/* Claims Status Card */}
                        <Card>
                            <h3 className="card-title">Claims Status</h3>
                            <div className="claim-row">
                                <span>CLM001</span>
                                <span className="status-approved">Approved — $500</span>
                            </div>
                            <div className="claim-row">
                                <span>CLM002</span>
                                <span className="status-pending">Pending — $300</span>
                            </div>
                        </Card>

                        {/* Premium Payment Gateway Card */}
                        <Card fullWidth={true}>
                            <h3 className="card-title">Premium Payment Gateway</h3>
                            <div className="payment-buttons">
                                <button className="payment-btn">Pay via Card</button>
                                <button className="payment-btn">Pay via UPI</button>
                                <button className="payment-btn">Pay via Net Banking</button>
                            </div>
                        </Card>

                        {/* Payment History Table */}
                        <Card fullWidth={true}>
                            <h3 className="card-title">Payment History</h3>
                            <div className="payment-history-card">
                                <table className="payment-table">
                                    <thead>
                                        <tr>
                                            <th>Transaction No</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Premium Mode</th>
                                            <th>Sum Assured</th>
                                            <th>Inst Due (From/To)</th>
                                            <th>Total Premium</th>
                                            <th>Late Fee</th>
                                            <th>GST</th>
                                            <th>Branch / Agency Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentHistoryData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.transactionNo}</td>
                                                <td>{row.date}</td>
                                                <td>{row.time}</td>
                                                <td>{row.premiumMode}</td>
                                                <td>{row.sumAssured}</td>
                                                <td>{row.instDue}</td>
                                                <td>{row.totalPremium}</td>
                                                <td>{row.lateFee}</td>
                                                <td>{row.gst}</td>
                                                <td>{row.branchAgency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>

            {/* AI Assistant Button */}
            <button className="ai-assistant-btn">
                <img src="/src/assets/aiassist.png" alt="AI Assistant" className="ai-assistant-icon" />
                <span>AI</span>
            </button>
        </div>
    );
};

export default Dashboard;
