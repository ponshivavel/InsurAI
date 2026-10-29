package com.example.insurai.repository;

import com.example.insurai.entity.Guideline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuidelineRepository extends JpaRepository<Guideline, Long> {
    List<Guideline> findByCategoryIgnoreCase(String category);
}
