package com.welflex.mongo;

import com.google.code.morphia.Datastore;
import com.google.code.morphia.Morphia;
import com.mongodb.Mongo;
import com.welflex.model.Customer;
import com.welflex.model.LineItem;
import com.welflex.model.Order;

public class MongoConnectionManager {
  private static final MongoConnectionManager INSTANCE = new MongoConnectionManager();

  private final Datastore db;
  public static final String DB_NAME = "mydb";
  
  private MongoConnectionManager() {
    try {
      Mongo m = new Mongo("localhost", 27017);
      db = new Morphia().map(Order.class).map(LineItem.class).map(Customer.class).createDatastore(
        m, DB_NAME);
      db.ensureIndexes();
    }
    catch (Exception e) {
      throw new RuntimeException("Error initializing mongo db", e);
    }
  }

  public static MongoConnectionManager instance() {
    return INSTANCE;
  }

  public Datastore getDb() {
    return db;
  }
}
