package com.welflex.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.google.code.morphia.DAO;
import com.welflex.model.Customer;
import com.welflex.model.Order;
import com.welflex.model.Product;
import com.welflex.mongo.MongoConnectionManager;

public class OrderDaoImpl extends DAO<Order, ObjectId> implements OrderDao {

  public OrderDaoImpl() {
    super(Order.class, MongoConnectionManager.instance().getDb());
  }

  public Order find(ObjectId orderId) {
    return get(orderId);
  }

  @Override
  public List<Order> findOrdersByCustomer(Customer customer) {
   return createQuery().field("customer").equal(customer).asList();
  }

  @Override
  public List<Order> findOrdersWithProduct(Product product) {
    return createQuery().field("lines.product").equal(product).asList();
  }
}
