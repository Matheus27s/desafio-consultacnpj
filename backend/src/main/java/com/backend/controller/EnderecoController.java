package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.EnderecoService;

@RestController
@RequestMapping(value = "/endereco")
public class EnderecoController {
	
	@Autowired
	private EnderecoService enderecoService;
	
	//Busca pelo CNPJ
	@GetMapping(path = "/{cnpj}", produces = "application/json")
	public ResponseEntity<?> getEndereco(@PathVariable("cnpj") String cnpjProps) throws Exception {
		return enderecoService.getEnderecoPeloCNPJ(cnpjProps);
	}

}
