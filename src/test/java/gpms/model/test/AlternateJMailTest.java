package gpms.model.test;

import java.util.Properties;
import javax.mail.*;
import javax.mail.Session;
import javax.mail.internet.*;

/**
 * 
 * @author Thomas Volz
 *
 */
public class AlternateJMailTest {

	// /////////////////////////////////////////////////////////////
	// IMPORTANT NOTE //////////////////////////////////////////////
	// /YOU MUST ENABLE LESS SECURE APPS FOR THIS TO WORK///////////
	// https://www.google.com/settings/u/1/security/lesssecureapps//
	// /////////////////////////////////////////////////////////////

	// ////////////////////////////////////////////////////////////
	// You will need the files from the Javamail API///////////////
	// https://java.net/projects/javamail/pages/Home#Samples///////
	// ////////////////////////////////////////////////////////////

	public static void main(String args[]) {
		//Adjust these values with the appropriate email addresses for 'to' and 'from'
		final String to = "DESTINATIONEMAILADDRESS"; // The address you are sending to
		final String from = ""; //Your gmail email address
		//////////////////////////////////////////////////////////////////////////////
		//This is used for testing the attachment ability
		
		
		Properties props = new Properties();
		// Start TTLS Lines added, required
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.starttls.required", "true");
		// End TTLS addition
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtop.socketFactory.port", "587");
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "587");

		Session session = Session.getDefaultInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(from,
								"PASSWORD"); // Your actual email address and
												// password
					}
				});
		session.setDebug(true);
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from)); // your email
																// address
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));
			message.setSubject("Hello");
			message.setText("This is a test");
			Transport.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}

	}
}
