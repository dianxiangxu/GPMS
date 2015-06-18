import gpms.model.PositionDetails;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Scanner;
import java.util.Set;


public class HashTableTest 
{
	private static final Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> ht = new Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>>();
	
	public static void main(String[] args)
	{
		PositionDetails pd = new PositionDetails();
		Scanner scan = new Scanner(System.in);
		HashTableTest htt = new HashTableTest();
		Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> collegeKey = htt.getHashtable();
		Set<String> keys = collegeKey.keySet();
		Object[] keyArray;
		int count = 0;
		int index = 0;
		
		
		System.out.println("Please Select one");
		for(String k : keys)
		{
			System.out.println(count++ + " " + k);
		}
		do
		{
			System.out.println("Please Select an index");
			index = scan.nextInt();
		}while(index < 0 || index > keys.size());
		keyArray = keys.toArray();
		pd.setCollege((String)keyArray[index]);
		
		Hashtable<String, Hashtable<String, ArrayList<String>>> departmentKeys = collegeKey.get((String)keyArray[index]);
		keys = departmentKeys.keySet();
		
		count = 0;
		System.out.println("Please Select one");
		for(String k : keys)
		{
			System.out.println(count++ + " " + k);
		}
		do
		{
			System.out.println("Please Select an index");
			index = scan.nextInt();
		}while(index < 0 || index > keys.size());
		keyArray = keys.toArray();
		pd.setDepartment((String)keyArray[index]);
		
		Hashtable<String, ArrayList<String>> titleKeys = departmentKeys.get((String)keyArray[index]);
		keys = titleKeys.keySet();
		
		count = 0;
		System.out.println("Please Select one");
		for(String k : keys)
		{
			System.out.println(count++ + " " + k);
		}
		do
		{
			System.out.println("Please Select an index");
			index = scan.nextInt();
		}while(index < 0 || index > keys.size());
		keyArray = keys.toArray();
		pd.setPositionTitle((String)keyArray[index]);
		
		ArrayList<String> types = titleKeys.get((String)keyArray[index]);
		
		count = 0;
		for(String k : types)
		{
			System.out.println(count++ + " " + k);
		}
		do
		{
			System.out.println("Please Select an index");
			index = scan.nextInt();
		}while(index < 0 || index > types.size());
		pd.setPositionType(types.get(index));
		
		System.out.println("Position Details : ");
		System.out.println(pd.toString());
	}
	
	HashTableTest()
	{
		ArrayList<String> tenuredTitles = new ArrayList<String>();
		tenuredTitles.add("distinguished professor");
		tenuredTitles.add("professor");
		tenuredTitles.add("associate professor");
		tenuredTitles.add("assistant professor");
		
		ArrayList<String> nonTenuredTitles = new ArrayList<String>();
		nonTenuredTitles.add("research professaor");
		nonTenuredTitles.add("associate research professor");
		nonTenuredTitles.add("assistant research profesor");
		nonTenuredTitles.add("clinical profesor");
		nonTenuredTitles.add("clinical associate profesor");
		nonTenuredTitles.add("clinical assistant profesor");
		nonTenuredTitles.add("visiting profesor");
		nonTenuredTitles.add("visiting associate profesor");
		nonTenuredTitles.add("visiting assistant profesor");
		
		ArrayList<String> teachingFaculty = new ArrayList<String>();
		teachingFaculty.add("lecturer");
		teachingFaculty.add("senior lecturer");
		teachingFaculty.add("adjunct professor");
		
		ArrayList<String> researchStaff = new ArrayList<String>();
		researchStaff.add("research associate");
		researchStaff.add("research sciencetist");
		researchStaff.add("senior research sciencetist");
		
		ArrayList<String> professionalStaff = new ArrayList<String>();
		professionalStaff.add("business manager");
		professionalStaff.add("university research administrator");
		professionalStaff.add("department administrative assistant");
		
		Hashtable<String, ArrayList<String>> TypeTitleHtCS = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtCS.put("Tenured", tenuredTitles);
		TypeTitleHtCS.put("Research Staff", researchStaff);
		TypeTitleHtCS.put("Teaching Faculty", tenuredTitles);
		
		Hashtable<String, ArrayList<String>> TypeTitleHtEE = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtEE.put("Non-tenure-track", nonTenuredTitles);
		TypeTitleHtEE.put("Professional Staff", professionalStaff);
		TypeTitleHtEE.put("Research Staff", researchStaff);
		
		Hashtable<String, ArrayList<String>> TypeTitleHtCE = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtCE.put("Teaching Faculty", teachingFaculty);
		TypeTitleHtCE.put("Professional Staff", professionalStaff);
		TypeTitleHtCE.put("Tenured", tenuredTitles);
		
		Hashtable<String, ArrayList<String>> TypeTitleHtFis = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtFis.put("Research Staff", researchStaff);
		TypeTitleHtFis.put("Teaching Faculty", teachingFaculty);
		TypeTitleHtFis.put("Non-Tenured-Track", nonTenuredTitles);
		
		Hashtable<String, ArrayList<String>> TypeTitleHtChe = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtChe.put("Teaching Faculty", teachingFaculty);
		TypeTitleHtChe.put("Tenured", tenuredTitles);
		TypeTitleHtChe.put("Non-Tenured-Track", nonTenuredTitles);
		
		Hashtable<String, Hashtable<String, ArrayList<String>>> departmentTypeHtEng = new Hashtable<String, Hashtable<String, ArrayList<String>>>();
		departmentTypeHtEng.put("Computer Science", TypeTitleHtCS);
		departmentTypeHtEng.put("Electrical Engineering", TypeTitleHtEE);
		departmentTypeHtEng.put("Computer Engineering", TypeTitleHtCE);
		
		Hashtable<String, Hashtable<String, ArrayList<String>>> departmentTypeHtSci = new Hashtable<String, Hashtable<String, ArrayList<String>>>();
		departmentTypeHtSci.put("Physics", TypeTitleHtFis);
		departmentTypeHtSci.put("Chemestry", TypeTitleHtChe);
		
		ht.put("Engineering", departmentTypeHtEng);
		ht.put("Science", departmentTypeHtSci);
	}
	
	public Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> getHashtable()
	{
		return ht;
	}
}
