

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;
import static com.codeborne.selenide.Selenide.open;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.Charsets;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.testng.BrowserPerTest;
import com.google.common.io.Files;
import static com.codeborne.selenide.Selenide.executeJavaScript;







@Listeners({ BrowserPerTest.class})
public class TestDummy {
		
	@Test
	void loginasStudent() throws InterruptedException, IOException {
		open("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
		$("#username").setValue("zee.bms@gmail.com");
		$("#password").setValue("Trillium1!");
		$x("//*[@id=\"app__container\"]/main/div/form/div[3]/button").click();
		$("span#mynetwork-tab-icon").click();
		WebDriverRunner.url().contains("mynetwork");
		@SuppressWarnings("deprecation")
		String fileContents = Files.toString(new File("/Users/z.akhtar/eclipse-workspace/linkedin/src/main/java/connection.js"), Charsets.UTF_8);
		executeJavaScript(fileContents); 
		Thread.sleep(1000000);
		
		
	}
		
}
