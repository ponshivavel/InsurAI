package com.example.insurai.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String transactionNo;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(precision = 12, scale = 2)
    private BigDecimal lateFee;

    @Column(precision = 12, scale = 2)
    private BigDecimal gst;

    @Column(nullable = false)
    private String premiumMode; // Monthly, Quarterly, Annual

    @Column(nullable = false)
    private String paymentMethod; // Card, UPI, Net Banking

    @Column(nullable = false)
    private String status; // Completed, Pending, Failed

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    @Column
    private String branchAgency;

    public Transaction() {
        this.transactionDate = LocalDateTime.now();
        this.status = "Completed";
    }

    public Transaction(String transactionNo, String email, String policyName, BigDecimal amount,
                       BigDecimal lateFee, BigDecimal gst, String premiumMode, String paymentMethod,
                       String status, String branchAgency) {
        this.transactionNo = transactionNo;
        this.email = email;
        this.policyName = policyName;
        this.amount = amount;
        this.lateFee = lateFee;
        this.gst = gst;
        this.premiumMode = premiumMode;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.transactionDate = LocalDateTime.now();
        this.branchAgency = branchAgency;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTransactionNo() { return transactionNo; }
    public void setTransactionNo(String transactionNo) { this.transactionNo = transactionNo; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPolicyName() { return policyName; }
    public void setPolicyName(String policyName) { this.policyName = policyName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getLateFee() { return lateFee; }
    public void setLateFee(BigDecimal lateFee) { this.lateFee = lateFee; }

    public BigDecimal getGst() { return gst; }
    public void setGst(BigDecimal gst) { this.gst = gst; }

    public String getPremiumMode() { return premiumMode; }
    public void setPremiumMode(String premiumMode) { this.premiumMode = premiumMode; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }

    public String getBranchAgency() { return branchAgency; }
    public void setBranchAgency(String branchAgency) { this.branchAgency = branchAgency; }
}
