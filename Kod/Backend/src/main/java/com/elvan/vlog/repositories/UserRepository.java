package com.elvan.vlog.repositories;

import com.elvan.vlog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
