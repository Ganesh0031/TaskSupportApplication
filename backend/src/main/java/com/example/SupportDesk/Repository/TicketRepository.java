package com.example.SupportDesk.Repository;

import com.example.SupportDesk.Entity.Ticket;
import com.example.SupportDesk.Entity.TicketPriority;
import com.example.SupportDesk.Entity.TicketStatus;
import com.example.SupportDesk.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Page<Ticket> findByCreatedBy(User createdBy, Pageable pageable);

    Page<Ticket> findByStatus(
            TicketStatus status,
            Pageable pageable
    );

    Page<Ticket> findByStatusAndTicketPriority(
            TicketStatus status,
            TicketPriority priority,
            Pageable pageable
    );

    long countByStatus(TicketStatus status);
}

