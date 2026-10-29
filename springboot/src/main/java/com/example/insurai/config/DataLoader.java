package com.example.insurai.config;

import com.example.insurai.entity.*;
import com.example.insurai.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PolicyPlanRepository policyPlanRepository;

    @Autowired
    private GuidelineRepository guidelineRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed default user
        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setName("Admin User");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRoles(Set.of(Role.ADMIN, Role.USER));
            userRepository.save(admin);
            System.out.println("Default user created: admin@admin.com / admin");
        }

        // Seed initial policies for admin user
        if (policyRepository.count() == 0) {
            Policy p1 = new Policy(
                    "POL-HLTH-8821",
                    "Comprehensive Corporate Health",
                    "Health",
                    "admin@admin.com",
                    new BigDecimal("500000.00"),
                    new BigDecimal("150.00"),
                    "Active",
                    LocalDate.now().minusMonths(6),
                    LocalDate.now().plusMonths(6)
            );
            Policy p2 = new Policy(
                    "POL-AUTO-9432",
                    "Executive Vehicle Shield",
                    "Auto",
                    "admin@admin.com",
                    new BigDecimal("120000.00"),
                    new BigDecimal("200.00"),
                    "Active",
                    LocalDate.now().minusMonths(3),
                    LocalDate.now().plusMonths(9)
            );
            policyRepository.save(p1);
            policyRepository.save(p2);
        }

        // Seed initial appointments
        if (appointmentRepository.count() == 0) {
            Appointment a1 = new Appointment(
                    "admin@admin.com",
                    "Policy Consultation",
                    LocalDateTime.now().plusDays(3).withHour(10).withMinute(30),
                    "Annual corporate policy review and risk assessment",
                    "Confirmed"
            );
            Appointment a2 = new Appointment(
                    "admin@admin.com",
                    "Claim Review",
                    LocalDateTime.now().plusDays(8).withHour(14).withMinute(0),
                    "Review diagnostic claim documents for CLM-8841",
                    "Pending"
            );
            appointmentRepository.save(a1);
            appointmentRepository.save(a2);
        }

        // Seed initial transactions
        if (transactionRepository.count() == 0) {
            Transaction t1 = new Transaction(
                    "TXN-749102",
                    "admin@admin.com",
                    "Comprehensive Corporate Health",
                    new BigDecimal("150.00"),
                    BigDecimal.ZERO,
                    new BigDecimal("13.50"),
                    "Monthly",
                    "Card",
                    "Completed",
                    "BR001-Downtown"
            );
            t1.setTransactionDate(LocalDateTime.now().minusDays(15));

            Transaction t2 = new Transaction(
                    "TXN-749214",
                    "admin@admin.com",
                    "Executive Vehicle Shield",
                    new BigDecimal("200.00"),
                    new BigDecimal("5.00"),
                    new BigDecimal("27.00"),
                    "Quarterly",
                    "UPI",
                    "Completed",
                    "BR002-FinancialDistrict"
            );
            t2.setTransactionDate(LocalDateTime.now().minusDays(5));

            transactionRepository.save(t1);
            transactionRepository.save(t2);
        }

        // Seed initial notifications
        if (notificationRepository.count() == 0) {
            notificationRepository.save(new Notification(
                    "admin@admin.com",
                    "Policy Renewal Notice",
                    "Your Comprehensive Health Insurance policy renewal is scheduled for " + LocalDate.now().plusMonths(6) + ".",
                    "Policy"
            ));
            notificationRepository.save(new Notification(
                    "admin@admin.com",
                    "Appointment Scheduled",
                    "Upcoming Policy Consultation confirmed for " + LocalDate.now().plusDays(3) + " at 10:30 AM.",
                    "Appointment"
            ));
            notificationRepository.save(new Notification(
                    "admin@admin.com",
                    "Payment Received",
                    "Payment of 200.00 for Executive Vehicle Shield was successfully processed.",
                    "Payment"
            ));
        }

        // Seed policy plans catalog
        if (policyPlanRepository.count() == 0) {
            policyPlanRepository.save(new PolicyPlan(
                    "PLAN-CORP-HLTH",
                    "InsurAI Enterprise Health Elite",
                    "Health",
                    "Comprehensive group health insurance covering hospitalization, pre/post-care, wellness incentives, and family add-ons.",
                    new BigDecimal("250000.00"),
                    new BigDecimal("1000000.00"),
                    new BigDecimal("120.00"),
                    "Full-time employees aged 18 to 65",
                    "Zero waiting period for emergency care, cashless network in 7,500+ hospitals, free bi-annual health screenings."
            ));
            policyPlanRepository.save(new PolicyPlan(
                    "PLAN-AUTO-EXEC",
                    "Commercial Fleet & Executive Auto",
                    "Auto",
                    "Total loss and collision protection for executive vehicles and delivery fleets with 24/7 roadside assistance.",
                    new BigDecimal("50000.00"),
                    new BigDecimal("300000.00"),
                    new BigDecimal("85.00"),
                    "Commercial or corporate registered motor vehicles with valid safety permits",
                    "Bumper-to-bumper zero depreciation, fast-track glass repair, courtesy rental replacement."
            ));
            policyPlanRepository.save(new PolicyPlan(
                    "PLAN-CYBER-SEC",
                    "Cyber Risk & Data Breach Defense",
                    "Business",
                    "Protect corporate infrastructure, confidential customer data, and legal liabilities from ransomware and outages.",
                    new BigDecimal("500000.00"),
                    new BigDecimal("5000000.00"),
                    new BigDecimal("350.00"),
                    "Active enterprises with documented infosec controls or ISO27001 readiness",
                    "Forensic investigations reimbursement, GDPR/HIPAA fine coverage, PR mitigation team retainer."
            ));
        }

        // Seed guidelines
        if (guidelineRepository.count() == 0) {
            guidelineRepository.save(new Guideline(
                    "Claims",
                    "Hospitalization and Diagnostic Claim Submission",
                    "Claims must be reported within 48 hours of emergency admission or 72 hours prior for planned procedures. Cashless approval turnaround is under 2 hours via the InsurAI portal.",
                    "Complies with IRDAI & international health claims directives. Digital invoices and medical records must be uploaded."
            ));
            guidelineRepository.save(new Guideline(
                    "Renewals",
                    "Grace Period and Automatic Renewal Protocol",
                    "A grace period of 30 days is extended after policy renewal date. Continuous coverage benefits like waiting period waivers are preserved if renewed within this window.",
                    "Statutory insurance regulations apply. Premiums may be auto-debited with active mandates."
            ));
            guidelineRepository.save(new Guideline(
                    "Underwriting",
                    "Corporate Fleet Risk Assessment Standards",
                    "All commercial vehicles must pass mandatory telemetry audits and quarterly maintenance verifications to qualify for tier-1 premium rates.",
                    "Standard DOT safety compliance required."
            ));
        }
    }
}
