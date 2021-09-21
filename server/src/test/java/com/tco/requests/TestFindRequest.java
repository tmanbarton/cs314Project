package com.tco.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
  @DisplayName("Places size is correct")
  public void testPlacesSize(){
    int size = find.getPlaces().size();
    assertEquals(size, limit);    
  }

  @Test
  @DisplayName("Found is correct")
  public void testFound() {
    int findFound = find.getFound();
    int dbqFound = dbq.getFound();
    assertEquals(dbqFound, findFound);
  }

}
