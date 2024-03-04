package com.example.demo.service;

import com.example.demo.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface ProductService {
    public List<Product> getProducts();

    public List<Product> getProductsByCatId(Integer catid);
    public String addProduct(Product product, MultipartFile imgFile) throws IOException;

    public String updateProduct(Product product);

    public String deleteProduct(Integer pid);

    public Product getProductById(Integer pid);

}
