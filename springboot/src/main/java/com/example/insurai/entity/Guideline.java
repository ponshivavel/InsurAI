package com.example.insurai.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "guidelines")
public class Guideline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // Claims, Underwriting, Regulatory, Renewals

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 3000)
    private String summary;

    @Column(nullable = false, length = 1000)
    private String complianceNotes;

    public Guideline() {}

    public Guideline(String category, String title, String summary, String complianceNotes) {
        this.category = category;
        this.title = title;
        this.summary = summary;
        this.complianceNotes = complianceNotes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getComplianceNotes() { return complianceNotes; }
    public void setComplianceNotes(String complianceNotes) { this.complianceNotes = complianceNotes; }
}
