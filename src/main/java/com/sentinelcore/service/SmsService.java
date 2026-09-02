package com.sentinelcore.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.from-number}")
    private String fromNumber;

    @Value("${twilio.to-number}")
    private String toNumber;

    public void sendSms(String messageText) {

        Message message = Message.creator(
                new PhoneNumber(toNumber),
                new PhoneNumber(fromNumber),
                messageText
        ).create();

        System.out.println("===== SMS SENT =====");
        System.out.println("Message SID: " + message.getSid());
        System.out.println("====================");
    }
}