package com.example.demo.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductForm {
    private int pid;
    private int catid;
    private String name;
    private double price;
    private String description;
    private String imgname;
    private MultipartFile img;
}
