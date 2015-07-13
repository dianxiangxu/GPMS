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
		tenuredTitles.add("Distinguished Professor");
		tenuredTitles.add("Professor");
		tenuredTitles.add("Associate Professor");
		tenuredTitles.add("Assistant Professor");

		ArrayList<String> nonTenuredTitles = new ArrayList<String>();
		nonTenuredTitles.add("Research Professor");
		nonTenuredTitles.add("Associate Research Professor");
		nonTenuredTitles.add("Assistant Research Professor");
		nonTenuredTitles.add("Clinical Professor");
		nonTenuredTitles.add("Clinical Associate Professor");
		nonTenuredTitles.add("Clinical Assistant Professor");
		nonTenuredTitles.add("Visiting Professor");
		nonTenuredTitles.add("Visiting Associate Professor");
		nonTenuredTitles.add("Visiting Assistant Professor");

		ArrayList<String> teachingFaculty = new ArrayList<String>();
		teachingFaculty.add("Lecturer");
		teachingFaculty.add("Senior Lecturer");
		teachingFaculty.add("Adjunct Professor");

		ArrayList<String> researchStaff = new ArrayList<String>();
		researchStaff.add("Research Associate");
		researchStaff.add("Research Scientist");
		researchStaff.add("Senior Research Scientist");

		ArrayList<String> professionalStaff = new ArrayList<String>();
		professionalStaff.add("Business Manager");
		professionalStaff.add("University Research Administrator");
		professionalStaff.add("Department Administrative Assistant");

		Hashtable<String, ArrayList<String>> TypeTitleHtCS = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtCS.put("Tenured/tenure-track faculty", tenuredTitles);
		TypeTitleHtCS
				.put("Non-tenure-track research faculty", nonTenuredTitles);
		TypeTitleHtCS.put("Teaching faculty", teachingFaculty);
		TypeTitleHtCS.put("Research staff", researchStaff);
		TypeTitleHtCS.put("Professional staff", professionalStaff);

		Hashtable<String, ArrayList<String>> TypeTitleHtEE = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtEE.put("Tenured/tenure-track faculty", tenuredTitles);
		TypeTitleHtEE
				.put("Non-tenure-track research faculty", nonTenuredTitles);
		TypeTitleHtEE.put("Teaching faculty", teachingFaculty);
		TypeTitleHtEE.put("Research staff", researchStaff);
		TypeTitleHtEE.put("Professional staff", professionalStaff);

		Hashtable<String, ArrayList<String>> TypeTitleHtCE = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtCE.put("Tenured/tenure-track faculty", tenuredTitles);
		TypeTitleHtCE
				.put("Non-tenure-track research faculty", nonTenuredTitles);
		TypeTitleHtCE.put("Teaching faculty", teachingFaculty);
		TypeTitleHtCE.put("Research staff", researchStaff);
		TypeTitleHtCE.put("Professional staff", professionalStaff);

		Hashtable<String, ArrayList<String>> TypeTitleHtFis = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtFis.put("Tenured/tenure-track faculty", tenuredTitles);
		TypeTitleHtFis.put("Non-tenure-track research faculty",
				nonTenuredTitles);
		TypeTitleHtFis.put("Teaching faculty", teachingFaculty);
		TypeTitleHtFis.put("Research staff", researchStaff);
		TypeTitleHtFis.put("Professional staff", professionalStaff);

		Hashtable<String, ArrayList<String>> TypeTitleHtChe = new Hashtable<String, ArrayList<String>>();
		TypeTitleHtChe.put("Tenured/tenure-track faculty", tenuredTitles);
		TypeTitleHtChe.put("Non-tenure-track research faculty",
				nonTenuredTitles);
		TypeTitleHtChe.put("Teaching faculty", teachingFaculty);
		TypeTitleHtChe.put("Research staff", researchStaff);
		TypeTitleHtChe.put("Professional staff", professionalStaff);

		Hashtable<String, Hashtable<String, ArrayList<String>>> departmentTypeHtEng = new Hashtable<String, Hashtable<String, ArrayList<String>>>();
		departmentTypeHtEng.put("Computer Science", TypeTitleHtCS);
		departmentTypeHtEng.put("Electrical Engineering", TypeTitleHtEE);
		departmentTypeHtEng.put("Computer Engineering", TypeTitleHtCE);

		Hashtable<String, Hashtable<String, ArrayList<String>>> departmentTypeHtSci = new Hashtable<String, Hashtable<String, ArrayList<String>>>();
		departmentTypeHtSci.put("Physics", TypeTitleHtFis);
		departmentTypeHtSci.put("Chemistry", TypeTitleHtChe);

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
