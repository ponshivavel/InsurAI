package com.example.insurai.repository;

import com.example.insurai.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    List<Policy> findByUserEmail(String userEmail);
    Optional<Policy> findByPolicyNumber(String policyNumber);
    long countByUserEmailAndStatus(String userEmail, String status);
}
