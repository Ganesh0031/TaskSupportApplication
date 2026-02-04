package com.example.SupportDesk.Repository;

import com.example.SupportDesk.Entity.Comment;
import com.example.SupportDesk.Entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment>findByTicket(Ticket ticket);
}
