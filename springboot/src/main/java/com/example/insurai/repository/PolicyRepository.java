package com.example.insurai.repository;

import com.example.insurai.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    // Custom query methods can be added here if needed
}
