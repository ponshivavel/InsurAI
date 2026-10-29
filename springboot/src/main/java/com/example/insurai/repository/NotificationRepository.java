package com.example.insurai.repository;

import com.example.insurai.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEmailOrderByCreatedAtDesc(String email);
    long countByEmailAndIsReadFalse(String email);
}
