package com.example.insurai.repository;

import com.example.insurai.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByEmailOrderByTransactionDateDesc(String email);
    Optional<Transaction> findByTransactionNo(String transactionNo);
}
