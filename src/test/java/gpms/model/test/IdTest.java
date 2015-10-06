package gpms.model.test;

import org.bson.types.ObjectId;

public class IdTest {

	public static void main(String[] args) {System.out.println("ObjectID Creation Test:");
	System.out.println("New Object ID: ");
	ObjectId id = new ObjectId();
	System.out.println(id.toString());
	
	System.out.println("Creation of 'new' ID built from original id:");
	ObjectId copyId = new ObjectId(id.toString());
	System.out.println(copyId.toString());
	}

}
