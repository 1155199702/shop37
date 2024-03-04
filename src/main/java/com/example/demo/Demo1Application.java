package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URL;

@SpringBootApplication
@MapperScan("com.example.demo.mapper")
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);

        // 获取图片的URL
        URL imgUrl = Demo1Application.class.getResource("/static/imgs/apple.jpg");

        if (imgUrl != null) {
            String imagePath = imgUrl.getPath();
            System.out.println("Image path: " + imagePath);
        } else {
            System.out.println("Image not found!");
        }
    }

}
