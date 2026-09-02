package com.sentinelcore.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
@Service
public class WebhookNotificationService {
private final RestTemplate restTemplate = new RestTemplate();
private final String webhookUrl =
"https://hooks.slack.com/services/your/webhook/url";

public void sendWebhookAlert(String assetName, String severity, String message) {

    Map<String, String> payload = Map.of("text", " *" + severity + "* alert on *" + assetName + "*: " + message );
    restTemplate.postForObject(webhookUrl, payload, String.class);
    }
}