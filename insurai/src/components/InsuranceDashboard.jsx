22import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardCard from './DashboardCard';
import VoiceRecognition from './VoiceRecognition';
import '../styles.css';

const InsuranceDashboard = ({ onNavigateTo }) => {
    return (
        <div>
            <Header />
            <Sidebar onNavigateTo={onNavigateTo} />
            <main className="main-content">
                <div className="dashboard-grid">
                    {/* Card 1: Quote */}
                    <DashboardCard>
                        <p className="quote-text">
                            Plant today — because tomorrow your family will breathe from it.
                        </p>
                    </DashboardCard>

                    {/* Card 2: Policy Summary */}
                    <DashboardCard>
                        <h3 className="card-title">Policy Summary</h3>
                        <div>
                            <div className="policy-row">
                                <span>Active Policies:</span>
                                <strong>2</strong>
                            </div>
                            <div className="policy-row">
                                <span>Next Expiry:</span>
                                <strong>2024-12-31</strong>
                            </div>
                            <div className="policy-row">
                                <span>Coverage:</span>
                                <strong>Comprehensive</strong>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Card 3: Upcoming Payments */}
                    <DashboardCard>
                        <h3 className="card-title">Upcoming Payments</h3>
                        <div>
                            <div className="payment-row">
                                <span>Health Insurance</span>
                                <span style={{ fontWeight: '600' }}>Due 2024-11-15 – $150</span>
                            </div>
                            <div className="payment-row">
                                <span>Car Insurance</span>
                                <span style={{ fontWeight: '600' }}>Due 2024-11-20 – $200</span>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Card 4: Claims Status */}
                    <DashboardCard>
                        <h3 className="card-title">Claims Status</h3>
                        <div>
                            <div className="claim-row">
                                <span>CLM001:</span>
                                <span className="status-approved">Approved – $500</span>
                            </div>
                            <div className="claim-row">
                                <span>CLM002:</span>
                                <span className="status-pending">Pending – $300</span>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Card 5: Premium Payment Gateway (Full Width) */}
                    <DashboardCard fullWidth={true}>
                        <h3 className="payment-gateway">Premium Payment Gateway</h3>
                        <div className="button-row">
                            <button className="payment-button">Pay via Card</button>
                            <button className="payment-button">Pay via UPI</button>
                            <button className="payment-button">Pay via Net Banking</button>
                        </div>
                    </DashboardCard>

                    {/* Card 6: Payment History */}
                    <DashboardCard fullWidth={true}>
                        <h3 className="card-title">Payment History</h3>
                        <div className="payment-history-table">
                            <table>
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
                                        <th>GST (CGST/SGST/UTGST)</th>
                                        <th>Branch / Agency Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>TXN001</td>
                                        <td>2024-10-01</td>
                                        <td>10:00 AM</td>
                                        <td>Monthly</td>
                                        <td>$100,000</td>
                                        <td>1/12</td>
                                        <td>$150</td>
                                        <td>$0</td>
                                        <td>$13.50</td>
                                        <td>BR001</td>
                                    </tr>
                                    <tr>
                                        <td>TXN002</td>
                                        <td>2024-09-01</td>
                                        <td>10:00 AM</td>
                                        <td>Monthly</td>
                                        <td>$100,000</td>
                                        <td>1/12</td>
                                        <td>$150</td>
                                        <td>$0</td>
                                        <td>$13.50</td>
                                        <td>BR001</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>

                    {/* Card 7: New Insurance Plans */}
                    <DashboardCard fullWidth={true}>
                        <h3 className="card-title">New Insurance Plans</h3>
                        <div className="insurance-plans-grid">
                            <div className="plan-item">
                                <h4>🚗 Car Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                            <div className="plan-item">
                                <h4>🏥 Health Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                            <div className="plan-item">
                                <h4>💝 Life Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                            <div className="plan-item">
                                <h4>🏠 Home Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                            <div className="plan-item">
                                <h4>✈️ Travel Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                            <div className="plan-item">
                                <h4>🏢 Business Insurance</h4>
                                <button className="learn-more-button" onClick={() => onNavigateTo('plan-information')}>Learn More</button>
                            </div>
                        </div>
                        <p className="new-policy-text">New policies are coming soon and more!</p>
                    </DashboardCard>
                </div>
            </main>
            <VoiceRecognition />
        </div>
    );
};

export default InsuranceDashboard;
