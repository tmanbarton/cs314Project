package com.tco.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Arrays;

public class TestFindRequest {

  private FindRequest find;
  private DBQuery dbq;
  // Change these values to change the testing input
  private String match = "airport";
  private int limit = 10;

  @BeforeEach
  public void createConfigurationForTestCases() {
    find = new FindRequest();
    find.setMatch(match);
    find.setLimit(limit);
    dbq = new DBQuery(match, limit);
    find.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"find\"")
  public void testType() {
    String type = find.getRequestType();
    assertEquals("find", type);
  }

  @Test
  @DisplayName("Match is correct")
  public void testMatch() {
    String match = find.getMatch();
    assertEquals(this.match, match);
  }

  @Test
  @DisplayName("Limit is correct")
  public void testLimit() {
    int limit = find.getLimit();
    assertEquals(this.limit, limit);
  }

  @Test
  @DisplayName("Places is correct")
  public void testPlaces() {
    Places findPlaces = find.getPlaces();
    Places dbqPlaces = dbq.findByString();
    assertEquals(dbqPlaces, findPlaces);
  }

  @Test
  @DisplayName("Found is correct")
  public void testFound() {
    int findFound = find.getFound();
    int dbqFound = dbq.getFound();
    assertEquals(dbqFound, findFound);
  }

  @Test
  @DisplayName("Returns places with limit 0")
  public void testLimitZero(){
    find.setLimit(0);
    find.buildResponse();
    assertTrue(find.getPlaces().size() > 0);
  }

  @Test
  @DisplayName("Random returns places not equal to first 5 in table")
  public void testRandom() {
    ArrayList<String> jsonStrings = new ArrayList<String>(Arrays.asList(
      "{\"continent\":\"North America\",\"country\":\"United States\",\"latitude\":\"40.07080078125\",\"name\":\"Total Rf Heliport\",\"municipality\":\"Bensalem\",\"region\":\"Pennsylvania\",\"longitude\":\"-74.93360137939453\"}",
      "{\"continent\":\"North America\",\"country\":\"United States\",\"latitude\":\"59.94919968\",\"name\":\"Lowell Field\",\"municipality\":\"Anchor Point\",\"region\":\"Alaska\",\"longitude\":\"-151.695999146\"}",
      "{\"continent\":\"North America\",\"country\":\"United States\",\"latitude\":\"34.86479949951172\",\"name\":\"Epps Airpark\",\"municipality\":\"Harvest\",\"region\":\"Alabama\",\"longitude\":\"-86.77030181884766\"}",
      "{\"continent\":\"North America\",\"country\":\"United States\",\"latitude\":\"35.608699798583984\",\"name\":\"Newport Hospital \u0026 Clinic Heliport\",\"municipality\":\"Newport\",\"region\":\"Arkansas\",\"longitude\":\"-91.25489807128906\"}",
      "{\"continent\":\"North America\",\"country\":\"United States\",\"latitude\":\"34.305599212646484\",\"name\":\"Cordes Airport\",\"municipality\":\"Cordes\",\"region\":\"Arizona\",\"longitude\":\"-112.16500091552734\"}"
    ));
    Places firstFivePlaces = new Places();
    for(int i = 0; i < jsonStrings.size(); i++) {
      Place place = new Gson().fromJson(jsonStrings.get(i), Place.class);
      firstFivePlaces.add(place);
    }
    Places dbqRandomPlaces = dbq.getRandom();
    assertNotEquals(dbqRandomPlaces, firstFivePlaces);
  }
}