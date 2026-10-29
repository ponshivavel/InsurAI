package com.example.insurai.controller;

import com.example.insurai.entity.Transaction;
import com.example.insurai.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/user/{email}")
    public List<Transaction> getTransactionsByUser(@PathVariable String email) {
        return transactionRepository.findByEmailOrderByTransactionDateDesc(email);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        if (transaction.getTransactionNo() == null || transaction.getTransactionNo().trim().isEmpty()) {
            transaction.setTransactionNo("TXN" + System.currentTimeMillis() % 10000000);
        }
        Transaction saved = transactionRepository.save(transaction);
        return ResponseEntity.ok(saved);
    }
}
