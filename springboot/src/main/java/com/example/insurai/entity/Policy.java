package com.example.insurai.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String policyNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal coverage;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal premium;

    @Column(nullable = false)
    private String status; // Active, Pending, Expired, Cancelled

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate renewalDate;

    public Policy() {
        this.status = "Active";
        this.startDate = LocalDate.now();
        this.renewalDate = LocalDate.now().plusYears(1);
    }

    public Policy(String policyNumber, String name, String type, String userEmail,
                  BigDecimal coverage, BigDecimal premium, String status,
                  LocalDate startDate, LocalDate renewalDate) {
        this.policyNumber = policyNumber;
        this.name = name;
        this.type = type;
        this.userEmail = userEmail;
        this.coverage = coverage;
        this.premium = premium;
        this.status = status;
        this.startDate = startDate;
        this.renewalDate = renewalDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public BigDecimal getCoverage() { return coverage; }
    public void setCoverage(BigDecimal coverage) { this.coverage = coverage; }

    public BigDecimal getPremium() { return premium; }
    public void setPremium(BigDecimal premium) { this.premium = premium; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getRenewalDate() { return renewalDate; }
    public void setRenewalDate(LocalDate renewalDate) { this.renewalDate = renewalDate; }
}
