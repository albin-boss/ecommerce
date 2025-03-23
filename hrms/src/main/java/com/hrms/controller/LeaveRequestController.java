package com.hrms.controller;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.hrms.entity.LeaveRequest;
import com.hrms.service.LeaveRequestService;
import org.springframework.http.HttpStatus;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for this controller
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Create a new leave request

    
    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        LeaveRequest createdLeaveRequest = leaveRequestService.createLeaveRequest(leaveRequest);
        return new ResponseEntity<>(createdLeaveRequest, HttpStatus.CREATED); // Return the created leave request with status 201
    }


    // Get leave requests by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
    }
    
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    // Update leave request status based on request ID
    @PutMapping("/leave-requests/{id}")
    public LeaveRequest updateLeaveRequestStatus(@PathVariable Long id, @RequestBody String status) {
        return leaveRequestService.updateLeaveStatusById(id, status);
    }

    // Delete leave requests based on employee ID
    @DeleteMapping("/employee/{employeeId}")
    public void deleteLeaveRequests(@PathVariable Long employeeId) {
        leaveRequestService.deleteLeaveRequestsByEmployeeId(employeeId);
    }
}
