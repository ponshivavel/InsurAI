package com.example.insurai.repository;

import com.example.insurai.entity.PolicyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyPlanRepository extends JpaRepository<PolicyPlan, Long> {
    List<PolicyPlan> findByCategoryIgnoreCase(String category);
    Optional<PolicyPlan> findByPlanCode(String planCode);
}
