package Tensorflow;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class AppTensorSimon {

	private static final Logger LOGGER = LoggerFactory.getLogger(AppTensorSimon.class);

	public static void main(String[] args) {

		LOGGER.info("main()");
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.refresh();
		SpringApplication.run(AppTensorSimon.class, args);

		LOGGER.info("main() finished");
		System.out.println("Tensorflow.AppTensorSimon main() finished.  server is up.");
	}
}
