package com.hrms.controller;

import com.hrms.entity.Purchase;
import com.hrms.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.savePurchase(purchase);
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Purchase> getByEmployee(@PathVariable Long employeeId) {
        return purchaseService.getPurchasesByEmployeeId(employeeId);
    }

    @PutMapping("/{id}/status")
    public Purchase updateStatus(@PathVariable Long id, @RequestParam String status) {
        return purchaseService.updatePurchaseStatus(id, status);
    }
}

