package com.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.backend.model.Endereco;

@Service
public class MediaService {
	static String urlCnpj = "https://www.receitaws.com.br/v1/cnpj/";

	public float calculoDeMedia(float valorA, float valorB) {
		float media = 0.f;

		try {

			if (valorA == 0.0 || valorB == 0.0) {

			} else {
				media = (valorA + valorB) / 2;
			}

		} catch (Exception e) {
			return media;
		}
		return media;
	}

}