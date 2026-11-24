package com.manage.employ.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manage.employ.entity.Student;
import com.manage.employ.service.Service;

@RestController
@RequestMapping("/url")
public class StudentController {
	@Autowired
	private Service service;
	@PostMapping("/add")
	public Student saveUser(@RequestBody Student st) {
		return service.saveUserDetails(st);
	}
	@GetMapping("/getById/{id}")
	public Student getById(@PathVariable Long id) {
		return service.getById(id);
	}
    @GetMapping("/getByName/{name}")
	public Student getByName(@PathVariable String name) {
		return service.getByName(name);
	}
	@GetMapping("/getAll")
	public List<Student> getAll(){
		return service.getAll();
	}
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	@PutMapping("/update/{id}")
	public Student updateDetails(@PathVariable Long id,@RequestBody Student st) {
		return service.updateDetails(id, st);
	}
}
