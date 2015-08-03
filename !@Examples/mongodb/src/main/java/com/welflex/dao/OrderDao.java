package com.welflex.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.welflex.model.Customer;
import com.welflex.model.Order;
import com.welflex.model.Product;

public interface OrderDao {
  public void save(Order order);

  public Order find(ObjectId orderId);

  public List<Order> findOrdersByCustomer(Customer customer);

  public List<Order> findOrdersWithProduct(Product product);
}
