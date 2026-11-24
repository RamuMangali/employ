package com.manage.employ.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.manage.employ.entity.Student;
import com.manage.employ.repository.StudentRepo;
import com.manage.employ.serviceInt.ServiceInt;

@org.springframework.stereotype.Service
public class Service implements ServiceInt {
	@Autowired
	private StudentRepo repo;

	@Override
	public Student saveUserDetails(Student st) {
		// TODO Auto-generated method stub
		return repo.save(st);
	}

	@Override
	public Student getById(Long id) {
		return repo.findById(id).orElse(null);
	}

	@Override
	public Student getByName(String name) {
		List<Student> list = repo.findByNameContainingIgnoreCase(name);
		return (list != null && !list.isEmpty()) ? list.get(0) : null;
	}

	@Override
	public List<Student> getAll() {
		return repo.findAll();
	}

	@Override
	public void delete(Long id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);
		}
	}

	@Override
	public Student updateDetails(Long id, Student st) {
		return repo.findById(id).map(existing -> {
			existing.setName(st.getName());
			existing.setMobile(st.getMobile());
			existing.setEmail(st.getEmail());
			existing.setPassword(st.getPassword());
			existing.setLocation(st.getLocation());
			return repo.save(existing);
		}).orElse(null);
	}

	@Override
	public Page<Student> page(Page page) {
		// TODO Auto-generated method stub
		return null;
	}

}
