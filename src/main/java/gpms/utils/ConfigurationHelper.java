package gpms.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.ckeditor.CKEditorConfig;
import com.ckeditor.EventHandler;
import com.ckeditor.GlobalEventHandler;

public class ConfigurationHelper {
	public static CKEditorConfig createConfig() {
		CKEditorConfig settings = new CKEditorConfig();
		List<Object> mainList = new ArrayList<Object>();
		HashMap<String, Object> toolbarSectionMap = new HashMap<String, Object>();
		List<String> subList = new ArrayList<String>();
		subList.add("Source");
		subList.add("-");
		subList.add("NewPage");
		toolbarSectionMap.put("name", "document");
		toolbarSectionMap.put("items", subList);
		mainList.add(toolbarSectionMap);
		mainList.add("/");
		toolbarSectionMap = new HashMap<String, Object>();
		subList = new ArrayList<String>();
		subList.add("Styles");
		subList.add("Format");
		toolbarSectionMap.put("name", "styles");
		toolbarSectionMap.put("items", subList);
		mainList.add(toolbarSectionMap);
		settings.addConfigValue("toolbar", mainList);
		return settings;

		// CKEditorConfig config = new CKEditorConfig();
		// List<List<String>> list = new ArrayList<List<String>>();
		// List<String> subList = new ArrayList<String>();
		// subList.add("Source");
		// subList.add("-");
		// subList.add("Bold");
		// subList.add("Italic");
		// list.add(subList);
		// config.addConfigValue("toolbar", list);
		// config.addConfigValue("width", "500");
		// return config;
	}

	public static EventHandler createEventHandlers() {
		EventHandler handler = new EventHandler();
		handler.addEventHandler("instanceReady",
				"function (ev) { alert(\"Loaded: \" + ev.editor.name); }");
		return handler;
	}

	public static GlobalEventHandler createGlobalEventHandlers() {
		GlobalEventHandler handler = new GlobalEventHandler();
		handler.addEventHandler("dialogDefinition",
				"function (ev) {  alert(\"Loading dialog window: \" + ev.data.name); }");
		return handler;
	}
}
