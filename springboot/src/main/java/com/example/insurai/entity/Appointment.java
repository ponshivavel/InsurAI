package com.example.insurai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String type; // e.g., "Consultation", "Claim Review"

    @Column(nullable = false)
    private LocalDateTime dateTime;

    @Column(length = 500)
    private String notes;

    @Column(nullable = false)
    private String status; // e.g., "Scheduled", "Completed", "Cancelled"

    // Constructors
    public Appointment() {}

    public Appointment(String email, String type, LocalDateTime dateTime, String notes, String status) {
        this.email = email;
        this.type = type;
        this.dateTime = dateTime;
        this.notes = notes;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
