package com.example.hacker.service;

import com.example.hacker.dto.MembersDTO;
import com.example.hacker.entity.Members;
import com.example.hacker.entity.MembersRole;
import com.example.hacker.security.util.JWTUtil;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public interface MembersService {

  default Members dtoToEntity(MembersDTO membersDTO) {
    Members members = Members.builder()
        .mno(membersDTO.getMno())
        .id(membersDTO.getId())
        .password(membersDTO.getPassword())
        .email(membersDTO.getEmail())
        .name(membersDTO.getName())
        .mobile(membersDTO.getMobile())
        .fromSocial(membersDTO.isFromSocial())
        .regDate(membersDTO.getRegDate())
        .modDate(membersDTO.getModDate())
        .roleSet(membersDTO.getRoleSet().stream().map(str -> {
          if(str.equals("ROLE_USER")) return MembersRole.USER;
          else if (str.equals("ROLE_MANAGER")) return MembersRole.MANAGER;
          else if (str.equals("ROLE_ADMIN")) return MembersRole.ADMIN;
          else return MembersRole.USER;
        }).collect(Collectors.toSet()))
        .build();
    return members;
  }

  default MembersDTO entityToDTO(Members members) {
    MembersDTO membersDTO = MembersDTO.builder()
        .mno(members.getMno())
        .id(members.getId())
        .password(members.getPassword())
        .email(members.getEmail())
        .name(members.getName())
        .mobile(members.getMobile())
        .fromSocial(members.isFromSocial())
        .regDate(members.getRegDate())
        .modDate(members.getModDate())
        .roleSet(members.getRoleSet().stream().map(
            new Function<MembersRole, String>() {
              @Override
              public String apply(MembersRole role) {
                return new String("ROLE_" + role.name());
              }
            }).collect(Collectors.toSet()))
        .build();
    return membersDTO;
  }

  // 회원가입
  Long registMembersDTO(MembersDTO membersDTO);

  // 회원수정
  void updateMembersDTO(MembersDTO membersDTO);

  // 회원탈퇴
  void removeMembers(Long mno);

  // 특정회원추출
  MembersDTO get(Long mno);

  // 전체회원추출
  List<MembersDTO> getAll();

  // 로그인 후 토큰 발행
  String login(String email, String password, JWTUtil jwtUtil);

  // 로그인 후 회원정보 추출
  Members getCurrentLoggedInUser(String token) throws Exception;
}