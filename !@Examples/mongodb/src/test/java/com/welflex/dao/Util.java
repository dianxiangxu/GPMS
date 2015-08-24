package com.welflex.dao;

import java.util.List;

import com.google.code.morphia.annotations.Entity;
import com.google.common.collect.Lists;
import com.mongodb.Mongo;
import com.welflex.model.Customer;
import com.welflex.model.Order;
import com.welflex.model.Product;
import com.welflex.mongo.MongoConnectionManager;

public final class Util {
  public static void drop() {
    Mongo mongo = MongoConnectionManager.instance().getDb().getMongo();
    @SuppressWarnings("unchecked")
    List<Class<?>> collections = Lists.newArrayList(Order.class, Product.class, Customer.class); 
    for (Class<?> collection : collections) {
     mongo.getDB(MongoConnectionManager.DB_NAME).getCollection(getCollectionName(collection)).drop();
    }
  }
  
  private static String getCollectionName(Class<?> clazz) {
    Entity a = clazz.getAnnotation(Entity.class);
    return a.value();
  }
}
