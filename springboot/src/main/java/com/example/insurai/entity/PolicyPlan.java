package com.example.insurai.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "policy_plans")
public class PolicyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String planCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // Health, Life, Auto, Business, Cyber, Property

    @Column(nullable = false, length = 1500)
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal minCoverage;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal maxCoverage;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal baseMonthlyPremium;

    @Column(nullable = false, length = 1000)
    private String eligibility;

    @Column(nullable = false, length = 2000)
    private String keyFeatures; // JSON or comma-separated highlights

    public PolicyPlan() {}

    public PolicyPlan(String planCode, String name, String category, String description,
                      BigDecimal minCoverage, BigDecimal maxCoverage, BigDecimal baseMonthlyPremium,
                      String eligibility, String keyFeatures) {
        this.planCode = planCode;
        this.name = name;
        this.category = category;
        this.description = description;
        this.minCoverage = minCoverage;
        this.maxCoverage = maxCoverage;
        this.baseMonthlyPremium = baseMonthlyPremium;
        this.eligibility = eligibility;
        this.keyFeatures = keyFeatures;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlanCode() { return planCode; }
    public void setPlanCode(String planCode) { this.planCode = planCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getMinCoverage() { return minCoverage; }
    public void setMinCoverage(BigDecimal minCoverage) { this.minCoverage = minCoverage; }

    public BigDecimal getMaxCoverage() { return maxCoverage; }
    public void setMaxCoverage(BigDecimal maxCoverage) { this.maxCoverage = maxCoverage; }

    public BigDecimal getBaseMonthlyPremium() { return baseMonthlyPremium; }
    public void setBaseMonthlyPremium(BigDecimal baseMonthlyPremium) { this.baseMonthlyPremium = baseMonthlyPremium; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getKeyFeatures() { return keyFeatures; }
    public void setKeyFeatures(String keyFeatures) { this.keyFeatures = keyFeatures; }
}
