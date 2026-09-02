package com.sentinelcore;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class SentinelCoreBackendApplicationTests {

	@Test
	void generateHash() {
		String hashed=new BCryptPasswordEncoder().encode("admin123");
		System.out.println("bcrypt hash = "+hashed);
	}
}
