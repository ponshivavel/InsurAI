import React from 'react';
import Card from '../components/Card';
import VoiceRecognition from '../components/VoiceRecognition';

const Dashboard = ({ onNavigateTo }) => {
    return (
        <main className="app-main">
            <div className="main-content">
                <div className="dashboard-grid">
                    {/* Card 1 — Quote (Top Left) */}
                    <Card>
                        <p className="quote-text">
                            Plant today — because tomorrow your family will breathe from it.
                        </p>
                    </Card>

                    {/* Card 2 — Policy Summary (Top Right) */}
                    <Card title="Policy Summary">
                        <div className="policy-row">
                            <span className="policy-label">Active Policies:</span>
                            <strong className="policy-value">2</strong>
                        </div>
                        <div className="policy-row">
                            <span className="policy-label">Next Expiry:</span>
                            <strong className="policy-value">2024-12-31</strong>
                        </div>
                        <div className="policy-row">
                            <span className="policy-label">Coverage:</span>
                            <strong className="policy-value">Comprehensive</strong>
                        </div>
                    </Card>

                    {/* Card 3 — Upcoming Payments (Middle Left) */}
                    <Card title="Upcoming Payments">
                        <div className="policy-row">
                            <span className="policy-label">Health Insurance</span>
                            <span className="policy-value">Due 2024-11-15 – $150</span>
                        </div>
                        <div className="policy-row">
                            <span className="policy-label">Car Insurance</span>
                            <span className="policy-value">Due 2024-11-20 – $200</span>
                        </div>
                    </Card>

                    {/* Card 4 — Claims Status (Middle Right) */}
                    <Card title="Claims Status">
                        <div className="policy-row">
                            <span className="policy-label">CLM001:</span>
                            <span className="policy-value status-approved">Approved – $500</span>
                        </div>
                        <div className="policy-row">
                            <span className="policy-label">CLM002:</span>
                            <span className="policy-value status-pending">Pending – $300</span>
                        </div>
                    </Card>

                    {/* Card 5 — Premium Payment Gateway (Bottom, Full Width) */}
                    <Card title="Premium Payment Gateway" className="payment-gateway">
                        <div className="btn-group">
                            <button className="btn">Pay via Card</button>
                            <button className="btn">Pay via UPI</button>
                            <button className="btn">Pay via Net Banking</button>
                        </div>
                    </Card>

                    {/* Payment History Table (Full Width) */}
                    <Card title="Payment History" className="payment-gateway">
                        <div className="table-container">
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
                                    <tr>
                                        <td>TXN001</td>
                                        <td>2024-11-01</td>
                                        <td>10:30 AM</td>
                                        <td>Card</td>
                                        <td>$500,000</td>
                                        <td>1/12</td>
                                        <td>$1,250</td>
                                        <td>$0</td>
                                        <td>$225</td>
                                        <td>BR001</td>
                                    </tr>
                                    <tr>
                                        <td>TXN002</td>
                                        <td>2024-10-01</td>
                                        <td>2:15 PM</td>
                                        <td>UPI</td>
                                        <td>$300,000</td>
                                        <td>1/12</td>
                                        <td>$750</td>
                                        <td>$25</td>
                                        <td>$135</td>
                                        <td>BR002</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
            <VoiceRecognition />
        </main>
    );
};

export default Dashboard;
