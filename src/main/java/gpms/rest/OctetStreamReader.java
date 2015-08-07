package gpms.rest;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

/**
 * Servlet implementation class OctetStreamReader
 */
@WebServlet("/OctetStreamReader")
public class OctetStreamReader extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String DESTINATION_DIR_PATH = "files";
	private static String realPath;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public OctetStreamReader() {
		super();
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @param config
	 * @throws ServletException
	 */
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		realPath = getServletContext().getRealPath(DESTINATION_DIR_PATH) + "/";
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter writer = null;
		InputStream is = null;
		FileOutputStream fos = null;

		try {
			writer = response.getWriter();
		} catch (IOException ex) {
			log(OctetStreamReader.class.getName() + "has thrown an exception: "
					+ ex.getMessage());
		}

		String filename = request.getHeader("X-File-Name");
		try {
			is = request.getInputStream();
			fos = new FileOutputStream(new File(realPath + filename));
			IOUtils.copy(is, fos);
			response.setStatus(HttpServletResponse.SC_OK);
			writer.print("{success: true}");
		} catch (FileNotFoundException ex) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			writer.print("{success: false}");
			log(OctetStreamReader.class.getName() + "has thrown an exception: "
					+ ex.getMessage());
		} catch (IOException ex) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			writer.print("{success: false}");
			log(OctetStreamReader.class.getName() + "has thrown an exception: "
					+ ex.getMessage());
		} finally {
			try {
				fos.close();
				is.close();
			} catch (IOException ignored) {
			}
		}

		writer.flush();
		writer.close();
	}

}
