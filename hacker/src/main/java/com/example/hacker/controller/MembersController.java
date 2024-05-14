package com.example.hacker.controller;

import com.example.hacker.entity.Members;
import com.example.hacker.service.MembersService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@Log4j2
@RestController
public class MembersController {

  private final MembersService membersService;

  public MembersController(MembersService membersService) {
    this.membersService = membersService;
  }

  @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Members> getCurrentUser(HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    log.info("Authorization Header: " + authorizationHeader); // 헤더 로그 추가
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      String token = authorizationHeader.substring(7);
      log.info("토큰: " + token); // 토큰 확인 로그 추가
      try {
        log.info("트라이 들어왔음");
        Members loggedInUser = membersService.getCurrentLoggedInUser(token);
        log.info("여기까지 왔음");
        return ResponseEntity.ok(loggedInUser);
      } catch (Exception e) {
        log.error("Failed to get current user", e);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
  }
}
