package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Media;
import com.backend.service.EnderecoService;
import com.backend.service.MediaService;

@RestController
@RequestMapping(value = "/media")
public class MediaController {
	
	@Autowired
	private MediaService mediaService;
	
	@PostMapping(path = "/", produces = "application/json")
	public ResponseEntity<Media> getMedia(@RequestBody Media media) throws Exception {
		media.setTotal(mediaService.calculoDeMedia(media.getValorA(), media.getValorB()));
		return new ResponseEntity<Media>(media, HttpStatus.OK);
	}

}
