package com.tco.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class TestConfigRequest {

  private ConfigRequest conf;
  private final ArrayList<String> ourFeatures =
      new ArrayList<String>(Arrays.asList("config", "find", "distances", "tour"));

  @BeforeEach
  public void createConfigurationForTestCases() {
    conf = new ConfigRequest();
    conf.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"config\"")
  public void testType() {
    String type = conf.getRequestType();
    assertEquals("config", type);
  }

  @Test
  @DisplayName("Features includes \"config\" + \"find\"")
  public void testFeatures() {
    ArrayList<String> features = conf.getFeatures();
    assertEquals(ourFeatures, features);
  }

  @Test
  @DisplayName("Team name is correct")
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("t13 Penguinz", name);
  }
}
