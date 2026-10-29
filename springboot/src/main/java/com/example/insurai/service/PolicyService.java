package com.example.insurai.service;

import com.example.insurai.entity.Policy;
import com.example.insurai.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public List<Policy> getPoliciesByUserEmail(String userEmail) {
        return policyRepository.findByUserEmail(userEmail);
    }

    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }

    public Optional<Policy> getPolicyByNumber(String policyNumber) {
        return policyRepository.findByPolicyNumber(policyNumber);
    }

    public Policy savePolicy(Policy policy) {
        if (policy.getPolicyNumber() == null || policy.getPolicyNumber().trim().isEmpty()) {
            policy.setPolicyNumber("POL-" + System.currentTimeMillis() % 1000000);
        }
        return policyRepository.save(policy);
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
