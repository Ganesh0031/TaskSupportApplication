package com.example.SupportDesk.Repository;

import com.example.SupportDesk.Dto.UserAssignView;
import com.example.SupportDesk.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    @Query(value = "SELECT id, email FROM user", nativeQuery = true)
    List<UserAssignView> getAllUsers();

}
