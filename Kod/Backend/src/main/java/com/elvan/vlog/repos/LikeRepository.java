package com.elvan.vlog.repos;

import com.elvan.vlog.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
