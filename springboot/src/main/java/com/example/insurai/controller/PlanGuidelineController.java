package com.example.insurai.controller;

import com.example.insurai.entity.Guideline;
import com.example.insurai.entity.PolicyPlan;
import com.example.insurai.repository.GuidelineRepository;
import com.example.insurai.repository.PolicyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanGuidelineController {

    @Autowired
    private PolicyPlanRepository policyPlanRepository;

    @Autowired
    private GuidelineRepository guidelineRepository;

    @GetMapping("/plans")
    public List<PolicyPlan> getAllPlans(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return policyPlanRepository.findByCategoryIgnoreCase(category);
        }
        return policyPlanRepository.findAll();
    }

    @GetMapping("/plans/{id}")
    public ResponseEntity<PolicyPlan> getPlanById(@PathVariable Long id) {
        return policyPlanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/guidelines")
    public List<Guideline> getAllGuidelines(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return guidelineRepository.findByCategoryIgnoreCase(category);
        }
        return guidelineRepository.findAll();
    }
}
