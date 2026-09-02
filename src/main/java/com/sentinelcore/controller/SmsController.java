package com.sentinelcore.controller;

import com.sentinelcore.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/test")
public String testSms() {

    System.out.println("===== SMS TEST ENDPOINT REACHED =====");

    smsService.sendSms(
            "SentinelCore TEST ALERT: Twilio SMS is working successfully."
    );

    return "Test SMS sent successfully";
}
}