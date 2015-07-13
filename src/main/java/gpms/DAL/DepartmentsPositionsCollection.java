package gpms.DAL;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;

public class DepartmentsPositionsCollection {
	private static final Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> ht = new Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>>();

	public DepartmentsPositionsCollection() {
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

	// {Engineering={Electrical Engineering={Research Staff=[research associate,
	// research sciencetist, senior research sciencetist],
	// Non-tenure-track=[research professaor, associate research professor,
	// assistant research profesor, clinical profesor, clinical associate
	// profesor, clinical assistant profesor, visiting profesor, visiting
	// associate profesor, visiting assistant profesor], Professional
	// Staff=[business manager, university research administrator, department
	// administrative assistant]}, Computer Science={Research Staff=[research
	// associate, research sciencetist, senior research sciencetist],
	// Tenured=[distinguished professor, professor, associate professor,
	// assistant professor], Teaching Faculty=[distinguished professor,
	// professor, associate professor, assistant professor]}, Computer
	// Engineering={Tenured=[distinguished professor, professor, associate
	// professor, assistant professor], Teaching Faculty=[lecturer, senior
	// lecturer, adjunct professor], Professional Staff=[business manager,
	// university research administrator, department administrative
	// assistant]}},
	//
	// Science={Physics={Research Staff=[research associate, research
	// sciencetist, senior research sciencetist], Teaching Faculty=[lecturer,
	// senior lecturer, adjunct professor], Non-Tenured-Track=[research
	// professaor, associate research professor, assistant research profesor,
	// clinical profesor, clinical associate profesor, clinical assistant
	// profesor, visiting profesor, visiting associate profesor, visiting
	// assistant profesor]}, Chemestry={Tenured=[distinguished professor,
	// professor, associate professor, assistant professor], Teaching
	// Faculty=[lecturer, senior lecturer, adjunct professor],
	// Non-Tenured-Track=[research professaor, associate research professor,
	// assistant research profesor, clinical profesor, clinical associate
	// profesor, clinical assistant profesor, visiting profesor, visiting
	// associate profesor, visiting assistant profesor]}}
	//
	// }
	public Hashtable<String, Hashtable<String, Hashtable<String, ArrayList<String>>>> getAvailableDepartmentsAndPositions() {
		return ht;
	}

	public List<String> getCollegeKeys() {
		return Collections.list(ht.keys());
	}

	public List<String> getDepartmentKeys(String college) {
		return Collections.list(ht.get(college).keys());
	}

	public List<String> getPositionType(String college, String department) {
		return Collections.list(ht.get(college).get(department).keys());
	}

	public List<String> getPositionTitle(String college, String department,
			String positionType) {
		return ht.get(college).get(department).get(positionType);
	}

}
