package com.example.hacker.service;

import com.example.hacker.dto.MembersDTO;
import com.example.hacker.entity.Members;
import com.example.hacker.repository.MembersRepository;
import com.example.hacker.security.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class MembersServiceImpl implements MembersService , UserDetailsService {

  private final MembersRepository membersRepository;
  private final PasswordEncoder passwordEncoder;
  private final JWTUtil jwtUtil;

  // email로 유저 찾음
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Members user = membersRepository.findByEmail(email, false)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .password(user.getPassword())
        .roles("USER") // 사용자의 권한을 설정합니다.
        .build();
  }

  // 회원가입
  @Override
  public Long registMembersDTO(MembersDTO membersDTO) {
    membersDTO.setPassword(passwordEncoder.encode(membersDTO.getPassword()));
    return membersRepository.save(dtoToEntity(membersDTO)).getMno();
  }

  // 회원수정
  @Override
  public void updateMembersDTO(MembersDTO membersDTO) {

    membersRepository.save(dtoToEntity(membersDTO)).getMno();
  }

  // 회원탈퇴
  @Override
  public void removeMembers(Long mno) {
    membersRepository.deleteById(mno);
  }

  // 특정회원추출
  @Override
  public MembersDTO get(Long mno) {
    Optional<Members> result = membersRepository.findById(mno);
    if (result.isPresent()) {
      return entityToDTO(result.get());
    }
    return null;
  }

  // 전체회원추출
  @Override
  public List<MembersDTO> getAll() {
    List<Members> membersList = membersRepository.getAll();
    return membersList.stream().map(
        new Function<Members, MembersDTO>() {
          @Override
          public MembersDTO apply(Members members) {
            return entityToDTO(members);
          }
        }
    ).collect(Collectors.toList());
  }

  // 로그인 후 토큰 발행
  @Override
  public String login(String email, String password, JWTUtil jwtUtil) {
    log.info("login............");
    String token = "";
    MembersDTO membersDTO;
    UserDetails userDetails;
    try {
      userDetails = loadUserByUsername(email);
    } catch (UsernameNotFoundException e) {
      log.error("User not found with email: " + email);
      return token;
    }
    log.info("serviceimpl result: " + userDetails);
    log.info("matches: " + passwordEncoder.matches(password, userDetails.getPassword()));
    if (passwordEncoder.matches(password, userDetails.getPassword())) {
      try {
        token = jwtUtil.generateToken(email);
        log.info("token:" + token);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return token;
  }

  @Override
  public Members getCurrentLoggedInUser(String token) throws Exception {
    // JWT 토큰을 파싱하여 이메일 추출
    String email = jwtUtil.validateAndExtract(token);

    // 추출한 이메일을 사용하여 데이터베이스에서 사용자 정보 조회
    Members loggedInUser = membersRepository.findByEmail(email, false)
        .orElseThrow(() -> new Exception("아이고 Logged in user not found"));

    return loggedInUser;
  }
}