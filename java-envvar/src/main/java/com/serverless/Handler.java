package com.serverless;

import java.util.Collections;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Handler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

	private static final Logger LOG = LogManager.getLogger(Handler.class);

	@Override
	public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
		LOG.info("STAGE: {}", System.getenv("STAGE"));
		LOG.info("appName: {}", System.getProperty("app.name"));
		LOG.info("appVersion: {}", System.getProperty("app.version"));
		input.put("System::STAGE", System.getenv("STAGE"));
		input.put("System::appName", System.getProperty("app.name"));
		input.put("System::appVersion", System.getProperty("app.version"));
		input.put("mykey1", System.getProperty("mykey1"));
		input.put("mykey2", System.getProperty("mykey2"));
		input.put("mykey3", System.getProperty("mykey3"));
		input.put("mykey4", System.getProperty("mykey4"));
		input.put("mykey5", System.getProperty("mykey5"));
		input.put("mykey6", System.getProperty("mykey6"));
		input.put("mykey7", System.getProperty("mykey7"));
		input.put("mykey8", System.getProperty("mykey8"));
		input.put("mykey9", System.getProperty("mykey9"));
		input.put("java.version", System.getProperty("java.version"));
		Response responseBody = new Response("Go Serverless v1.x! Your function executed successfully!", input);
		return ApiGatewayResponse.builder()
				.setStatusCode(200)
				.setObjectBody(responseBody)
				.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & serverless"))
				.build();
	}
}
