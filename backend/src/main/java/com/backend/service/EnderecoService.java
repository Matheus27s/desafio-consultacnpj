package com.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.backend.model.Endereco;

@Service
public class EnderecoService {
	static String urlCnpj = "https://www.receitaws.com.br/v1/cnpj/";

	public ResponseEntity<?> getEnderecoPeloCNPJ(String cnpj) {		
		try {
			if (cnpj.length() == 14) {
				String buscaCnpjJson = urlCnpj+cnpj; 

				RestTemplate restTemplate = new RestTemplate();
				Endereco response = restTemplate.getForObject(buscaCnpjJson, Endereco.class);
				
				if (response.getStatus() == "ERROR" || response.getCnpj() == null) {
					return ResponseEntity.status(HttpStatus.OK).body("CNPJ não existe, por favor digite um valor válido.");
				}

				return new ResponseEntity<Endereco>(response, HttpStatus.OK);
			} else {
				return ResponseEntity.status(HttpStatus.OK).body("CNPJ não existe, por favor verifique a quantidade de número digitados.");
			}

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.OK).body("CNPJ não existe, por favor digite um valor válido.");
		}
	}

}