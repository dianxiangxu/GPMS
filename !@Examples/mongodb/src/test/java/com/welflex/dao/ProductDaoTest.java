package com.welflex.dao;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.common.collect.Lists;
import com.welflex.model.CategoryType;
import com.welflex.model.Product;

public class ProductDaoTest {
  private ProductDao productDao = new ProductDaoImpl();
  private final List<Product> prodList = Lists.newArrayList(
    new Product().withSku("A").ofType(CategoryType.GAMING_CONSOLE).withName("XBox").withDescription("Xbox gaming console").withPrice(300.00),
    new Product().withSku("B").ofType(CategoryType.GAMING_CONSOLE).withName("PS3").withDescription("PS3 gaming console").withPrice(230.00),
    new Product().withSku("C").ofType(CategoryType.GAMING_CONSOLE).withName("Nintendo").withDescription("Nintendo gaming console").withPrice(220.00),
    new Product().withSku("D").ofType(CategoryType.TELEVISION).withName("Samsung 20").withDescription("Samsung 20 inch lcd").withPrice(1000.00));

  @Before
  public void before() {
    Util.drop();
    for (Product product : prodList) {
      productDao.save(product);
    }
  }
  
  @Test
  public void testByCategory() {
    List<Product> results = productDao.getProductsWithCategory(CategoryType.CAMERA);
    assertTrue("Expected no products of type camera", results.size() == 0);
    
    results = productDao.getProductsWithCategory(CategoryType.TELEVISION);
    assertTrue("Expected 1 product of type Television" , results.size() == 1);
    
    results = productDao.getProductsWithCategory(CategoryType.GAMING_CONSOLE);
    assertTrue("Expected 3 results for Gaming", results.size() == 3);
  }
  
  @Test
  public void testByCategoryAndPrice() {
    List<Product> results = productDao.getProductsWithCategory(CategoryType.GAMING_CONSOLE, 200.00);
    assertTrue("Expected no gaming", results.size() == 0);
    
    results = productDao.getProductsWithCategory(CategoryType.GAMING_CONSOLE, 220.00);
    assertTrue("Expected one gaming", results.size() == 1);
    
    results = productDao.getProductsWithCategory(CategoryType.GAMING_CONSOLE, 235.00);
    assertTrue(results.size () == 2);
  }
}
