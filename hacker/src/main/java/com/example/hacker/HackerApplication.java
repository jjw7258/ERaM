package com.example.hacker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HackerApplication.class, args);
		System.out.println("서버 실행 준비 완료");
	}
}
