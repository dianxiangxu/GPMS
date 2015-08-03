package com.welflex.dao;

import static org.junit.Assert.*;

import java.util.List;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import com.google.code.morphia.DAO;
import com.google.common.collect.Lists;
import com.welflex.model.CategoryType;
import com.welflex.model.Customer;
import com.welflex.model.LineItem;
import com.welflex.model.Order;
import com.welflex.model.Product;
import com.welflex.mongo.MongoConnectionManager;

public class OrderDaoTest {
  private OrderDao orderDao;
  private DAO<Customer, ObjectId> customerDao;
  private ProductDao productDao;
  
  private final Product xbox = new Product().ofType(CategoryType.GAMING_CONSOLE).withSku("xbox").withName("Microsoft XBox")
    .withDescription("XBox Gaming Console").withPrice(232.05);
  
  private final Product ps3 = new Product().ofType(CategoryType.GAMING_CONSOLE).withSku("ps3").withName("Sony PS3")
    .withDescription("PS3 Gaming Console").withPrice(534.03);
  
  private final Product wii = new Product().ofType(CategoryType.GAMING_CONSOLE).withSku("wii").withName("Wii").withDescription("WII Gaming console")
    .withPrice(232.00);
  
  private final Customer sanjay = new Customer().withFirstName("Sanjay").withLastName("Acharya");
  private final Customer donald = new Customer().withFirstName("Donald").withLastName("Duck");
  
  @Before
  public void before() {
    Util.drop();
    orderDao = new OrderDaoImpl();
    
    productDao = new ProductDaoImpl();
    for (Product p : Lists.newArrayList(xbox, ps3, wii)) {
      productDao.save(p);
    }
    
    customerDao = new DAO<Customer, ObjectId>(Customer.class, MongoConnectionManager.instance().getDb());
    
    for (Customer c : Lists.newArrayList(sanjay, donald)) {
      customerDao.save(c);
    }
  }
  
  private Order createOrder() {
    Order order = new Order().withCustomer(sanjay).withLineItems(new LineItem().withLineNumber(1)
      .withQuantity(10).withProduct(xbox));
    orderDao.save(order);
    return order;
  }
 
  @Test
  public void testPersistence() {
    Order order = createOrder();
    assertNotNull("Order saved must now have an id", order.getId());
    order = orderDao.find(order.getId());
    assertNotNull("Order must have been retrieved", order); 
    assertTrue(order.getLines().size() == 1);
    
    // Update
    order.getLines().add(new LineItem().withLineNumber(order.getLines().size() + 1).withProduct(wii).withQuantity(2));
    orderDao.save(order);
    order = orderDao.find(order.getId());
    assertTrue(order.getLines().size() == 2);
  }
  
  @Test
  public void query() {
    createOrder();
    List<Order> orders = orderDao.findOrdersByCustomer(sanjay);
    assertTrue("Should have obtained a single order for the customer" , orders.size() == 1);
    orders = orderDao.findOrdersByCustomer(donald);
    assertTrue("Should not have found any orders for the customer" , orders.size() == 0);
    
    orders = orderDao.findOrdersWithProduct(wii);
    assertTrue("Should have no orders for wii", orders.size() == 0);
    orders = orderDao.findOrdersWithProduct(xbox);    
    assertTrue("Should have one order for xbox", orders.size() == 1);
  }
}
