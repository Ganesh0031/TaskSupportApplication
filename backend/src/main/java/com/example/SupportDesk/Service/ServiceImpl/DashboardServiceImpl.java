package com.example.SupportDesk.Service.ServiceImpl;

import com.example.SupportDesk.Entity.TicketStatus;
import com.example.SupportDesk.Repository.TicketRepository;
import com.example.SupportDesk.Service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TicketRepository ticketRepository;

    public DashboardServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Map<String, Object> getMetrics() {

        Map<String, Object> metrics = new HashMap<>();

        metrics.put("totalTickets", ticketRepository.count());
        metrics.put("openTickets",
                ticketRepository.countByStatus(TicketStatus.OPEN));
        metrics.put("resolvedTickets",
                ticketRepository.countByStatus(TicketStatus.RESOLVED));

        return metrics;
    }
}
