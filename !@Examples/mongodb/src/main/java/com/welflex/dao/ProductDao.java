package com.welflex.dao;

import java.util.List;

import com.welflex.model.CategoryType;
import com.welflex.model.Product;

public interface ProductDao {
  public List<Product> getProducts();
  
  public void save(Product product);
  
  public List<Product> getProductsWithCategory(CategoryType type);
  
  public List<Product> getProductsWithCategory(CategoryType type, double maxPrice); 
}
