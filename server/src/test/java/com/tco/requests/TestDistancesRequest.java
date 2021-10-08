package com.tco.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class TestDistancesRequest {
  private ArrayList<String> jsonStrings = new ArrayList<String>(Arrays.asList(
      "{\"latitude\": \"34.305599212646484\", \"longitude\": \"-112.16500091552734\"}",
      "{\"latitude\": \"35.350498199499995\",\"longitude\": \"-116.888000488\"}",
      "{\"latitude\": \"28.64550018310547\",\"longitude\": \"-82.21900177001953\"}",
      "{\"latitude\": \"27.230899810791016\",\"longitude\": \"-80.96920013427734\"}",
      "{\"latitude\": \"33.76750183105469\",\"longitude\": \"-84.06829833984375\"}",
      "{\"latitude\": \"48.145301818847656\",\"longitude\": \"-116.21399688720703\"}"));

  private ArrayList<Integer> correctDistances =
      new ArrayList<Integer>(Arrays.asList(277, 2072, 123, 487, 1928, 978));

  private DistancesRequest distances;
  Places places = new Places();
  private double earthRadius = 3958.8;

  @BeforeEach
  public void createConfigurationForTestCases() {
    distances = new DistancesRequest();
    distances.setEarthRadius(earthRadius);
    for (int i = 0; i < jsonStrings.size(); i++) {
      Place place = new Gson().fromJson(jsonStrings.get(i), Place.class);
      places.add(place);
    }
  }

  @Test
  @DisplayName("Request type is \"distances\"")
  public void testType() {
    String type = distances.getRequestType();
    assertEquals("distances", type);
  }

  @Test
  @DisplayName("Earth Radius is correct")
  public void testEarthRadius() {
    double eR = distances.getEarthRadius();
    assertEquals(eR, earthRadius);
  }

  @Test
  @DisplayName("Distances is correct")
  public void testDistances() {
    ArrayList<Integer> distancesArr = distances.getDistances(places);
    assertEquals(distancesArr, correctDistances);
  }
}
